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

  /* === CATEGORY: BASIC === */
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
