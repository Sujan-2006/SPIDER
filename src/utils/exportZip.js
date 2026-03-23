import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportZip = (html, css) => {
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Project - SPIDER Builder</title>
  <link rel="stylesheet" href="style.css">
  <!-- Include Google Fonts used in the builder -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0;">
  ${html}
</body>
</html>`;

  const zip = new JSZip();
  zip.file("index.html", fullHtml);
  zip.file("style.css", css);

  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, "website_project.zip");
  });
};
