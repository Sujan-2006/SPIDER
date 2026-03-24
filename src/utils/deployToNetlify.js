import JSZip from 'jszip';

export const deployToNetlify = async (html, css, token, existingSiteId = null) => {
  const zip = new JSZip();
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spider Built Site</title>
  <style>
    body { margin: 0; padding: 0; font-family: sans-serif; }
  </style>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${html}
</body>
</html>
  `;
  
  zip.file('index.html', htmlContent);
  zip.file('style.css', css || '');

  const base64zip = await zip.generateAsync({ type: 'base64' });

  // Securely call our custom Netlify Serverless Backend Function
  const url = '/.netlify/functions/deploy';
    
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token,
      siteId: existingSiteId,
      zipBase64: base64zip
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Netlify Deployment failed');
  }

  const data = await response.json();
  
  // When updating a site, the response is slightly different (Deploy object vs Site config object)
  // `data.url` gives the deploy URL, but usually we just want the main site URL
  return {
    url: data.ssl_url || data.url || data.deploy_ssl_url,
    siteId: data.site_id || data.id, // For site creation it's data.site_id, for deploy it's data.site_id
    adminUrl: data.admin_url
  };
};
