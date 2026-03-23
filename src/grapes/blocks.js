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
    content: `<section style="padding: 50px 0; width: 100%; min-height: 100px;"></section>`
  });
  bm.add('container', {
    label: 'Container',
    category: 'Layout',
    media: svgLayout,
    content: `<div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; min-height: 50px;"></div>`
  });
  bm.add('col-1', {
    label: '1 Column', category: 'Layout', media: svgCols, content: `<div style="display: flex; gap: 20px;"><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Column</div></div>`
  });
  bm.add('col-2', {
    label: '2 Columns', category: 'Layout', media: svgCols, content: `<div style="display: flex; gap: 20px;"><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Column 1</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Column 2</div></div>`
  });
  bm.add('col-3', {
    label: '3 Columns', category: 'Layout', media: svgCols, content: `<div style="display: flex; gap: 20px;"><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col 1</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col 2</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col 3</div></div>`
  });
  bm.add('col-4', {
    label: '4 Columns', category: 'Layout', media: svgCols, content: `<div style="display: flex; gap: 20px;"><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col</div><div style="flex: 1; padding: 20px; border: 1px dashed rgba(0,0,0,0.1);">Col</div></div>`
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
    content: `<h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #111; margin-bottom: 20px;">Heading</h1>`
  });
  bm.add('paragraph-text', {
    label: 'Paragraph',
    category: 'Basic',
    media: svgText,
    content: `<p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #555; line-height: 1.6;">Your compelling paragraph goes right here.</p>`
  });
  bm.add('quote', {
    label: 'Quote',
    category: 'Basic',
    media: svgText,
    content: `<blockquote style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.5rem; color: #9D50BB; border-left: 4px solid #9D50BB; padding-left: 20px; margin: 20px 0;">"Simplicity is the ultimate sophistication."</blockquote>`
  });

  /* === CATEGORY: ADVANCED === */
  bm.add('navbar', {
    label: 'Navbar',
    category: 'Advanced Interactivity',
    media: svgLayout,
    content: `
      <nav style="display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: #fff; border-bottom: 1px solid #eee;">
        <div style="font-weight: bold; font-size: 1.5rem;">Brand</div>
        <div style="display: flex; gap: 20px;">
           <a href="#" style="color: #333; text-decoration: none;">Home</a>
           <a href="#" style="color: #333; text-decoration: none;">About</a>
           <a href="#" style="color: #333; text-decoration: none;">Contact</a>
        </div>
      </nav>
    `
  });
  
  // Note: GrapesJS Plugins automatically add: 
  // Text, Link, Image, Video, Map (Basic)
  // Form, Input, Textarea, Select, Checkbox, Radio, Label, Button (Forms)
  // Tabs (Advanced Interactivity plugin)
  // Countdown (Advanced Interactivity plugin)
  // Tooltip (Advanced Interactivity plugin)
};
