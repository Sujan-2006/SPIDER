import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Code Export Service for SPIDER
 * Compiles project schema and GrapesJS canvas output into a clean, production-ready React + Vite + Tailwind bundle.
 */

export function generateReactCodeBundle(html, css, brandConfig = {}, projectName = 'spider-app') {
  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const primaryColor = brandConfig.primaryColor || '#9D50BB';
  const secondaryColor = brandConfig.secondaryColor || '#6E48AA';
  const fontFamilyHeading = brandConfig.fontFamilyHeading || 'Playfair Display';
  const fontFamilyBody = brandConfig.fontFamilyBody || 'Inter';

  // 1. App.jsx Component
  const appJsx = `import React from 'react';
import './tokens.css';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      ${html || '<main><h1>Welcome to SPIDER Generated Site</h1></main>'}
    </div>
  );
}
`;

  // 2. main.jsx Entry Point
  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  // 3. index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${fontFamilyHeading.replace(/\s+/g, '+')}&family=${fontFamilyBody.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

  // 4. tokens.css (Design Tokens + Canvas Styles)
  const tokensCss = `:root {
  --spider-primary: ${primaryColor};
  --spider-secondary: ${secondaryColor};
  --spider-font-heading: '${fontFamilyHeading}', serif;
  --spider-font-body: '${fontFamilyBody}', sans-serif;
  --spider-border-radius: ${brandConfig.borderRadius || '12px'};
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--spider-font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--spider-font-heading);
}

${css || ''}
`;

  // 5. package.json for Exported React App
  const packageJson = {
    name: sanitizedName,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^0.500.0"
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.3.0",
      vite: "^6.0.0"
    }
  };

  // 6. vite.config.js
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

  return {
    indexHtml,
    appJsx,
    mainJsx,
    tokensCss,
    packageJson: JSON.stringify(packageJson, null, 2),
    viteConfig,
  };
}

/**
 * Zips and downloads the complete React + Vite project.
 */
export async function downloadReactProjectZip(html, css, brandConfig = {}, projectName = 'spider-app') {
  const bundle = generateReactCodeBundle(html, css, brandConfig, projectName);
  const zip = new JSZip();

  // Root files
  zip.file('index.html', bundle.indexHtml);
  zip.file('package.json', bundle.packageJson);
  zip.file('vite.config.js', bundle.viteConfig);

  // Src folder
  const src = zip.folder('src');
  src.file('App.jsx', bundle.appJsx);
  src.file('main.jsx', bundle.mainJsx);
  src.file('tokens.css', bundle.tokensCss);

  const content = await zip.generateAsync({ type: 'blob' });
  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  saveAs(content, `${sanitizedName}-react-vite-export.zip`);
  return true;
}
