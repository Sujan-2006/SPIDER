const https = require('https');

exports.handler = async (event) => {
  // CORS Preflight headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS, POST'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { token, siteId, zipBase64 } = JSON.parse(event.body);

    if (!token || !zipBase64) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing token or zipBase64 content' }) };
    }

    // Convert base64 back to binary Buffer
    const zipBuffer = Buffer.from(zipBase64, 'base64');
    
    // Construct the correct Netlify API URL path
    const path = siteId ? `/api/v1/sites/${siteId}/deploys` : `/api/v1/sites`;

    // Make the explicit request to Netlify API
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.netlify.com',
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/zip',
          'Authorization': `Bearer ${token}`,
          'Content-Length': zipBuffer.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers,
            body: data
          });
        });
      });

      req.on('error', (e) => {
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: e.message })
        });
      });

      req.write(zipBuffer);
      req.end();
    });

  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
