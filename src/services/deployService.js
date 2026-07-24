import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_DEPLOYMENTS_KEY = 'spider_local_deployments';

/**
 * Wraps canvas HTML and CSS into a complete standalone index.html & style.css bundle.
 */
export function buildSiteBundle(html, css, title = 'SPIDER Generated Site', seoMetadata = {}) {
  const { description = '', ogImage = '' } = seoMetadata;
  
  // Inject Netlify Forms functionality automatically
  const processedHtml = (html || '').replace(/<form\b([^>]*)>/gi, (match, attrs) => {
    if (attrs.includes('data-netlify')) return match;
    let newAttrs = attrs + ' data-netlify="true"';
    if (!attrs.includes('name=')) newAttrs += ' name="spider-contact-form"';
    return `<form${newAttrs}>`;
  });
  
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${description ? `<meta name="description" content="${description}">` : ''}
  ${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
  ${ogImage ? `<meta name="twitter:image" content="${ogImage}">` : ''}
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
  </style>
</head>
<body>
  ${processedHtml}
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init({ duration: 800, once: true });
  </script>
</body>
</html>`;

  return { html: fullHtml, css: css || '' };
}

/**
 * Downloads site files directly as a ZIP archive.
 */
export async function downloadZipBundle(html, css, projectName = 'spider-site', seoMetadata = {}) {
  const bundle = buildSiteBundle(html, css, projectName, seoMetadata);
  const zip = new JSZip();
  zip.file('index.html', bundle.html);
  zip.file('style.css', bundle.css);

  const content = await zip.generateAsync({ type: 'blob' });
  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  saveAs(content, `${sanitizedName}-export.zip`);
  return true;
}

/**
 * Retrieves the Netlify Personal Access Token from environment configuration variables.
 */
export async function getNetlifyToken() {
  return import.meta.env.VITE_NETLIFY_ACCESS_TOKEN || '';
}

/**
 * Deploys site directly to Netlify REST API using a Zip file payload.
 * Supports custom subdomains by creating the site first if necessary.
 */
export async function deployToNetlifyAPI({ html, css, token, siteId = null, subdomain = null, projectId = null, title = 'SPIDER Site', seoMetadata = {} }) {
  if (!token) {
    throw new Error('Netlify Personal Access Token is required for live deployment.');
  }

  const bundle = buildSiteBundle(html, css, title, seoMetadata);
  const zip = new JSZip();
  zip.file('index.html', bundle.html);
  zip.file('style.css', bundle.css);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  let activeSiteId = siteId;

  // Step 1: If we don't have a siteId yet, create the site first
  if (!activeSiteId) {
    const createBody = {};
    if (subdomain) {
      // Netlify expects the name in the body to provision the site-name.netlify.app subdomain
      createBody.name = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }

    const createResponse = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.netlify.com/api/v1/sites'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(createBody)
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      if (createResponse.status === 422) {
        throw new Error('Subdomain is already taken on Netlify. Please try another name.');
      }
      throw new Error(`Failed to create Netlify site (${createResponse.status}): ${errorText}`);
    }

    const createdSite = await createResponse.json();
    activeSiteId = createdSite.id;
  }

  // Step 2: Deploy the zip payload to the active site
  const endpoint = `https://api.netlify.com/api/v1/sites/${activeSiteId}/deploys`;

  const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/zip',
      'Authorization': `Bearer ${token}`,
    },
    body: zipBlob,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Netlify API Deploy Error (${response.status}): ${errorText || response.statusText}`);
  }

  const data = await response.json();
  const liveUrl = data.ssl_url || data.url || (data.deploy_ssl_url ? `https://${data.deploy_ssl_url}` : null);
  const returnedSiteId = data.site_id || data.id || activeSiteId;

  if (projectId) {
    await recordDeployment({
      projectId,
      provider: 'netlify',
      status: 'deployed',
      liveUrl: liveUrl || `https://${returnedSiteId}.netlify.app`,
    });
  }

  return {
    siteId: returnedSiteId,
    url: liveUrl || `https://${returnedSiteId}.netlify.app`,
    adminUrl: data.admin_url,
  };
}

/**
 * Logs deployment record in Supabase / LocalStorage.
 */
export async function recordDeployment({ projectId, provider = 'netlify', status = 'deployed', liveUrl }) {
  const deploymentId = uuidv4();
  const timestamp = new Date().toISOString();

  if (isSupabaseConfigured) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('deployments').insert({
          id: deploymentId,
          project_id: projectId,
          user_id: session.user.id,
          provider,
          status,
          live_url: liveUrl,
          created_at: timestamp,
        });
      }
    } catch (e) {
      console.warn('Supabase deployment logging error:', e);
    }
  }

  const deployments = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DEPLOYMENTS_KEY) || '[]');
  deployments.unshift({
    id: deploymentId,
    project_id: projectId,
    provider,
    status,
    live_url: liveUrl,
    created_at: timestamp,
  });
  localStorage.setItem(LOCAL_STORAGE_DEPLOYMENTS_KEY, JSON.stringify(deployments));
}

/**
 * Gets deployment history for a project.
 */
export async function getProjectDeployments(projectId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('deployments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase deployment fetch error:', e);
    }
  }

  const deployments = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DEPLOYMENTS_KEY) || '[]');
  return deployments.filter((d) => d.project_id === projectId);
}
