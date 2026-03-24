import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../grapes/styles.css';

// Core dependencies Only
import { ArrowLeft, Monitor, Tablet, Smartphone, Download, UploadCloud, Loader2, Code2, Undo2, Redo2, Save, Eye, EyeOff, Globe, ArrowUpRight, Edit2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { loadBlocks } from '../grapes/blocks';
import { TEMPLATES } from '../grapes/templates';
import { exportZip } from '../utils/exportZip';
import { deployToNetlify } from '../utils/deployToNetlify';
import { getStyleManagerConfig } from '../grapes/styleManager';
import { registerComponentTypes } from '../grapes/componentTypes';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

// GrapesJS Plugins
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import gjsCountdown from 'grapesjs-component-countdown';
import gjsTabs from 'grapesjs-tabs';
import gjsTooltip from 'grapesjs-tooltip';

// Custom Components
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CodeModal from './CodeModal';

const Builder = ({ projectId, templateId }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeDevice, setActiveDevice] = useState('Desktop');
  const [isPreview, setIsPreview] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [currentProjectId, setCurrentProjectId] = useState(projectId || null);
  const navigate = useNavigate();

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
        autoload: false,
        stepsBeforeSave: 3,
        options: {
          local: { key: `spider-${currentProjectId || 'draft'}` }
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
        * { box-sizing: border-box; }
      `,
      plugins: [gjsBlocksBasic, gjsForms, gjsCountdown, gjsTabs, gjsTooltip],
      pluginsOpts: {
        [gjsBlocksBasic]: { flexGrid: true },
        [gjsForms]: {},
        [gjsCountdown]: {},
        [gjsTabs]: {},
        [gjsTooltip]: {},
      },
      canvas: {
        dragMode: 'translate',
        allowSelfDrop: true,
      },
      traitManager: { appendTo: '#traits-container' },
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

    const loadTpl = async () => {
      // Security Check
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/signup';
        return;
      }

      // First try to load from Supabase if we have a real projectId
      if (currentProjectId) {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('data, name')
            .eq('id', currentProjectId)
            .single();
            
          if (data) {
            if (data.name) setProjectName(data.name);
            if (data.data) {
              e.loadProjectData(data.data);
              return;
            }
          }
        } catch (err) {
          console.log('No remote project found or Supabase not configured yet.');
        }
      } else if (templateId && TEMPLATES[templateId]) {
        // If we are starting fresh (no currentProjectId) load the template!
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

  const togglePreview = () => {
    if (!editor) return;
    if (isPreview) {
      editor.stopCommand('core:preview');
      setIsPreview(false);
    } else {
      editor.runCommand('core:preview');
      setIsPreview(true);
    }
  };

  const handleDeployToNetlify = async () => {
    if (!editor || !currentProjectId) {
      alert("Please save your project to Supabase first clicking 'Save' before deploying!");
      return;
    }
    
    let token = localStorage.getItem('netlify_token');
    if (!token) {
      token = prompt("Please enter your Netlify Personal Access Token (from Netlify Dashboard -> User settings -> Applications):");
      if (!token) return;
      localStorage.setItem('netlify_token', token);
    }

    try {
      setIsDeploying(true);
      const html = editor.getHtml();
      const css = editor.getCss();
      
      const existingSiteId = localStorage.getItem(`netlify_site_${currentProjectId}`);
      
      const result = await deployToNetlify(html, css, token, existingSiteId);
      
      // Store siteId to update next time instead of creating new!
      localStorage.setItem(`netlify_site_${currentProjectId}`, result.siteId);
      
      // Netlify requires HTTPs explicitly in some URL returns
      const finalUrl = result.url.startsWith('http') ? result.url : `https://${result.url}`;
      
      setDeployedUrl(finalUrl);
      
    } catch (err) {
      console.error(err);
      alert('Deployment failed: ' + err.message);
      if (err.message.toLowerCase().includes('unauthorized')) {
        localStorage.removeItem('netlify_token');
      }
    } finally {
      setIsDeploying(false);
    }
  };

  const handleSaveToSupabase = async () => {
    if (!editor) return;
    try {
      setIsDeploying(true);
      const projectData = editor.getProjectData();
      
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) throw new Error("You must be logged in to save.");

      const isNew = !currentProjectId;
      const idToSave = currentProjectId || uuidv4();
      
      const { error } = await supabase
        .from('projects')
        .upsert({ 
          id: idToSave,
          user_id: userId,
          name: projectName,
          data: projectData,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      if (isNew) {
        setCurrentProjectId(idToSave);
        alert('New Project successfully saved to Supabase!');
        navigate(`/builder/${idToSave}`);
      } else {
        alert('Project successfully updated in Supabase!');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert(`Database rejected the save:\n\n${err.message}\n\nMake sure you added the 'name' and 'user_id' columns in your Supabase SQL Editor!`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F7] overflow-hidden">
      {/* TOOLBAR */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href = '/dashboard'} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Back to Dashboard">
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-2 group relative">
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="font-bold text-lg font-playfair tracking-wide text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none w-40 sm:w-56 transition-colors px-1"
              placeholder="Project Name"
            />
            <Edit2 size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-6 pointer-events-none" />
          </div>
          
          <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>

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
            className={`p-1.5 rounded-md transition-all ${activeDevice === 'Mobile' ? 'bg-white shadow-sm text-primary ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-700 hover:bg-white/50'}`}
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={() => setShowCodeModal(true)}
             className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 border border-gray-100 hidden sm:flex"
             title="View Source Code"
           >
             <Code2 size={16} /> Code
           </button>
           
           <button 
             onClick={togglePreview}
             className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 border ${isPreview ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'text-gray-600 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
             title={isPreview ? "Exit Fullscreen Preview" : "Enter Fullscreen Preview"}
           >
             {isPreview ? <EyeOff size={16} /> : <Eye size={16} />} 
             <span className="hidden sm:inline">{isPreview ? 'Exit Preview' : 'Preview'}</span>
           </button>

           <div className="hidden lg:block h-6 w-px bg-gray-200 mx-1"></div>

           <button onClick={() => exportZip(editor.getHtml(), editor.getCss())} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors items-center gap-2 hidden lg:flex border border-gray-100">
             <Download size={16} /> Export
           </button>
           <button 
             onClick={handleDeployToNetlify}
             disabled={isDeploying}
             className="px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-emerald-500/10 disabled:opacity-70 disabled:cursor-not-allowed"
             title="Deploy to Netlify instantly"
           >
             {isDeploying ? <Loader2 size={16} className="animate-spin text-emerald-600" /> : <UploadCloud size={16} className="text-emerald-600" />} 
             Deploy
           </button>
           <button 
             onClick={handleSaveToSupabase}
             disabled={isDeploying}
             className="px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-opacity-90 rounded-lg transition-all shadow-sm shadow-primary/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isDeploying ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
             {isDeploying ? 'Saving...' : 'Save'}
           </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        {!isPreview && <LeftSidebar editor={editor} />}
        
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className={`flex-1 overflow-auto custom-scrollbar transition-all duration-300 ${isPreview ? 'p-0 bg-white' : 'p-6 md:p-12 lg:p-20 bg-[#f8f9fa]'}`}>
          {/* GrapesJS fills this inner div — React handles the width and centering */}
          <div
            ref={editorRef}
            className={`transition-all duration-300 ease-in-out relative z-0 mx-auto ${isPreview ? 'w-full h-full is-preview' : 'bg-white shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),_0_18px_36px_-18px_rgba(0,0,0,0.3)] rounded-xl'}`}
            style={{ 
              width: '100%',
              minHeight: isPreview ? '100vh' : '120vh'
            }}
          ></div>
        </div>

        </div>

        {!isPreview && <RightSidebar editor={editor} />}
      </div>

      {showCodeModal && editor && (
        <CodeModal 
          isOpen={showCodeModal} 
          onClose={() => setShowCodeModal(false)} 
          html={editor.getHtml()}
          css={editor.getCss()}
        />
      )}

      {/* Deployment Success Modal */}
      {deployedUrl && (
        <div className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 transition-all"
             onClick={() => setDeployedUrl(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in duration-200"
               onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 ring-8 ring-emerald-50">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">It's Official!</h3>
            <p className="text-gray-500 mb-6 text-sm">Your website was successfully compiled and pushed live to the public internet.</p>
            
            <a href={deployedUrl} target="_blank" rel="noopener noreferrer" 
               className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
              Visit Live Website <ArrowUpRight size={18} />
            </a>
            
            <div className="mt-4 w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-500 font-mono break-all select-all hover:bg-gray-100 transition-colors cursor-text">
              {deployedUrl}
            </div>

            <button onClick={() => setDeployedUrl(null)} className="mt-5 text-sm text-gray-400 hover:text-gray-800 font-bold uppercase tracking-wider transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Builder;
