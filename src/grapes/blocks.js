export const loadBlocks = (editor) => {
  const bm = editor.BlockManager;

  // Icons Helper
  const svgLayout = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14H19z"/></svg>`;
  const svgCols = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 5v14h18V5H3zm8 12H5V7h6v10zm8 0h-6V7h6v10z"/></svg>`;
  const svgText = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2.5 4v3h5v12h3V7h5V4h-13z"/></svg>`;
  const svgTypography = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`;
  const svgForms = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>`;
  const svgAdvanced = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  /* === CATEGORY: LAYOUT === */
  bm.add('hero-section', {
    label: 'Hero Section',
    category: 'Layout',
    media: svgLayout,
    content: {
      tagName: 'section',
      style: { 
        padding: '120px 20px', 
        display: 'flex', 
        'flex-direction': 'column', 
        'align-items': 'center', 
        'text-align': 'center',
        'background-image': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80")',
        'background-size': 'cover',
        'background-position': 'center',
        color: '#ffffff',
        'min-height': '600px',
        'justify-content': 'center'
      },
      components: [
        { tagName: 'h1', content: 'Design Your Legacy', style: { 'font-size': '4rem', 'font-family': '"Playfair Display", serif', 'margin-bottom': '20px', 'font-weight': '700' } },
        { tagName: 'p', content: 'Crafting sophisticated digital experiences with surgical precision.', style: { 'font-size': '1.2rem', 'max-width': '600px', 'margin-bottom': '40px', 'opacity': '0.9' } },
        { tagName: 'a', content: 'Begin Journey', style: { padding: '15px 40px', 'background-color': '#ffffff', color: '#111', 'text-decoration': 'none', 'border-radius': '4px', 'font-weight': '600', 'font-size': '14px', 'letter-spacing': '1px', 'text-transform': 'uppercase' } }
      ]
    }
  });

  bm.add('feature-grid', {
    label: 'Feature Grid',
    category: 'Layout',
    media: svgCols,
    content: {
      tagName: 'section',
      style: { padding: '80px 20px', 'background-color': '#ffffff' },
      components: [
        {
          tagName: 'div',
          style: { display: 'grid', 'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', 'max-width': '1200px', margin: '0 auto' },
          components: [
            {
              tagName: 'div',
              style: { padding: '30px', 'text-align': 'center', border: '1px solid #f0f0f0', 'border-radius': '12px' },
              components: [
                { tagName: 'h3', content: 'Ethereal Performance', style: { 'margin-bottom': '15px', 'font-family': '"Playfair Display", serif' } },
                { tagName: 'p', content: 'Lightning fast load times powered by our optimized core engine.', style: { color: '#666', 'font-size': '14px' } }
              ]
            },
            {
                tagName: 'div',
                style: { padding: '30px', 'text-align': 'center', border: '1px solid #f0f0f0', 'border-radius': '12px' },
                components: [
                  { tagName: 'h3', content: 'Editorial Aesthetic', style: { 'margin-bottom': '15px', 'font-family': '"Playfair Display", serif' } },
                  { tagName: 'p', content: 'Typography-first design that prioritizes content and legibility.', style: { color: '#666', 'font-size': '14px' } }
                ]
            },
            {
                tagName: 'div',
                style: { padding: '30px', 'text-align': 'center', border: '1px solid #f0f0f0', 'border-radius': '12px' },
                components: [
                  { tagName: 'h3', content: 'Global Scale', style: { 'margin-bottom': '15px', 'font-family': '"Playfair Display", serif' } },
                  { tagName: 'p', content: 'Deploy to the worlds edge with one-click Netlify integration.', style: { color: '#666', 'font-size': '14px' } }
                ]
            }
          ]
        }
      ]
    }
  });

  bm.add('section', {
    label: 'Empty Section',
    category: 'Layout',
    media: svgLayout,
    content: {
      tagName: 'section',
      style: { padding: '50px 0', width: '100%', 'min-height': '150px' }
    }
  });
  bm.add('container', {
    label: 'Container',
    category: 'Layout',
    media: svgLayout,
    content: {
      tagName: 'div',
      style: { 'max-width': '1200px', margin: '0 auto', padding: '0 20px', 'min-height': '50px' }
    }
  });
  bm.add('col-1', {
    label: '1 Column', category: 'Layout', media: svgCols,
    content: {
      tagName: 'div',
      style: { display: 'flex', gap: '20px' },
      components: [
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Column' }]
        }
      ]
    }
  });
  bm.add('col-2', {
    label: '2 Columns', category: 'Layout', media: svgCols,
    content: {
      tagName: 'div',
      style: { display: 'flex', gap: '20px' },
      components: [
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Column 1' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Column 2' }]
        }
      ]
    }
  });
  bm.add('col-3', {
    label: '3 Columns', category: 'Layout', media: svgCols,
    content: {
      tagName: 'div',
      style: { display: 'flex', gap: '20px' },
      components: [
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col 1' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col 2' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col 3' }]
        }
      ]
    }
  });
  bm.add('col-4', {
    label: '4 Columns', category: 'Layout', media: svgCols,
    content: {
      tagName: 'div',
      style: { display: 'flex', gap: '20px' },
      components: [
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col' }]
        },
        {
          tagName: 'div',
          style: { flex: '1', padding: '20px', border: '1px dashed rgba(0,0,0,0.1)' },
          components: [{ type: 'text', tagName: 'span', content: 'Col' }]
        }
      ]
    }
  });

  // ── RESPONSIVE GRID (3 → 2 → 1 column auto breakpoints) ─────────────────────
  const svgGrid = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>`;

  bm.add('grid-3col-responsive', {
    label: 'Grid 3→2→1',
    category: 'Responsive',
    media: svgGrid,
    content: {
      type: 'default',
      tagName: 'div',
      classes: ['grid-responsive'],
      attributes: { 'data-gjs-type': 'default' },
      style: { padding: '16px' },
      components: [
        {
          tagName: 'div', classes: ['grid-col'],
          style: { padding: '24px', background: '#f3f4f6', borderRadius: '8px', 'min-height': '120px' },
          components: [{ type: 'text', content: 'Column 1 — Desktop: 1/3<br/>Tablet: 1/2<br/>Mobile: full' }]
        },
        {
          tagName: 'div', classes: ['grid-col'],
          style: { padding: '24px', background: '#ede9fe', borderRadius: '8px', 'min-height': '120px' },
          components: [{ type: 'text', content: 'Column 2 — Desktop: 1/3<br/>Tablet: 1/2<br/>Mobile: full' }]
        },
        {
          tagName: 'div', classes: ['grid-col'],
          style: { padding: '24px', background: '#fce7f3', borderRadius: '8px', 'min-height': '120px' },
          components: [{ type: 'text', content: 'Column 3 — Desktop: 1/3<br/>Tablet: hidden (wraps)<br/>Mobile: full' }]
        },
      ]
    }
  });

  bm.add('grid-2col-responsive', {
    label: 'Grid 2→1',
    category: 'Responsive',
    media: svgCols,
    content: {
      type: 'default',
      tagName: 'div',
      attributes: { 'data-gjs-type': 'default' },
      style: {
        display: 'grid',
        'grid-template-columns': 'repeat(2, 1fr)',
        gap: '24px',
        width: '100%',
        'box-sizing': 'border-box',
      },
      components: [
        {
          tagName: 'div',
          style: { padding: '24px', background: '#f0fdf4', borderRadius: '8px', 'min-height': '120px' },
          components: [{ type: 'text', content: 'Left Column' }]
        },
        {
          tagName: 'div',
          style: { padding: '24px', background: '#fef9c3', borderRadius: '8px', 'min-height': '120px' },
          components: [{ type: 'text', content: 'Right Column' }]
        },
      ]
    }
  });


  /* === CATEGORY: TYPOGRAPHY === */
  bm.add('display-heading', {
    label: 'Display Heading',
    category: 'Typography',
    media: svgTypography,
    content: {
      tagName: 'h1',
      content: 'Sophisticated Minimalism.',
      style: { 
        'font-family': '"Playfair Display", serif', 
        'font-size': '5rem', 
        'font-weight': '700', 
        'line-height': '1.1', 
        'margin-bottom': '0.5em',
        color: '#111'
      }
    }
  });

  bm.add('lead-paragraph', {
    label: 'Lead Paragraph',
    category: 'Typography',
    media: svgText,
    content: {
      tagName: 'p',
      content: 'This is a lead paragraph designed to capture attention with large, elegant typography and balanced line height.',
      style: { 
        'font-size': '1.5rem', 
        'line-height': '1.6', 
        color: '#444', 
        'max-width': '800px',
        'margin-bottom': '1.5em'
      }
    }
  });

  bm.add('quote-editorial', {
    label: 'Editorial Quote',
    category: 'Typography',
    media: svgText,
    content: {
      tagName: 'blockquote',
      style: { 
        'border-left': '4px solid #9D50BB', 
        'padding-left': '30px', 
        'margin': '40px 0',
        'font-style': 'italic',
        'font-size': '1.8rem',
        'font-family': '"Playfair Display", serif',
        color: '#333'
      },
      components: [
        { tagName: 'span', content: '"Design is not just what it looks like and feels like. Design is how it works."' },
        { tagName: 'footer', content: '— Steve Jobs', style: { 'font-size': '1rem', 'font-style': 'normal', 'margin-top': '15px', color: '#888' } }
      ]
    }
  });

  bm.add('header-text', {
    label: 'H1 Heading',
    category: 'Typography',
    media: svgText,
    content: {
      type: 'text',
      tagName: 'h1',
      content: 'Heading',
      style: { 'font-family': "'Playfair Display', serif", 'font-size': '3rem', color: '#111', 'margin-bottom': '20px' }
    }
  });
  bm.add('paragraph-text', {
    label: 'Standard Paragraph',
    category: 'Typography',
    media: svgText,
    content: {
      type: 'text',
      tagName: 'p',
      content: 'Your compelling paragraph goes right here.',
      style: { 'font-family': "'Inter', sans-serif", 'font-size': '1.1rem', color: '#555', 'line-height': '1.6' }
    }
  });

  /* === CATEGORY: ADVANCED === */
  bm.add('navbar', {
    label: 'Navbar',
    category: 'Advanced Interactivity',
    media: svgLayout,
    content: {
      tagName: 'nav',
      style: { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', padding: '20px 40px', background: '#fff', 'border-bottom': '1px solid #eee' },
      components: [
        { tagName: 'div', style: { 'font-weight': 'bold', 'font-size': '1.5rem' }, components: [{ type: 'text', tagName: 'span', content: 'Brand' }] },
        {
          tagName: 'div',
          style: { display: 'flex', gap: '20px' },
          components: [
            { type: 'link', components: [{ type: 'text', tagName: 'span', content: 'Home' }], style: { color: '#333', 'text-decoration': 'none' }, attributes: { href: '#' } },
            { type: 'link', components: [{ type: 'text', tagName: 'span', content: 'About' }], style: { color: '#333', 'text-decoration': 'none' }, attributes: { href: '#' } },
            { type: 'link', components: [{ type: 'text', tagName: 'span', content: 'Contact' }], style: { color: '#333', 'text-decoration': 'none' }, attributes: { href: '#' } }
          ]
        }
      ]
    }
  });
  /* === CATEGORY: BASIC === */
  bm.add('link', {
    label: 'Link', category: 'Basic', media: svgText,
    content: { type: 'link', content: 'Link text', style: { color: '#9D50BB' } }
  });
  bm.add('image', {
    label: 'Image', category: 'Basic', media: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
    content: { type: 'image', style: { color: 'black', width: '100%', 'min-height': '50px' } }
  });
  bm.add('video', {
    label: 'Video', category: 'Basic', media: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`,
    content: { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', style: { height: '350px', width: '100%' } }
  });
  bm.add('map', {
    label: 'Map', category: 'Basic', media: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>`,
    content: { type: 'map', style: { height: '350px' } }
  });

  /* === CATEGORY: FORMS === */
  /* === CATEGORY: FORMS === */
  bm.add('contact-form', {
    label: 'Contact Form',
    category: 'Forms',
    media: svgForms,
    content: {
      tagName: 'form',
      style: { padding: '40px', 'background-color': '#fbfbfb', 'border-radius': '12px', 'max-width': '500px' },
      components: [
        { 
          tagName: 'div', style: { 'margin-bottom': '20px' },
          components: [
            { tagName: 'label', content: 'Full Name', style: { display: 'block', 'font-size': '12px', 'font-weight': '600', 'margin-bottom': '8px', 'text-transform': 'uppercase', 'letter-spacing': '1px' } },
            { tagName: 'input', attributes: { type: 'text', placeholder: 'Jane Doe', name: 'name' }, style: { width: '100%', padding: '12px', border: '1px solid #e0e0e0', 'border-radius': '6px' } }
          ]
        },
        { 
            tagName: 'div', style: { 'margin-bottom': '20px' },
            components: [
              { tagName: 'label', content: 'Email Address', style: { display: 'block', 'font-size': '12px', 'font-weight': '600', 'margin-bottom': '8px', 'text-transform': 'uppercase', 'letter-spacing': '1px' } },
              { tagName: 'input', attributes: { type: 'email', placeholder: 'jane@example.com', name: 'email' }, style: { width: '100%', padding: '12px', border: '1px solid #e0e0e0', 'border-radius': '6px' } }
            ]
        },
        { tagName: 'button', content: 'Send Message', attributes: { type: 'submit' }, style: { width: '100%', padding: '15px', 'background-color': '#9D50BB', color: '#fff', border: 'none', 'border-radius': '6px', 'font-weight': '600', cursor: 'pointer' } }
      ]
    }
  });

  bm.add('newsletter-signup', {
    label: 'Newsletter',
    category: 'Forms',
    media: svgForms,
    content: {
      tagName: 'div',
      style: { padding: '40px', 'background-color': '#111', color: '#fff', 'border-radius': '12px', 'text-align': 'center' },
      components: [
        { tagName: 'h3', content: 'Join the Vanguard', style: { 'font-family': '"Playfair Display", serif', 'font-size': '1.5rem', 'margin-bottom': '10px' } },
        { tagName: 'p', content: 'Receive curated design insights twice a month.', style: { 'font-size': '0.9rem', 'opacity': '0.7', 'margin-bottom': '20px' } },
        {
          tagName: 'form',
          style: { display: 'flex', gap: '10px', 'max-width': '400px', margin: '0 auto' },
          components: [
            { tagName: 'input', attributes: { type: 'email', placeholder: 'Email address' }, style: { flex: '1', padding: '12px', border: '1px solid #333', 'background-color': '#222', color: '#fff', 'border-radius': '6px' } },
            { tagName: 'button', content: 'Join', style: { padding: '12px 25px', 'background-color': '#9D50BB', color: '#fff', border: 'none', 'border-radius': '6px', 'font-weight': '600', cursor: 'pointer' } }
          ]
        }
      ]
    }
  });

  /* === CATEGORY: INTERACTIVE === */
  const svgTimer = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  
  bm.add('countdown-premium', {
    label: 'Countdown',
    category: 'Interactive',
    media: svgTimer,
    content: {
      type: 'countdown',
      style: { padding: '40px', 'text-align': 'center', 'background-color': '#f8f9fa', 'border-radius': '12px' },
      components: [
        { tagName: 'h4', content: 'Launch Countdown', style: { 'margin-bottom': '15px', 'text-transform': 'uppercase', 'letter-spacing': '2px', 'font-size': '12px', color: '#888' } }
      ]
    }
  });

  bm.add('accordion-editorial', {
    label: 'Accordion',
    category: 'Interactive',
    media: svgLayout,
    content: {
      tagName: 'div',
      style: { 'max-width': '600px', margin: '20px 0' },
      components: [
        {
          tagName: 'details',
          style: { border: '1px solid #eee', 'border-radius': '8px', 'margin-bottom': '10px', overflow: 'hidden' },
          components: [
            { tagName: 'summary', content: 'How it Works', style: { padding: '15px 20px', 'font-weight': '600', cursor: 'pointer', 'background-color': '#fff', outline: 'none' } },
            { tagName: 'div', content: 'Spider uses a proprietary core engine to transform your visual designs into production-ready React code.', style: { padding: '20px', 'line-height': '1.6', color: '#666', 'background-color': '#fafafa' } }
          ]
        },
        {
            tagName: 'details',
            style: { border: '1px solid #eee', 'border-radius': '8px', 'margin-bottom': '10px', overflow: 'hidden' },
            components: [
              { tagName: 'summary', content: 'Pricing & Licensing', style: { padding: '15px 20px', 'font-weight': '600', cursor: 'pointer', 'background-color': '#fff', outline: 'none' } },
              { tagName: 'div', content: 'Our licensing model is designed for solo creators and large agency teams alike.', style: { padding: '20px', 'line-height': '1.6', color: '#666', 'background-color': '#fafafa' } }
            ]
        }
      ]
    }
  });

  /* === CATEGORY: ADVANCED === */
  bm.add('testimonial-card', {
    label: 'Testimonial',
    category: 'Advanced Interactivity',
    media: svgAdvanced,
    content: {
      tagName: 'div',
      style: { padding: '40px', 'background-color': '#fff', 'border-radius': '20px', 'box-shadow': '0 10px 40px rgba(0,0,0,0.05)', 'max-width': '400px' },
      components: [
        { tagName: 'div', content: '★★★★★', style: { color: '#FFD700', 'margin-bottom': '15px', 'font-size': '18px' } },
        { tagName: 'p', content: 'The Spider editor has completely transformed our workflow. The editorial control is unmatched.', style: { 'font-style': 'italic', 'margin-bottom': '20px', color: '#444' } },
        {
          tagName: 'div',
          style: { display: 'flex', 'align-items': 'center', gap: '15px' },
          components: [
            { tagName: 'div', style: { width: '40px', height: '40px', 'border-radius': '50%', 'background-color': '#eee' } },
            { tagName: 'div', content: 'Alexander Hunt', style: { 'font-weight': '700', 'font-size': '14px' } }
          ]
        }
      ]
    }
  });

  /* === CATEGORY: SYMBOLS === */
  // Will be dynamically populated via the manager
};
