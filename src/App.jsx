import React, { useState, useEffect } from 'react';
import { 
  Type, Square, Image as ImageIcon, CheckSquare, Code, Download, X, Copy, Globe, Loader2,
  Heading, Minus, Layout, Box, Columns, Columns2, AlignLeft, List, Send, Navigation, PanelBottom, CreditCard, LayoutTemplate,
  ArrowUp, ArrowDown, Files, Trash2, Monitor, Tablet, Smartphone, Layers, LayoutPanelLeft
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const COMPONENT_CATEGORIES = [
  {
    category: 'Basic',
    items: [
      { type: 'text', label: 'Text', icon: Type, description: 'Add a text block' },
      { type: 'heading', label: 'Heading', icon: Heading, description: 'Large title text' },
      { type: 'button', label: 'Button', icon: Square, description: 'Clickable button' },
      { type: 'image', label: 'Image', icon: ImageIcon, description: 'Insert an image' },
      { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line' }
    ]
  },
  {
    category: 'Layout',
    items: [
      { type: 'section', label: 'Section', icon: Layout, description: 'Full-width block' },
      { type: 'container', label: 'Container', icon: Box, description: 'Bounded content box' },
      { type: 'grid-2', label: 'Grid (2-Col)', icon: Columns, description: 'Two columns' },
      { type: 'grid-3', label: 'Grid (3-Col)', icon: Columns2, description: 'Three columns' },
      { type: 'flex-row', label: 'Flex Row', icon: AlignLeft, description: 'Horizontal layout' }
    ]
  },
  {
    category: 'Forms',
    items: [
      { type: 'input', label: 'Input', icon: Type, description: 'Text field' },
      { type: 'textarea', label: 'Textarea', icon: AlignLeft, description: 'Multi-line text' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Tick box' },
      { type: 'radio', label: 'Radio Button', icon: List, description: 'Single choice' },
      { type: 'submit', label: 'Submit Button', icon: Send, description: 'Form submit' }
    ]
  },
  {
    category: 'Advanced',
    items: [
      { type: 'navbar', label: 'Navbar', icon: Navigation, description: 'Top navigation' },
      { type: 'footer', label: 'Footer', icon: PanelBottom, description: 'Bottom page footer' },
      { type: 'card', label: 'Card', icon: CreditCard, description: 'Content card block' },
      { type: 'hero', label: 'Hero Section', icon: LayoutTemplate, description: 'Main prominent header' }
    ]
  }
];

const getDefaultProps = (type) => {
  switch (type) {
    case 'text':
      return { content: 'Sample Text', styles: { color: '#333333', fontSize: '16px', padding: '10px' } };
    case 'heading':
      return { content: 'Heading Title', styles: { color: '#111827', fontSize: '32px', fontWeight: 'bold', padding: '10px', margin: '0' } };
    case 'button':
      return { content: 'Click Me', styles: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' } };
    case 'image':
      return { content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', styles: { width: '100%', maxWidth: '400px', borderRadius: '8px' } };
    case 'divider':
      return { content: '', styles: { width: '100%', height: '2px', backgroundColor: '#e5e7eb', margin: '20px 0' } };
    case 'section':
      return { content: 'Section Block', styles: { width: '100%', padding: '40px 20px', backgroundColor: '#f3f4f6', textAlign: 'center' } };
    case 'container':
      return { content: 'Container Box', styles: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' } };
    case 'grid-2':
      return { content: '2-Column Grid Area', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px', backgroundColor: '#e0f2fe', borderRadius: '8px' } };
    case 'grid-3':
      return { content: '3-Column Grid Area', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: '20px', backgroundColor: '#dcfce3', borderRadius: '8px' } };
    case 'flex-row':
      return { content: 'Flex Row Wrapper', styles: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '8px' } };
    case 'input':
      return { content: 'Enter text here...', styles: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' } };
    case 'textarea':
      return { content: 'Enter long text here...', styles: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' } };
    case 'checkbox':
      return { content: 'Accept Terms', styles: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' } };
    case 'radio':
      return { content: 'Option 1', styles: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' } };
    case 'submit':
      return { content: 'Submit Form', styles: { backgroundColor: '#10b981', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' } };
    case 'navbar':
      return { content: 'Navbar Header', styles: { width: '100%', padding: '20px', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } };
    case 'footer':
      return { content: '© 2026 Footer Area', styles: { width: '100%', padding: '40px 20px', backgroundColor: '#111827', color: '#9ca3af', textAlign: 'center', marginTop: '40px' } };
    case 'card':
      return { content: 'Card Title\nCard Description Content', styles: { padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' } };
    case 'hero':
      return { content: 'Welcome to our platform.\nBuild something amazing.', styles: { width: '100%', padding: '80px 20px', backgroundColor: '#4f46e5', color: 'white', textAlign: 'center', borderRadius: '12px' } };
    case 'form':
      return { content: { buttonText: 'Submit', placeholder: 'Enter text...' }, styles: { display: 'flex', gap: '8px', padding: '10px' } };
    default:
      return { content: 'New Element', styles: { padding: '10px', backgroundColor: '#eee' } };
  }
};

const TEMPLATES = {
  portfolio: [
    { id: 'p1', type: 'navbar', content: 'Alex Dev', styles: { width: '100%', padding: '20px 40px', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [] },
    { id: 'p2', type: 'hero', content: 'Creative Developer & Designer\nCrafting digital experiences that matter.', styles: { width: '100%', padding: '120px 20px', backgroundColor: '#4f46e5', color: 'white', textAlign: 'center' }, children: [] },
    { id: 'p3', type: 'container', content: '', styles: { width: '100%', maxWidth: '1000px', margin: '60px auto', padding: '20px' }, children: [
      { id: 'p3-h', type: 'heading', content: 'Featured Projects', styles: { textAlign: 'center', marginBottom: '40px', fontSize: '36px' }, children: [] },
      { id: 'p3-g', type: 'grid-3', content: '', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }, children: [
        { id: 'p4', type: 'card', content: 'Project Alpha\nReact Dashboard', styles: { padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }, children: [] },
        { id: 'p5', type: 'card', content: 'Project Beta\nE-commerce Mobile App', styles: { padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }, children: [] },
        { id: 'p6', type: 'card', content: 'Project Gamma\nAI Image Generator', styles: { padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }, children: [] }
      ]}
    ]},
    { id: 'p7', type: 'footer', content: '© 2026 Crafted with Antigravity', styles: { padding: '40px', backgroundColor: '#111827', color: 'gray', textAlign: 'center' }, children: [] }
  ],
  business: [
    { id: 'b1', type: 'navbar', content: 'SaaS Pro', styles: { width: '100%', padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }, children: [] },
    { id: 'b2', type: 'section', content: '', styles: { padding: '80px 20px', backgroundColor: '#f9fafb' }, children: [
      { id: 'b2-h', type: 'heading', content: 'Grow Your Business Faster', styles: { fontSize: '48px', textAlign: 'center', color: '#111827' }, children: [] },
      { id: 'b2-t', type: 'text', content: 'The all-in-one platform for modern enterprise scale.', styles: { textAlign: 'center', color: '#6b7280', fontSize: '18px', maxWidth: '600px', margin: '20px auto' }, children: [] },
      { id: 'b2-b', type: 'button', content: 'Get Started Free', styles: { display: 'block', margin: '30px auto', backgroundColor: '#2563eb', color: 'white', padding: '12px 32px', borderRadius: '8px' }, children: [] }
    ]},
    { id: 'b3', type: 'section', content: '', styles: { padding: '100px 20px', backgroundColor: 'white' }, children: [
        { id: 'b3-g', type: 'grid-2', content: '', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1000px', margin: '0 auto' }, children: [
            { id: 'b3-i', type: 'image', content: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800', styles: { borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }, children: [] },
            { id: 'b3-c', type: 'container', content: '', styles: { display: 'flex', flexDirection: 'column', justifyContent: 'center' }, children: [
                { id: 'b3-h2', type: 'heading', content: 'Powerful Analytics', styles: { fontSize: '32px' }, children: [] },
                { id: 'b3-t2', type: 'text', content: 'Understand every customer interaction with deep-dive data metrics and real-time visualization.', styles: { marginTop: '15px', color: '#4b5563' }, children: [] }
            ]}
        ]}
    ]}
  ],
  blog: [
    { id: 'bl1', type: 'navbar', content: 'Tech Blog', styles: { padding: '20px', backgroundColor: '#ef4444', color: 'white' }, children: [] },
    { id: 'bl2', type: 'container', content: '', styles: { maxWidth: '800px', margin: '40px auto', padding: '20px' }, children: [
        { id: 'bl2-h', type: 'heading', content: 'Inside the Future of AI', styles: { fontSize: '42px', marginBottom: '10px' }, children: [] },
        { id: 'bl2-t', type: 'text', content: 'Published March 23, 2026', styles: { color: 'gray', marginBottom: '30px' }, children: [] },
        { id: 'bl2-i', type: 'image', content: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', styles: { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }, children: [] },
        { id: 'bl2-p1', type: 'text', content: 'Artificial intelligence is moving at a breakneck pace. This week, we saw new breakthroughs in recursive reasoning and multimodal latency...', styles: { marginTop: '30px', fontSize: '18px', lineHeight: '1.8' }, children: [] }
    ]}
  ]
};

const camelToDash = (str) => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

export default function App() {
  const SAVE_KEY = 'antigravity_builder_project_v1';

  const [elements, setElements] = useState(() => {
    try {
      const saved = localStorage.getItem('antigravity_builder_project_v1');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to load project:", e);
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(null);
  const [deviceView, setDeviceView] = useState('desktop');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState('');
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [activeSidebarTab, setActiveSidebarTab] = useState('build'); // 'build' or 'layers'

  useEffect(() => {
    localStorage.setItem('antigravity_builder_project_v1', JSON.stringify(elements));
  }, [elements]);



  const CONTAINER_TYPES = ['section', 'container', 'grid-2', 'grid-3', 'flex-row', 'card', 'hero', 'navbar', 'footer'];

  const findAndModifyElement = (items, id, modifyFn) => {
    return items.map(el => {
      if (el.id === id) return modifyFn(el);
      if (el.children && el.children.length > 0) {
        return { ...el, children: findAndModifyElement(el.children, id, modifyFn) };
      }
      return el;
    });
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleItemDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData('componentType');
    const reorderId = e.dataTransfer.getData('reorderId');

    if (reorderId && reorderId !== targetId) {
      setElements(prev => {
        const items = [...prev];
        let draggedItem = null;
        const removeDragged = (list) => {
          const idx = list.findIndex(i => i.id === reorderId);
          if (idx !== -1) {
            [draggedItem] = list.splice(idx, 1);
            return true;
          }
          return list.some(i => i.children && removeDragged(i.children));
        };
        removeDragged(items);

        const insertAtTarget = (list) => {
          const tIdx = list.findIndex(i => i.id === targetId);
          if (tIdx !== -1) {
            list.splice(tIdx, 0, draggedItem);
            return true;
          }
          return list.some(i => i.children && insertAtTarget(i.children));
        };
        insertAtTarget(items);
        return items;
      });
    } else if (type) {
      const defaultProps = getDefaultProps(type);
      const newElement = {
        id: Date.now().toString(),
        type,
        content: defaultProps.content,
        styles: defaultProps.styles,
        children: []
      };
      setElements(prev => findAndModifyElement(prev, targetId, (el) => {
        // Drop ABOVE the target item or into it if container
        if (CONTAINER_TYPES.includes(el.type)) {
          return { ...el, children: [...(el.children || []), newElement] };
        }
        return el; // Default to standard insert behavior handled by parent
      }));
      setSelectedId(newElement.id);
    }
  };

  const handleContainerDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData('componentType');
    if (type) {
      const defaultProps = getDefaultProps(type);
      const newElement = {
        id: Date.now().toString(),
        type,
        content: defaultProps.content,
        styles: defaultProps.styles,
        children: []
      };
      setElements(prev => findAndModifyElement(prev, targetId, (el) => ({
        ...el, children: [...(el.children || []), newElement]
      })));
      setSelectedId(newElement.id);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    if (type) {
      const defaultProps = getDefaultProps(type);
      const newElement = {
        id: Date.now().toString(),
        type,
        content: defaultProps.content,
        styles: defaultProps.styles,
        children: []
      };
      setElements([...elements, newElement]);
      setSelectedId(newElement.id);
    }
  };

  const updateElement = (id, key, value, isStyle = false) => {
    setElements(prev => findAndModifyElement(prev, id, (el) => {
      if (isStyle) {
        if (deviceView === 'desktop') return { ...el, styles: { ...el.styles, [key]: value } };
        if (deviceView === 'tablet') return { ...el, tabletStyles: { ...(el.tabletStyles || {}), [key]: value } };
        return { ...el, mobileStyles: { ...(el.mobileStyles || {}), [key]: value } };
      }
      return { ...el, [key]: value };
    }));
  };

  const getCombinedStyles = (el) => {
    const combined = { ...el.styles };
    if (deviceView === 'tablet' || deviceView === 'mobile') {
      Object.assign(combined, el.tabletStyles || {});
    }
    if (deviceView === 'mobile') {
      Object.assign(combined, el.mobileStyles || {});
    }
    return combined;
  };

  const getAllElementsRecursive = (items) => {
    let all = [];
    items.forEach(el => {
      all.push(el);
      if (el.children && el.children.length > 0) {
        all = all.concat(getAllElementsRecursive(el.children));
      }
    });
    return all;
  };

  const generateCSS = () => {
    let cssString = `/* Base Styles */\nbody {\n  font-family: system-ui, sans-serif;\n  background-color: #f8fafc;\n  margin: 0;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n`;
    
    const allElements = getAllElementsRecursive(elements);

    // Desktop (Base)
    allElements.forEach(el => {
      cssString += `.el-${el.id} {\n`;
      for (const [key, value] of Object.entries(el.styles || {})) {
        if (value) cssString += `  ${camelToDash(key)}: ${value};\n`;
      }
      cssString += `}\n\n`;
    });

    // Tablet
    cssString += `/* Tablet Overrides */\n@media (max-width: 768px) {\n`;
    allElements.forEach(el => {
      if (el.tabletStyles && Object.keys(el.tabletStyles).length > 0) {
        cssString += `  .el-${el.id} {\n`;
        for (const [key, value] of Object.entries(el.tabletStyles)) {
          if (value) cssString += `    ${camelToDash(key)}: ${value};\n`;
        }
        cssString += `  }\n`;
      }
    });
    cssString += `}\n\n`;

    // Mobile
    cssString += `/* Mobile Overrides */\n@media (max-width: 480px) {\n`;
    allElements.forEach(el => {
      if (el.mobileStyles && Object.keys(el.mobileStyles).length > 0) {
        cssString += `  .el-${el.id} {\n`;
        for (const [key, value] of Object.entries(el.mobileStyles)) {
          if (value) cssString += `    ${camelToDash(key)}: ${value};\n`;
        }
        cssString += `  }\n`;
      }
    });
    cssString += `}\n`;

    return cssString;
  };

  const generateHTML = () => {
    let htmlString = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Exported Website</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n`;
    
    const buildHTML = (items, indent = "  ") => {
      let html = "";
      items.forEach(el => {
        let content = el.content || "";
        if (el.children && el.children.length > 0) {
          content = "\n" + buildHTML(el.children, indent + "  ") + indent;
        }

        switch (el.type) {
          case 'text':
            html += `${indent}<p class="el-${el.id}">${content}</p>\n`; break;
          case 'heading':
            html += `${indent}<h2 class="el-${el.id}">${content}</h2>\n`; break;
          case 'section':
          case 'container':
          case 'grid-2':
          case 'grid-3':
          case 'flex-row':
          case 'navbar':
          case 'footer':
          case 'card':
          case 'hero':
            html += `${indent}<div class="el-${el.id}">${content}</div>\n`; break;
          case 'button':
          case 'submit':
            html += `${indent}<button class="el-${el.id}" onclick="handleButtonClick('${el.id}')">${content}</button>\n`; break;
          case 'image':
            html += `${indent}<img class="el-${el.id}" src="${el.content}" alt="Image" />\n`; break;
          case 'divider':
            html += `${indent}<div class="el-${el.id}"></div>\n`; break;
          case 'input':
            html += `${indent}<input type="text" class="el-${el.id}" placeholder="${el.content}" />\n`; break;
          case 'textarea':
            html += `${indent}<textarea class="el-${el.id}" placeholder="${el.content}"></textarea>\n`; break;
          case 'checkbox':
            html += `${indent}<div class="el-${el.id}"><input type="checkbox" id="chk-${el.id}" /> <label for="chk-${el.id}">${el.content}</label></div>\n`; break;
          case 'radio':
            html += `${indent}<div class="el-${el.id}"><input type="radio" id="rad-${el.id}" /> <label for="rad-${el.id}">${el.content}</label></div>\n`; break;
          default:
            html += `${indent}<div class="el-${el.id}">${content}</div>\n`; break;
        }
      });
      return html;
    };

    htmlString += buildHTML(elements);
    htmlString += `  <script src="script.js"></script>\n</body>\n</html>`;
    return htmlString;
  };

  const generateJS = () => {
    return `// Exported Interactivity Scripts\n
document.addEventListener('DOMContentLoaded', () => {
  console.log('Website Initialized from Builder!');
});

function handleButtonClick(id) {
  alert('Button ' + id + ' clicked!');
}
`;
  };

  const handleDownloadZIP = () => {
    const zip = new JSZip();
    zip.file("index.html", generateHTML());
    zip.file("style.css", generateCSS());
    zip.file("script.js", generateJS());
    
    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "website_export.zip");
    });
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployedUrl(null);
    
    // SEQUENCE Simulation:
    setDeployStep('Compiling HTML and CSS...');
    const html = generateHTML();
    const css = generateCSS();
    // Prepare for REAL API: payload = { files: { 'index.html': html, 'style.css': css } }
    console.log("FILES READY FOR API:", { htmlLength: html.length, cssLength: css.length });

    await new Promise(r => setTimeout(r, 1000));
    setDeployStep('Optimizing for production...');
    await new Promise(r => setTimeout(r, 1000));
    setDeployStep('Uploading to static host...');
    await new Promise(r => setTimeout(r, 1200));

    const randomString = Math.random().toString(36).substring(2, 8);
    setDeployedUrl(`https://site-${randomString}.netlify.app`);
    setIsDeploying(false);
    setDeployStep('');
  };

  const handleMoveUp = () => {
    const idx = elements.findIndex(e => e.id === selectedId);
    if (idx > 0) {
      const newEls = [...elements];
      [newEls[idx - 1], newEls[idx]] = [newEls[idx], newEls[idx - 1]];
      setElements(newEls);
    }
  };

  const handleMoveDown = () => {
    const idx = elements.findIndex(e => e.id === selectedId);
    if (idx !== -1 && idx < elements.length - 1) {
      const newEls = [...elements];
      [newEls[idx + 1], newEls[idx]] = [newEls[idx], newEls[idx + 1]];
      setElements(newEls);
    }
  };

  const handleDuplicate = () => {
    if (!selectedId) return;
    setElements(prev => {
      const items = [...prev];
      const performDuplicate = (list) => {
        const idx = list.findIndex(i => i.id === selectedId);
        if (idx !== -1) {
          const newEl = JSON.parse(JSON.stringify(list[idx]));
          newEl.id = Date.now().toString();
          list.splice(idx + 1, 0, newEl);
          setSelectedId(newEl.id);
          return true;
        }
        return list.some(i => i.children && performDuplicate(i.children));
      };
      performDuplicate(items);
      return items;
    });
  };

  const handleRemove = (id) => {
    setElements(prev => {
      const items = [...prev];
      const performRemove = (list) => {
        const idx = list.findIndex(i => i.id === id);
        if (idx !== -1) {
          list.splice(idx, 1);
          return true;
        }
        return list.some(i => i.children && performRemove(i.children));
      };
      performRemove(items);
      return items;
    });
    setSelectedId(null);
  };

  const loadTemplate = (name) => {
    if (elements.length > 0 && !confirm('Setting a template will replace your current canvas. Continue?')) return;
    const templateData = JSON.parse(JSON.stringify(TEMPLATES[name]));
    // Assign fresh IDs to avoid collisions
    const reassignIds = (items) => items.map(it => ({
      ...it,
      id: Math.random().toString(36).substr(2, 9),
      children: it.children ? reassignIds(it.children) : []
    }));
    setElements(reassignIds(templateData));
    setSelectedId(null);
  };

  function findElementRecursive(items, id) {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findElementRecursive(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function renderComponent(el) {
    const activeStyles = getCombinedStyles(el);
    const isContainer = CONTAINER_TYPES.includes(el.type);

    function containerWrapper() {
      return (
        <div 
          style={activeStyles} 
          onDrop={(e) => handleContainerDrop(e, el.id)}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className={`min-h-[100px] border border-dashed border-gray-400/30 rounded-lg p-4 transition-all ${el.children && el.children.length === 0 ? 'bg-gray-50/50' : ''}`}
        >
          {el.children && el.children.length > 0 ? (
            <div className={`${(el.styles || {}).display === 'grid' ? '' : 'space-y-4'}`}>
              {el.children.map(child => (
                <RenderElement key={child.id} el={child} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs italic pointer-events-none">
              Drop here
            </div>
          )}
        </div>
      );
    }

    switch (el.type) {
      case 'text': return <p style={activeStyles}>{el.content}</p>;
      case 'heading': return <h2 style={activeStyles}>{el.content}</h2>;
      case 'section':
      case 'container':
      case 'grid-2':
      case 'grid-3':
      case 'flex-row':
      case 'navbar':
      case 'footer':
      case 'card':
      case 'hero': return containerWrapper();
      case 'button':
      case 'submit': return <button style={activeStyles} className="transition-all duration-200 hover:opacity-90 active:scale-95">{el.content}</button>;
      case 'image': return <img src={el.content} alt="Visual" style={activeStyles} className="transition-all duration-300 hover:scale-[1.01]" />;
      case 'divider': return <div style={activeStyles}></div>;
      case 'input': return <input type="text" placeholder={el.content} style={activeStyles} />;
      case 'textarea': return <textarea placeholder={el.content} style={activeStyles} />;
      case 'checkbox':
        return (
          <div style={activeStyles}>
            <input type="checkbox" /> <span>{el.content}</span>
          </div>
        );
      case 'radio':
        return (
          <div style={activeStyles}>
            <input type="radio" /> <span>{el.content}</span>
          </div>
        );
      default: return <div style={activeStyles}>{el.content}</div>;
    }
  }

  function RenderElement({ el }) {
    const isSelected = selectedId === el.id;
    return (
      <div 
        key={el.id} 
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData('reorderId', el.id);
          e.dataTransfer.effectAllowed = 'move';
          setSelectedId(el.id);
        }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => handleItemDrop(e, el.id)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(el.id);
        }}
        className={`relative rounded-lg cursor-grab active:cursor-grabbing transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2 hover:scale-[1.005] ${
          isSelected 
            ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-white shadow-xl z-30' 
            : 'hover:ring-2 hover:ring-blue-200 hover:ring-offset-2'
        }`}
      >
        <div className={isSelected ? 'pointer-events-none' : ''}>
          {renderComponent(el)}
        </div>
        {isSelected && (
          <div className="absolute -top-7 left-0 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-t-md z-10 pointer-events-none shadow-sm flex items-center gap-2">
            {el.type}
          </div>
        )}
      </div>
    );
  }

  function LayerItem({ el, depth = 0 }) {
    const isSelected = selectedId === el.id;
    const isContainer = CONTAINER_TYPES.includes(el.type);
    
    return (
      <div className="space-y-1">
        <button
          onClick={() => setSelectedId(el.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
            isSelected 
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-transparent'
          }`}
          style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        >
          <div className={`p-1 rounded ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500 group-hover:text-gray-300'}`}>
            <Box className="w-3 h-3" />
          </div>
          <span className="truncate font-medium capitalize">{el.type.replace('-', ' ')}</span>
          {isContainer && (
            <span className="ml-auto text-[10px] bg-gray-900 px-1.5 rounded text-gray-500 group-hover:text-gray-400 border border-gray-700/50">
              {el.children?.length || 0}
            </span>
          )}
        </button>
        {isContainer && el.children && el.children.length > 0 && (
          <div className="border-l border-gray-800 ml-4">
            {el.children.map(child => (
              <LayerItem key={child.id} el={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const selectedElement = findElementRecursive(elements, selectedId);

  return (
    <div className="flex w-full h-screen font-sans bg-gray-100 overflow-hidden relative">
      {/* Left Sidebar (20%) */}
      <div className="w-1/5 bg-[#1f2937] text-white flex flex-col shadow-2xl z-20 border-r border-gray-800 overflow-hidden">
        <div className="pt-8 pb-4 px-6 bg-[#1f2937] z-10 border-b border-gray-800">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-wide text-gray-100 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                {activeSidebarTab === 'build' ? 'Builder' : 'Layers'}
              </h2>
              <div className="flex bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                <button 
                  onClick={() => setActiveSidebarTab('build')}
                  className={`p-1.5 rounded-md transition-all ${activeSidebarTab === 'build' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                  title="Layout Blocks"
                >
                   <LayoutPanelLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveSidebarTab('layers')}
                  className={`p-1.5 rounded-md transition-all ${activeSidebarTab === 'layers' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                  title="Document Structure"
                >
                   <Layers className="w-4 h-4" />
                </button>
              </div>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
          {activeSidebarTab === 'build' ? (
            <div className="space-y-8 text-left">
              {/* Templates Section */}
              <div className="space-y-4">
                 <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] px-2 flex items-center gap-2">
                   <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                   Quick Templates
                 </h3>
                 <div className="grid grid-cols-1 gap-2">
                   <button onClick={() => loadTemplate('portfolio')} className="flex items-center justify-between bg-indigo-900/10 border border-indigo-500/20 hover:border-indigo-400 p-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Portfolio</p>
                          <p className="text-[10px] text-gray-400">Personal showcase</p>
                        </div>
                      </div>
                   </button>
                   <button onClick={() => loadTemplate('business')} className="flex items-center justify-between bg-emerald-900/10 border border-emerald-500/20 hover:border-emerald-400 p-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Business</p>
                          <p className="text-[10px] text-gray-400">Landing page</p>
                        </div>
                      </div>
                   </button>
                   <button onClick={() => loadTemplate('blog')} className="flex items-center justify-between bg-rose-900/10 border border-rose-500/20 hover:border-rose-400 p-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                          <AlignLeft className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Tech Blog</p>
                          <p className="text-[10px] text-gray-400">Content layout</p>
                        </div>
                      </div>
                   </button>
                 </div>
              </div>

              {/* Component Categories */}
              <div className="space-y-6">
                {COMPONENT_CATEGORIES.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 border-b border-gray-700/50 pb-2">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map(({ type, label, icon: Icon, description }) => (
                        <div
                          key={type}
                          draggable
                          onDragStart={(e) => handleDragStart(e, type)}
                          className="bg-[#273549] border border-gray-700 hover:border-blue-500 hover:bg-[#374964] p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-300 shadow-sm hover:shadow-blue-900/40 hover:scale-[1.02] group flex flex-col gap-1.5"
                        >
                          <div className="flex items-center gap-3 pointer-events-none">
                            <div className="p-1.5 bg-gray-800 rounded group-hover:bg-blue-500/20 group-hover:text-blue-400 text-gray-400 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">{label}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 group-hover:text-gray-300 ml-9 transition-colors pointer-events-none leading-tight">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="flex items-center justify-between px-2 mb-2">
                 <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] flex items-center gap-2">
                   <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                   Structure Tree
                 </h3>
                 <span className="text-[10px] text-gray-600 font-mono bg-gray-900 px-1 rounded">ROOT</span>
               </div>
               
               {elements.length === 0 ? (
                 <div className="py-12 px-4 text-center border border-dashed border-gray-700/50 rounded-xl">
                    <p className="text-gray-500 text-xs italic">No components added yet.</p>
                 </div>
               ) : (
                 <div className="space-y-1">
                   {elements.map(el => (
                     <LayerItem key={el.id} el={el} />
                   ))}
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Center Canvas (60%) */}
      <div className="w-3/5 bg-[#f9fafb] flex flex-col p-8 transition-colors relative focus:outline-none">
        <div className="mb-6 flex justify-between items-center px-2">
          <h2 className="text-2xl font-semibold text-gray-800">Canvas</h2>
          
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button 
              onPointerDown={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to clear your entire project? This action is permanent.')) {
                  setElements([]);
                  setSelectedId(null);
                  localStorage.setItem('antigravity_builder_project_v1', '[]');
                }
              }}
              className="p-1.5 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-red-200 shadow-sm relative z-50 cursor-pointer active:scale-95 active:bg-red-100"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4 pointer-events-none" />
            </button>
            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
            <button 
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'desktop' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'tablet' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'mobile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
              {elements.length} components
            </span>
            <button 
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
            >
              <Code className="w-4 h-4" />
              Export Code
            </button>
            <button 
              onClick={handleDeploy}
              disabled={isDeploying || elements.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm active:scale-95 ${
                isDeploying || elements.length === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              {isDeploying ? deployStep : 'Deploy Website'}
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar flex justify-center pb-12 w-full">
          <div 
            className={`transition-all duration-300 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col relative bg-white shadow-sm hover:border-blue-400 min-h-full ${
              deviceView === 'mobile' ? 'w-[375px]' : deviceView === 'tablet' ? 'w-[768px]' : 'w-full'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
          >
          {elements.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                <Square className="w-8 h-8 text-gray-300" />
              </div>
              <span className="text-xl font-medium text-gray-500">Drag components here</span>
              <p className="text-sm mt-2 font-normal max-w-xs text-center">Select an item from the left panel and drop it onto this canvas</p>
            </div>
          ) : (
            <div className="p-8 space-y-6 min-h-[100%] pb-64">
              {elements.map((el) => (
                <RenderElement key={el.id} el={el} />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Right Panel (20%) */}
      <div className="w-1/5 bg-[#1f2937] text-white flex flex-col shadow-2xl z-20 border-l border-gray-800">
        <div className="pt-8 pb-4 px-6 sticky top-0 bg-[#1f2937] z-10 border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wide text-gray-100 flex items-center gap-2">
            <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
            Properties
          </h2>
        </div>
        <div className="w-full px-5 flex flex-col flex-1 overflow-y-auto custom-scrollbar pt-6 pb-6">
          {selectedElement ? (
            <div className="w-full text-left bg-[#273549] p-5 rounded-xl border border-gray-700 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Editing</p>
                  <p className="font-bold text-lg text-white capitalize flex items-center gap-2">
                    {selectedElement.type.replace('-', ' ')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                 
                 <div className="flex items-center gap-2 mb-4 p-2 bg-gray-900/50 rounded-lg border border-gray-700">
                   <div className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}>
                     <Monitor className="w-3 h-3" />
                   </div>
                   <div className={`p-1 rounded ${deviceView === 'tablet' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}>
                     <Tablet className="w-3 h-3" />
                   </div>
                   <div className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}>
                     <Smartphone className="w-3 h-3" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-gray-400">
                     Editing {deviceView} Styles
                   </span>
                 </div>

                 {['text', 'heading', 'section', 'container', 'grid-2', 'grid-3', 'flex-row', 'navbar', 'footer', 'card', 'hero', 'button', 'submit', 'checkbox', 'radio', 'input', 'textarea'].includes(selectedElement.type) && (
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content / Label</label>
                     <textarea 
                       value={typeof selectedElement.content === 'string' ? selectedElement.content : ''}
                       onChange={(e) => updateElement(selectedElement.id, 'content', e.target.value)}
                       className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[60px] resize-y"
                     />
                   </div>
                 )}

                 {getCombinedStyles(selectedElement).fontSize !== undefined && (
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Font Size</label>
                     <input 
                       type="text" 
                       value={getCombinedStyles(selectedElement).fontSize || ''}
                       onChange={(e) => updateElement(selectedElement.id, 'fontSize', e.target.value, true)}
                       className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                     />
                   </div>
                 )}
                 
                 {getCombinedStyles(selectedElement).color !== undefined && (
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Text Color</label>
                     <div className="flex items-center gap-2">
                       <input 
                         type="color" 
                         value={getCombinedStyles(selectedElement).color || '#000000'}
                         onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                         className="h-9 w-12 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                       />
                       <input 
                         type="text" 
                         value={getCombinedStyles(selectedElement).color || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                         className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                       />
                     </div>
                   </div>
                 )}
                 
                 {getCombinedStyles(selectedElement).backgroundColor !== undefined && (
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Background Color</label>
                     <div className="flex items-center gap-2">
                       <input 
                         type="color" 
                         value={getCombinedStyles(selectedElement).backgroundColor || '#ffffff'}
                         onChange={(e) => updateElement(selectedElement.id, 'backgroundColor', e.target.value, true)}
                         className="h-9 w-12 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                       />
                       <input 
                         type="text" 
                         value={getCombinedStyles(selectedElement).backgroundColor || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'backgroundColor', e.target.value, true)}
                         className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                       />
                     </div>
                   </div>
                 )}

                 {['section', 'container', 'grid-2', 'grid-3', 'flex-row'].includes(selectedElement.type) && (
                   <>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Padding</label>
                       <input 
                         type="text" 
                         value={getCombinedStyles(selectedElement).padding || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'padding', e.target.value, true)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                         placeholder="e.g. 20px"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Margin</label>
                       <input 
                         type="text" 
                         value={getCombinedStyles(selectedElement).margin || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'margin', e.target.value, true)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                         placeholder="e.g. 0 auto"
                       />
                     </div>
                   </>
                 )}

                 {selectedElement.type === 'image' && (
                   <>
                     <div className="space-y-2 mb-4">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Upload Image from Computer</label>
                       <input 
                         type="file" 
                         accept="image/*"
                         onChange={(e) => {
                           const file = e.target.files[0];
                           if (file) {
                             const reader = new FileReader();
                             reader.onloadend = () => {
                               updateElement(selectedElement.id, 'content', reader.result);
                             };
                             reader.readAsDataURL(file);
                           }
                         }}
                         className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer transition-colors outline-none"
                       />
                     </div>
                     
                     <div className="relative flex items-center py-2 mb-2">
                       <div className="flex-grow border-t border-gray-700"></div>
                       <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">Or Paste URL</span>
                       <div className="flex-grow border-t border-gray-700"></div>
                     </div>

                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Image URL</label>
                       <textarea 
                         value={selectedElement.content}
                         onChange={(e) => updateElement(selectedElement.id, 'content', e.target.value)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[100px] resize-y break-all"
                       />
                     </div>
                   </>
                 )}

                 <div className="pt-4 border-t border-gray-700 mt-6 space-y-3">
                   <p className="text-[10px] text-gray-500 font-mono bg-gray-900 p-2 rounded truncate" title={selectedElement.id}>ID: {selectedElement.id}</p>
                   
                   <div className="grid grid-cols-2 gap-2">
                     <button 
                       onClick={handleMoveUp}
                       className="flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-600"
                     >
                       <ArrowUp className="w-3.5 h-3.5" /> Move Up
                     </button>
                     <button 
                       onClick={handleMoveDown}
                       className="flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-600"
                     >
                       <ArrowDown className="w-3.5 h-3.5" /> Move Down
                     </button>
                     <button 
                       onClick={handleDuplicate}
                       className="flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-600 hover:border-blue-500/50"
                     >
                       <Files className="w-3.5 h-3.5" /> Duplicate
                     </button>
                     <button 
                       onClick={() => handleRemove(selectedId)}
                       className="flex items-center justify-center gap-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 py-2 rounded-lg text-xs font-medium transition-colors"
                     >
                       <Trash2 className="w-3.5 h-3.5" /> Delete
                     </button>
                   </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <Square className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-gray-300 font-medium text-lg">No selection</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-[180px]">Select a component on the canvas to view its properties.</p>
            </div>
          )}
        </div>
      </div>

      {/* Deploy Success Modal */}
      {deployedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md flex flex-col overflow-hidden shadow-2xl ring-1 ring-gray-900/10 p-8 text-center">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Globe className="w-8 h-8 text-green-600" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Deployment Successful!</h2>
             <p className="text-sm text-gray-500 mb-6">Your website has been successfully generated and published to our mock servers.</p>
             
             <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between mb-8">
                <span className="text-sm font-medium text-blue-600 truncate mr-3">{deployedUrl}</span>
                <button 
                   onClick={() => navigator.clipboard.writeText(deployedUrl)}
                   className="p-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors flex-shrink-0"
                   title="Copy URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
             </div>
             
             <div className="flex gap-3">
               <button 
                 onClick={() => setDeployedUrl(null)} 
                 className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
               >
                 Close
               </button>
               <a 
                 href={deployedUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex-1 flex justify-center items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                 onClick={(e) => { e.preventDefault(); alert('This is a simulated deployment URL for demonstration purposes. The site layout is fully prepared for an API upload.'); }}
               >
                 Open Site
               </a>
             </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
               <div>
                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <Code className="w-5 h-5 text-indigo-600" />
                   Export Your Build
                 </h2>
                 <p className="text-sm text-gray-500 mt-1">Review the generated code mapping your active layout components.</p>
               </div>
               <button onClick={() => setExportModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
               <div className="w-48 bg-gray-50 border-r border-gray-100 p-4 space-y-2 flex flex-col">
                  {['html', 'css', 'js'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors ${
                        activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  
                  <div className="flex-1" />
                  <button 
                    onClick={handleDownloadZIP}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
                  >
                     <Download className="w-4 h-4" />
                     Download ZIP
                  </button>
               </div>
               <div className="flex-1 bg-[#1e1e1e] p-6 overflow-auto relative group text-left">
                  <button 
                     onClick={() => navigator.clipboard.writeText(
                       activeTab === 'html' ? generateHTML() : activeTab === 'css' ? generateCSS() : generateJS()
                     )}
                     className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                     title="Copy to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                    <pre className="text-gray-300 font-mono text-sm">
                    {activeTab === 'html' && generateHTML()}
                    {activeTab === 'css' && generateCSS()}
                    {activeTab === 'js' && generateJS()}
                  </pre>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
