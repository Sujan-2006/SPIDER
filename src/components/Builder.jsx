import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// Core dependencies Only
import { ArrowLeft, Monitor, Tablet, Smartphone, Download, UploadCloud, Loader2, Plus, Code2 } from 'lucide-react';
import { loadBlocks } from '../grapes/blocks';
import { TEMPLATES } from '../grapes/templates';
import { exportZip } from '../utils/exportZip';
import { deploySite } from '../utils/deployNetlify';

const Builder = ({ templateId }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100%',
      width: 'auto',
      storageManager: false, // disable for stability
      blockManager: { appendTo: '#blocks-panel' },
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '100%' },
          { name: 'Tablet',  width: '768px' },
          { name: 'Mobile',  width: '375px' },
        ]
      }
    });

    loadBlocks(e);
    setEditor(e);

    const loadTpl = () => {
       if (templateId && TEMPLATES[templateId]) {
         e.setComponents(TEMPLATES[templateId].html);
         e.setStyle(TEMPLATES[templateId].css);
       }
    };
    
    e.on('load', loadTpl);
    // Fallback if already loaded
    setTimeout(loadTpl, 500);

    return () => e.destroy();
  }, [templateId]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F7] overflow-hidden">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href = '/dashboard'} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-xl">SPIDER STUDIO</span>
        </div>
        <div className="flex gap-2">
           <button onClick={() => exportZip(editor.getHtml(), editor.getCss())} className="px-4 py-2 bg-gray-100 rounded-lg">Export</button>
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Publish</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r p-4 overflow-y-auto" id="blocks-panel"></div>
        <div className="flex-1 bg-gray-100 p-4">
           <div ref={editorRef} className="h-full w-full bg-white shadow-lg rounded-lg overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
