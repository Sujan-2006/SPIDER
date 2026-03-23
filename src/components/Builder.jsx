import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// Plugins
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import grapesjsPluginForms from 'grapesjs-plugin-forms';
import grapesjsTabs from 'grapesjs-tabs';
import grapesjsCountdown from 'grapesjs-component-countdown';
import grapesjsTooltip from 'grapesjs-tooltip';

import { loadBlocks } from '../grapes/blocks';
import { getStyleManagerConfig } from '../grapes/styleManager';
import '../grapes/styles.css';

import { Download, UploadCloud, Save, Loader2, Code2, Monitor, Tablet, Smartphone, FileBox, LayoutList, Layers, Paintbrush, SlidersHorizontal, Undo, Redo, Plus } from 'lucide-react';
import { exportZip } from '../utils/exportZip';
import { deploySite } from '../utils/deployNetlify';
import CodeModal from './CodeModal';
import DeployModal from './DeployModal';

const Builder = ({ saveProject, loadProject }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState('');
  
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  
  const [activeDevice, setActiveDevice] = useState('Desktop');
  const [leftTab, setLeftTab] = useState('blocks'); // 'blocks', 'pages', 'layers'
  const [rightTab, setRightTab] = useState('styles'); // 'styles', 'traits'

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100%',
      width: 'auto',
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3,
        options: { local: { key: 'spider_gjs_project' } }
      },
      plugins: [
        grapesjsBlocksBasic,
        grapesjsPluginForms,
        grapesjsTabs,
        grapesjsCountdown,
        grapesjsTooltip
      ],
      pluginsOpts: {
        'grapesjs-blocks-basic': { flexGrid: true },
        'grapesjs-plugin-forms': {},
        'grapesjs-tabs': {},
        'grapesjs-component-countdown': {},
        'grapesjs-tooltip': {}
      },
      blockManager: { appendTo: '#blocks-panel' },
      styleManager: getStyleManagerConfig(),
      traitManager: { appendTo: '#traits-panel' },
      layerManager: { appendTo: '#layers-panel' },
      selectorManager: {
        appendTo: '#states-panel',
        states: [
          { name: 'hover', label: 'Hover' },
          { name: 'active', label: 'Click (Active)' },
          { name: 'focus', label: 'Focus' },
          { name: 'nth-of-type(2n)', label: 'Even/Odd' }
        ]
      },
      pageManager: { pages: [{ id: 'page-1', name: 'Home' }] },
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile', width: '375px', widthMedia: '480px' },
        ]
      },
      assetManager: {
        // Simple asset manager implementation to handle images visually
        upload: false, // In a real app we upload to a server
        assets: [
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
          'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&q=80',
          'https://images.unsplash.com/photo-1545241047-6083a36db15e?w=800&q=80'
        ]
      },
      canvas: {
        styles: ['https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap']
      }
    });

    // We manually handle Left Tabs by toggling CSS display of elements,
    // so GrapesJS appends natively and we just show/hide containers
    e.Commands.add('core:undo', { run: (ed) => ed.UndoManager.undo() });
    e.Commands.add('core:redo', { run: (ed) => ed.UndoManager.redo() });

    // Custom Symbol command wrapper (Mock)
    e.Commands.add('create-symbol', {
      run(editor) {
        const selected = editor.getSelected();
        if(selected) {
           editor.BlockManager.add('symbol-' + Date.now(), {
             label: 'Symbol',
             category: 'User Symbols',
             content: selected.toHTML()
           });
           alert('Symbol saved directly to Blocks > User Symbols!');
        }
      }
    });

    loadBlocks(e);
    setEditor(e);
    
    // Page Manager initial render
    renderPagesList(e);
    e.on('page', () => renderPagesList(e));

    if (loadProject) loadProject(e);
    return () => e.destroy();
  }, []);

  const renderPagesList = (e) => {
    const pagesContainer = document.getElementById('pages-list');
    if(!pagesContainer) return;
    const pages = e.Pages.getAll();
    pagesContainer.innerHTML = '';
    pages.forEach(page => {
      const div = document.createElement('div');
      div.className = `flex items-center justify-between p-3 mb-2 rounded-xl border border-gray-100 cursor-pointer transition-colors ${e.Pages.getSelected().id === page.id ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-gray-50'}`;
      div.innerHTML = `<span class="text-sm font-medium text-gray-700">${page.get('name')}</span>`;
      div.onclick = () => e.Pages.select(page.id);
      pagesContainer.appendChild(div);
    });
  };

  const handleAddPage = () => {
    if(!editor) return;
    const name = prompt('Enter page name:');
    if (name) editor.Pages.add({ name });
  };

  const handleExport = () => {
    if (!editor) return;
    exportZip(editor.getHtml(), editor.getCss());
  };

  const handleDeploy = async () => {
    if (!editor) return;
    setIsDeploying(true);
    setDeployedUrl('');
    try {
      const url = await deploySite(editor.getHtml(), editor.getCss());
      setDeployedUrl(url);
      setDeployModalOpen(true);
    } catch (error) {
      console.error("Deploy failed", error);
    } finally {
      setIsDeploying(false);
    }
  };

  const setDevice = (deviceName) => {
    editor.setDevice(deviceName);
    setActiveDevice(deviceName);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F7] font-sans overflow-hidden">
      {/* Top Navbar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-3 w-64 lg:w-80">
           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-600"></div>
           <span className="font-bold text-lg tracking-tight text-[#111] font-serif">THE LOOM</span>
        </div>
        
        {/* Device Toggles & Undo / Redo */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
             <button onClick={() => editor.runCommand('core:undo')} className="p-1.5 rounded-md text-gray-500 hover:text-black transition-colors" title="Undo (Ctrl+Z)"><Undo className="w-4 h-4" /></button>
             <button onClick={() => editor.runCommand('core:redo')} className="p-1.5 rounded-md text-gray-500 hover:text-black transition-colors" title="Redo (Ctrl+Y)"><Redo className="w-4 h-4" /></button>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button onClick={() => setDevice('Desktop')} className={`p-1.5 rounded-md transition-all ${activeDevice === 'Desktop' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-800'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setDevice('Tablet')} className={`p-1.5 rounded-md transition-all ${activeDevice === 'Tablet' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-800'}`}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setDevice('Mobile')} className={`p-1.5 rounded-md transition-all ${activeDevice === 'Mobile' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-800'}`}><Smartphone className="w-4 h-4" /></button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3 w-64 lg:w-80 justify-end">
          <button onClick={() => editor.runCommand('create-symbol')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium">
            <Plus className="w-3.5 h-3.5" /> Save Symbol
          </button>
          <button onClick={handleExport} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors" title="Export ZIP">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={handleDeploy} disabled={isDeploying} className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#111] text-white hover:bg-[#9D50BB] transition-colors text-sm font-medium shadow-md shadow-gray-200">
            {isDeploying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
            {isDeploying ? 'Deploying...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (Blocks, Pages, Layers) */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-[5px_0_15px_rgba(0,0,0,0.02)] relative">
           
           {/* Tab Headers */}
           <div className="flex p-2 gap-1 border-b border-gray-100 bg-gray-50">
              <button onClick={() => setLeftTab('blocks')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${leftTab === 'blocks' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-400 hover:text-gray-600'}`}>
                <FileBox className="w-3.5 h-3.5" /> Blocks
              </button>
              <button onClick={() => setLeftTab('pages')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${leftTab === 'pages' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-400 hover:text-gray-600'}`}>
                <LayoutList className="w-3.5 h-3.5" /> Pages
              </button>
               <button onClick={() => setLeftTab('layers')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${leftTab === 'layers' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-400 hover:text-gray-600'}`}>
                <Layers className="w-3.5 h-3.5" /> Layers
              </button>
           </div>
           
           {/* Tab Contents */}
           <div className="flex-1 overflow-hidden relative">
              <div id="blocks-panel" className={`absolute inset-0 overflow-y-auto p-4 custom-scrollbar bg-[#FAF9F7] ${leftTab === 'blocks' ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}></div>
              
              <div className={`absolute inset-0 overflow-y-auto p-4 custom-scrollbar bg-[#FAF9F7] ${leftTab === 'pages' ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-serif font-bold text-gray-800">Your Pages</h3>
                   <button onClick={handleAddPage} className="p-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#9D50BB] hover:text-white transition-colors"><Plus className="w-4 h-4"/></button>
                 </div>
                 <div id="pages-list" className="flex flex-col"></div>
              </div>

              <div id="layers-panel" className={`absolute inset-0 overflow-y-auto p-1 custom-scrollbar bg-[#FAF9F7] ${leftTab === 'layers' ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}></div>
           </div>
        </div>

        {/* CENTER CANVAS */}
        <div className="flex-1 relative bg-[#FAF9F7] shadow-inner p-4 overflow-hidden">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm relative bg-white">
            <div ref={editorRef} id="gjs">
              <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                Initializing Canvas...
              </div>
            </div>
            
            <button 
              onClick={() => {
                if(!editor) return;
                setHtmlCode(editor.getHtml());
                setCssCode(editor.getCss());
                setCodeModalOpen(true);
              }}
              className="absolute bottom-6 left-6 p-4 rounded-full bg-[#111] text-white shadow-2xl hover:bg-[#9D50BB] hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center"
              title="View Source Code"
            >
              <Code2 className="w-6 h-6 group-hover:animate-pulse" />
            </button>
          </div>
        </div>
        
        {/* RIGHT SIDEBAR (Styles & Traits) */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 z-10 shadow-[-5px_0_15px_rgba(0,0,0,0.02)]">
           <div className="flex p-2 gap-1 border-b border-gray-100 bg-gray-50">
              <button onClick={() => setRightTab('styles')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${rightTab === 'styles' ? 'bg-white text-[#9D50BB] shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
                <Paintbrush className="w-3.5 h-3.5" /> Style
              </button>
              <button onClick={() => setRightTab('traits')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${rightTab === 'traits' ? 'bg-white text-[#9D50BB] shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" /> Settings
              </button>
           </div>
           
           <div className="flex-1 overflow-hidden relative">
             <div className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${rightTab === 'styles' ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <div id="states-panel" className="p-3 border-b border-gray-100 bg-gray-50 shrink-0"></div>
                <div id="style-view" className="flex-1 overflow-y-auto custom-scrollbar bg-white"></div>
             </div>
             
             <div className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${rightTab === 'traits' ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
                   <h3 className="font-serif font-bold text-gray-800">Component Traits</h3>
                   <p className="text-xs text-gray-500 mt-1">Configure attributes like href, src, type, and options.</p>
                </div>
                <div id="traits-panel" className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white"></div>
             </div>
           </div>
        </div>
      </div>

      <CodeModal isOpen={codeModalOpen} onClose={() => setCodeModalOpen(false)} html={htmlCode} css={cssCode} />
      <DeployModal isOpen={deployModalOpen} onClose={() => setDeployModalOpen(false)} url={deployedUrl} />
    </div>
  );
};

export default Builder;
