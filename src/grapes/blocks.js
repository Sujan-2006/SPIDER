export const loadBlocks = (editor) => {
  const bm = editor.BlockManager;

  // Icons Helper
  const svgLayout = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14H19z"/></svg>`;
  const svgCols = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 5v14h18V5H3zm8 12H5V7h6v10zm8 0h-6V7h6v10z"/></svg>`;
  const svgText = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2.5 4v3h5v12h3V7h5V4h-13z"/></svg>`;

  /* === CATEGORY: LAYOUT === */
  bm.add('section', {
    label: 'Section',
    category: 'Layout',
    media: svgLayout,
    content: {
      tagName: 'section',
      style: { padding: '50px 0', width: '100%', 'min-height': '100px' }
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


  bm.add('header-text', {
    label: 'Header',
    category: 'Basic',
    media: svgText,
    content: {
      type: 'text',
      tagName: 'h1',
      content: 'Heading',
      style: { 'font-family': "'Playfair Display', serif", 'font-size': '3rem', color: '#111', 'margin-bottom': '20px' }
    }
  });
  bm.add('paragraph-text', {
    label: 'Paragraph',
    category: 'Basic',
    media: svgText,
    content: {
      type: 'text',
      tagName: 'p',
      content: 'Your compelling paragraph goes right here.',
      style: { 'font-family': "'Inter', sans-serif", 'font-size': '1.1rem', color: '#555', 'line-height': '1.6' }
    }
  });
  bm.add('quote', {
    label: 'Quote',
    category: 'Basic',
    media: svgText,
    content: {
      type: 'text',
      tagName: 'blockquote',
      content: '"Simplicity is the ultimate sophistication."',
      style: { 'font-family': "'Playfair Display', serif", 'font-style': 'italic', 'font-size': '1.5rem', color: '#9D50BB', 'border-left': '4px solid #9D50BB', 'padding-left': '20px', margin: '20px 0' }
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
  bm.add('form', {
    label: 'Form', category: 'Forms', media: svgLayout,
    content: {
      type: 'form',
      style: { padding: '20px', 'min-height': '50px', background: '#fafafa', 'border-radius': '8px' },
      components: [
        { type: 'label', content: 'Name', style: { display: 'block', 'margin-bottom': '5px' } },
        { type: 'input', attributes: { type: 'text', placeholder: 'Enter name' }, style: { padding: '10px', 'margin-bottom': '15px', width: '100%', border: '1px solid #ccc', 'border-radius': '4px' } },
        { type: 'label', content: 'Email', style: { display: 'block', 'margin-bottom': '5px' } },
        { type: 'input', attributes: { type: 'email', placeholder: 'Enter email' }, style: { padding: '10px', 'margin-bottom': '15px', width: '100%', border: '1px solid #ccc', 'border-radius': '4px' } },
        { type: 'button', content: 'Submit', style: { padding: '10px 20px', background: '#9D50BB', color: '#fff', border: 'none', 'border-radius': '4px', cursor: 'pointer' } }
      ]
    }
  });

  /* === CATEGORY: SYMBOLS === */
  // Will be dynamically populated via the manager
};
