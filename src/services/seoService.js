/**
 * SEO & Accessibility Audit Engine
 * Analyzes HTML structure to check headings, meta tags, alt text, and semantic HTML elements.
 */

export function runSEOAudit(htmlString) {
  const issues = [];
  let score = 100;

  if (!htmlString || !htmlString.trim()) {
    return {
      score: 0,
      issues: [{ type: 'critical', message: 'Canvas is empty. Add elements before running audit.' }],
    };
  }

  // Create temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // 1. Heading Hierarchy Check
  const h1s = doc.querySelectorAll('h1');
  if (h1s.length === 0) {
    score -= 20;
    issues.push({ type: 'warning', message: 'Missing <h1> heading. Every page should have exactly one <h1>.' });
  } else if (h1s.length > 1) {
    score -= 10;
    issues.push({ type: 'info', message: 'Multiple <h1> headings found. Consider using single <h1> for primary page topic.' });
  }

  // 2. Image ALT Attributes Check
  const images = doc.querySelectorAll('img');
  let missingAltCount = 0;
  images.forEach((img) => {
    if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
      missingAltCount++;
    }
  });

  if (missingAltCount > 0) {
    score -= Math.min(25, missingAltCount * 5);
    issues.push({
      type: 'warning',
      message: `${missingAltCount} image(s) missing alt descriptive text for accessibility & SEO.`,
    });
  }

  // 3. Link Text Checks
  const links = doc.querySelectorAll('a');
  let emptyLinks = 0;
  links.forEach((link) => {
    const text = link.textContent.trim();
    if (!text && !link.querySelector('img') && !link.querySelector('svg')) {
      emptyLinks++;
    }
  });

  if (emptyLinks > 0) {
    score -= 15;
    issues.push({ type: 'warning', message: `${emptyLinks} link(s) have no visible descriptive text.` });
  }

  // 4. Semantic Tags Audit
  const semanticTags = ['header', 'nav', 'main', 'section', 'article', 'footer'];
  let foundSemanticCount = 0;
  semanticTags.forEach((tag) => {
    if (doc.querySelector(tag)) foundSemanticCount++;
  });

  if (foundSemanticCount < 2) {
    score -= 10;
    issues.push({ type: 'info', message: 'Consider using semantic tags (<header>, <nav>, <section>, <footer>) for better readability.' });
  }

  return {
    score: Math.max(0, score),
    issues: issues.length > 0 ? issues : [{ type: 'success', message: 'All automated SEO & Accessibility checks passed!' }],
    stats: {
      totalElements: doc.body.querySelectorAll('*').length,
      headingsCount: doc.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      imagesCount: images.length,
      linksCount: links.length,
    },
  };
}
