import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../grapes/styles.css';

// Core dependencies Only
import { ArrowLeft, Monitor, Tablet, Smartphone, Download, UploadCloud, Loader2, Code2, Undo2, Redo2 } from 'lucide-react';
import { loadBlocks } from '../grapes/blocks';
import { TEMPLATES } from '../grapes/templates';
import { exportZip } from '../utils/exportZip';
import { getStyleManagerConfig } from '../grapes/styleManager';
import { registerComponentTypes } from '../grapes/componentTypes';

// Custom Components
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CodeModal from './CodeModal';

const Builder = ({ templateId }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeDevice, setActiveDevice] = useState('Desktop');

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100%',
      width: '100%',
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3,
        options: {
          local: { key: 'spider-editor-v1' }
        }
      },
      panels: { defaults: [] },
      layerManager: { appendTo: '#layers-container' },
      styleManager: getStyleManagerConfig(),
      canvasCss: `
        body { 
          background: #ffffff; 
          padding: 0; 
          margin: 0; 
          min-height: 120vh; 
          padding-bottom: 60vh; 
        }
        .gjs-hovered { outline: 2px solid #9D50BB !important; outline-offset: -2px; }
        .gjs-selected { outline: 3px solid #9D50BB !important; outline-offset: -2px; }
      `,
      canvas: {
        dragMode: 'translate',
        allowSelfDrop: true,
      },
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' }, // Let it be fluid within the React-controlled wrapper
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile', width: '375px', widthMedia: '480px' },
        ]
      },
      assetManager: {
        appendTo: '#assets-container',
        assets: [
           'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
           'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
           'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        ],
        upload: 0,
      },
    });
    
    registerComponentTypes(e);
    loadBlocks(e);
    setEditor(e);

    const loadTpl = () => {
      // Only load template if there's no saved data
      const savedData = localStorage.getItem('spider-editor-v1');
      if (!savedData && templateId && TEMPLATES[templateId]) {
        e.setComponents(TEMPLATES[templateId].html);
        e.setStyle(TEMPLATES[templateId].css);
      }
    };
    
    e.on('load', loadTpl);
    setTimeout(loadTpl, 500);

    e.on('load', () => {
      const sm = e.StyleManager;
      const stylesContainer = document.getElementById('styles-container');
      if (stylesContainer) {
        stylesContainer.appendChild(sm.render());
      }
      
      const tm = e.TraitManager;
      const traitsContainer = document.getElementById('traits-container');
      if (traitsContainer) {
        traitsContainer.appendChild(tm.render());
      }
    });

    return () => e.destroy();
  }, [templateId]);

  const handleDeviceChange = (device) => {
    if (!editor) return;
    editor.setDevice(device);
    setActiveDevice(device);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F7] overflow-hidden">
      {/* TOOLBAR */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href = '/dashboard'} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="font-bold text-lg font-playfair tracking-wide text-gray-800">SPIDER STUDIO</span>
          
          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          {/* Undo/Redo */}
          <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
            <button 
              onClick={() => editor?.UndoManager.undo()} 
              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <button 
              onClick={() => editor?.UndoManager.redo()} 
              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={16} />
            </button>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button 
            onClick={() => handleDeviceChange('Desktop')}
            className={`p-1.5 rounded transition-colors ${activeDevice === 'Desktop' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-700'}`}
            title="Desktop"
          >
            <Monitor size={16} />
          </button>
          <button 
            onClick={() => handleDeviceChange('Tablet')}
            className={`p-1.5 rounded transition-colors ${activeDevice === 'Tablet' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-700'}`}
            title="Tablet"
          >
            <Tablet size={16} />
          </button>
          <button 
            onClick={() => handleDeviceChange('Mobile')}
            className={`p-1.5 rounded transition-colors ${activeDevice === 'Mobile' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-700'}`}
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
           <button onClick={() => exportZip(editor.getHtml(), editor.getCss())} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
             <Download size={16} /> Export
           </button>
           <button className="px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-opacity-90 rounded-lg transition-all shadow-sm shadow-primary/20 flex items-center gap-2">
             <UploadCloud size={16} /> Publish
           </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        <LeftSidebar editor={editor} />
        
        <div
          className="flex-1 overflow-auto custom-scrollbar flex justify-center p-6 md:p-12 lg:p-20 bg-[#f8f9fa]"
        >
          {/* GrapesJS fills this inner div — React handles the width and centering */}
          <div
            ref={editorRef}
            className="bg-white transition-all duration-300 ease-in-out mb-20"
            style={{ 
              width: activeDevice === 'Desktop' ? '1240px' : activeDevice === 'Tablet' ? '768px' : '375px',
              maxWidth: '100%',
              boxShadow: '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
              borderRadius: activeDevice === 'Desktop' ? '2px' : '12px',
              minHeight: '120vh'
            }}
          ></div>

          {/* Code View FAB */}
           <button 
             className="absolute bottom-6 left-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors z-20 group"
             title="View Source Code"
             onClick={() => setShowCodeModal(true)}
           >
              <Code2 size={20} className="group-hover:scale-110 transition-transform" />
           </button>
        </div>

        <RightSidebar editor={editor} />
      </div>

      {showCodeModal && editor && (
        <CodeModal 
          isOpen={showCodeModal} 
          onClose={() => setShowCodeModal(false)} 
          html={editor.getHtml()}
          css={editor.getCss()}
        />
      )}
    </div>
  );
};

export default Builder;
