import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../grapes/styles.css';

// Icons
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, Download, UploadCloud, Loader2, 
  Code2, Undo2, Redo2, Save, Eye, EyeOff, Globe, ArrowUpRight, Edit2, 
  Sparkles, CheckCircle, History, ShieldCheck, AlertTriangle, Settings
} from 'lucide-react';

import { loadBlocks } from '../grapes/blocks';
import { TEMPLATES } from '../grapes/templates';
import { getStyleManagerConfig } from '../grapes/styleManager';
import { registerComponentTypes } from '../grapes/componentTypes';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

// Core Services
import { getProjectById, saveProject, createProjectVersion, getProjectVersions } from '../services/projectService';
import { deployToNetlifyAPI, downloadZipBundle, getNetlifyToken } from '../services/deployService';
import { generateAISection } from '../services/aiService';
import { runSEOAudit } from '../services/seoService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Custom UI Components
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CodeModal from './CodeModal';
import DeployModal from './DeployModal';
import SEOModal from './SEOModal';
import TranslateModal from './TranslateModal';

// GrapesJS Plugins
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import gjsCountdown from 'grapesjs-component-countdown';
import gjsTabs from 'grapesjs-tabs';
import gjsTooltip from 'grapesjs-tooltip';

const Builder = ({ projectId, templateId }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showTranslateModal, setShowTranslateModal] = useState(false);

  const [activeDevice, setActiveDevice] = useState('Desktop');
  const [isPreview, setIsPreview] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [deployStage, setDeployStage] = useState('idle');
  const [deployError, setDeployError] = useState('');
  const [user, setUser] = useState(null);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [currentProjectId, setCurrentProjectId] = useState(projectId || null);

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      if (isSupabaseConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      }
    };
    checkUser();
  }, []);

  const [brandConfig, setBrandConfig] = useState({
    primaryColor: '#9D50BB',
    secondaryColor: '#6E48AA',
    fontFamilyHeading: 'Playfair Display',
    fontFamilyBody: 'Inter',
  });

  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSectionType, setAiSectionType] = useState('hero');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // SEO & Version state
  const [seoResult, setSeoResult] = useState(null);
  const [versions, setVersions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100%',
      width: '100%',
      storageManager: { type: 'none' },
      panels: { defaults: [] },
      layerManager: { appendTo: '#layers-container' },
      styleManager: getStyleManagerConfig(),
      canvasCss: `
        body { 
          background: #ffffff; 
          padding: 0; 
          margin: 0; 
          min-height: 100vh; 
        }
        .gjs-hovered { outline: 2px solid #9D50BB !important; outline-offset: -2px; }
        .gjs-selected { outline: 3px solid #9D50BB !important; outline-offset: -2px; }
        
        /* Smart Drag Guidelines */
        .gjs-placeholder {
          background-color: #9D50BB !important;
          height: 4px !important;
          box-shadow: 0 0 4px rgba(157, 80, 187, 0.5) !important;
          border-radius: 2px !important;
          z-index: 9999 !important;
        }
        .gjs-placeholder-int {
          background-color: rgba(157, 80, 187, 0.05) !important;
          border: 2px dashed #9D50BB !important;
        }
        
        * { box-sizing: border-box; }
      `,
      richTextEditor: {
        actions: ['bold', 'italic', 'underline', 'strikethrough', 'link']
      },
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
          { name: 'Desktop', width: '' },
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

    const loadProject = async () => {
      if (currentProjectId) {
        const proj = await getProjectById(currentProjectId);
        if (proj) {
          setProjectName(proj.name);
          if (proj.data) {
            e.loadProjectData(proj.data);
            if (proj.data.seoData) setSeoData(proj.data.seoData);
          }
          return;
        }
      }

      if (templateId && TEMPLATES[templateId]) {
        e.setComponents(TEMPLATES[templateId].html);
        e.setStyle(TEMPLATES[templateId].css);
      }
    };

    e.on('load', loadProject);

    return () => e.destroy();
  }, [templateId]);

  useEffect(() => {
    if (!editor) return;
    const updatePages = () => {
      const allPages = editor.Pages.getAll();
      setPages(allPages.map(p => ({ id: p.getId(), name: p.getName() || p.getId() })));
      setCurrentPage(editor.Pages.getSelected()?.getId());
    };
    editor.on('page', updatePages);
    updatePages();
    return () => editor.off('page', updatePages);
  }, [editor]);

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

  const handleSaveProject = async (versionNote = null) => {
    if (!editor) return;
    setIsDeploying(true);
    try {
      const projectData = editor.getProjectData();
      projectData.seoData = seoData; // Embed custom SEO data
      
      const idToSave = currentProjectId || uuidv4();

      const saved = await saveProject({
        id: idToSave,
        name: projectName,
        data: projectData,
      });

      if (!currentProjectId) {
        setCurrentProjectId(idToSave);
        navigate(`/builder/${idToSave}`);
      }

      // Create snapshot version
      await createProjectVersion(idToSave, projectData, versionNote || `Save snapshot - ${new Date().toLocaleTimeString()}`);
      alert('Project saved successfully!');
    } catch (e) {
      console.error(e);
      alert('Save failed: ' + e.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleOpenDeployModal = () => {
    setDeployStage('idle');
    setDeployError('');
    setShowDeployModal(true);
  };

  const handleDeployNetlify = async (subdomain) => {
    if (!editor) return;

    setDeployError('');
    setDeployStage('bundling');

    // Bundling Step Animation delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const token = await getNetlifyToken(user);
      if (!token) {
        throw new Error('Netlify Access Token is missing. Please configure Netlify in Settings > Integrations.');
      }

      setDeployStage('uploading');
      const html = editor.getHtml();
      const css = editor.getCss();
      const currentPageId = editor.Pages.getSelected()?.getId();
      const pageSeo = seoData[currentPageId] || {};

      // Get existing siteId if previously deployed
      const existingSiteId = localStorage.getItem(`netlify_site_id_${currentProjectId}`);

      const result = await deployToNetlifyAPI({
        html,
        css,
        token,
        siteId: existingSiteId,
        subdomain: subdomain || null,
        projectId: currentProjectId,
        title: pageSeo.title || projectName,
        seoMetadata: pageSeo
      });

      setDeployStage('configuring');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDeployedUrl(result.url);
      localStorage.setItem(`netlify_site_${currentProjectId}`, result.url);
      localStorage.setItem(`netlify_site_id_${currentProjectId}`, result.siteId);
      setDeployStage('success');
    } catch (e) {
      console.error(e);
      setDeployError(e.message || 'Deployment failed.');
      setDeployStage('error');
    }
  };

  const handleDownloadZip = () => {
    if (!editor) return;
    const currentPageId = editor.Pages.getSelected()?.getId();
    const pageSeo = seoData[currentPageId] || {};
    downloadZipBundle(editor.getHtml(), editor.getCss(), projectName, pageSeo);
    setShowDeployModal(false);
  };

  const handleGenerateAI = async () => {
    if (!editor || !aiPrompt) return;
    setIsGeneratingAI(true);
    try {
      const generated = await generateAISection(aiPrompt, aiSectionType);
      editor.addComponents(generated.html);
      setAiPrompt('');
      setShowAIModal(false);
    } catch (e) {
      alert('AI Generation error: ' + e.message);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleRunSEOAudit = () => {
    if (!editor) return;
    const audit = runSEOAudit(editor.getHtml());
    setSeoResult(audit);
    setShowSEOModal(true);
  };

  const handleOpenVersions = async () => {
    if (!currentProjectId) {
      alert('Please save the project first to view version history.');
      return;
    }
    const vers = await getProjectVersions(currentProjectId);
    setVersions(vers);
    setShowVersionModal(true);
  };

  const handleRestoreVersion = (version) => {
    if (!editor || !version?.snapshot_data) return;
    if (window.confirm(`Rollback canvas to version: ${version.version_name}?`)) {
      editor.loadProjectData(version.snapshot_data);
      setShowVersionModal(false);
      alert('Version restored!');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F7] overflow-hidden font-sans">
      {/* TOOLBAR */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Back to Dashboard">
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-2 group relative">
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="font-bold text-lg text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none w-40 sm:w-48 transition-colors px-1"
              placeholder="Project Name"
            />
            <Edit2 size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-6 pointer-events-none" />
          </div>
          
          {editor && (
            <>
              <select
                value={currentPage || ''}
                onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') {
                    const newName = prompt('Enter new page name:', 'About Us');
                    if (newName) {
                      const newPage = editor.Pages.add({ name: newName });
                      editor.Pages.select(newPage);
                    }
                  } else {
                    editor.Pages.select(e.target.value);
                  }
                }}
                className="ml-2 text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 font-medium text-gray-700 outline-none focus:border-purple-500 hover:bg-gray-100 cursor-pointer"
              >
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    📄 {p.name === 'index' ? 'Home' : p.name}
                  </option>
                ))}
                <option value="ADD_NEW">✨ + Add New Page</option>
              </select>
              <button 
                onClick={() => setShowSEOModal(true)} 
                className="ml-1 p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                title="Page SEO Settings"
              >
                <Settings size={16} />
              </button>
            </>
          )}
          
          <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>

          {/* Undo/Redo */}
          <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
            <button onClick={() => editor?.UndoManager.undo()} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors" title="Undo (Ctrl+Z)">
              <Undo2 size={16} />
            </button>
            <button onClick={() => editor?.UndoManager.redo()} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors" title="Redo (Ctrl+Y)">
              <Redo2 size={16} />
            </button>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button onClick={() => handleDeviceChange('Desktop')} className={`p-1.5 rounded transition-colors ${activeDevice === 'Desktop' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-700'}`} title="Desktop">
            <Monitor size={16} />
          </button>
          <button onClick={() => handleDeviceChange('Tablet')} className={`p-1.5 rounded transition-colors ${activeDevice === 'Tablet' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-700'}`} title="Tablet">
            <Tablet size={16} />
          </button>
          <button onClick={() => handleDeviceChange('Mobile')} className={`p-1.5 rounded transition-colors ${activeDevice === 'Mobile' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-700'}`} title="Mobile">
            <Smartphone size={16} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
           <button onClick={() => setShowTranslateModal(true)} className="px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5 border border-indigo-200">
             <Globe size={16} /> <span className="hidden md:inline">Translate</span>
           </button>

           <button onClick={() => setShowAIModal(true)} className="px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1.5 border border-purple-200">
             <Sparkles size={16} /> <span className="hidden md:inline">AI Section</span>
           </button>

           <button onClick={handleRunSEOAudit} className="px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center gap-1.5 border border-teal-200">
             <ShieldCheck size={16} /> <span className="hidden md:inline">SEO Audit</span>
           </button>

           <button onClick={handleOpenVersions} className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-200 hidden lg:flex">
             <History size={16} /> History
           </button>

           <button onClick={togglePreview} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 border ${isPreview ? 'bg-purple-100 border-purple-300 text-purple-800' : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
             {isPreview ? <EyeOff size={16} /> : <Eye size={16} />} 
             <span className="hidden sm:inline">{isPreview ? 'Exit' : 'Preview'}</span>
           </button>

           <button onClick={handleOpenDeployModal} className="px-4 py-2 text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
             <UploadCloud size={16} /> <span className="hidden md:inline">Publish</span>
           </button>

           <button onClick={() => handleSaveProject()} disabled={isDeploying} className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 rounded-lg transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50">
             {isDeploying ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} <span className="hidden md:inline">Save</span>
           </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        {!isPreview && <div className="hidden lg:block"><LeftSidebar editor={editor} /></div>}
        
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className={`flex-1 overflow-auto custom-scrollbar transition-all duration-300 ${isPreview ? 'p-0 bg-white' : 'p-2 sm:p-6 md:p-10 bg-[#f8f9fa]'}`}>
            <div
              ref={editorRef}
              className={`transition-all duration-300 ease-in-out relative z-0 mx-auto ${isPreview ? 'w-full h-full' : 'bg-white shadow-xl rounded-xl'}`}
              style={{ width: '100%', minHeight: isPreview ? '100vh' : '110vh' }}
            ></div>
          </div>
        </div>

        {!isPreview && <div className="hidden lg:block"><RightSidebar editor={editor} brandConfig={brandConfig} setBrandConfig={setBrandConfig} /></div>}
      </div>

      {/* MODALS */}
      {showCodeModal && editor && (
        <CodeModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} html={editor.getHtml()} css={editor.getCss()} />
      )}

      {showDeployModal && (
        <DeployModal 
          isOpen={showDeployModal} 
          onClose={() => setShowDeployModal(false)} 
          url={deployedUrl} 
          onDownloadZip={handleDownloadZip} 
          onDeployNetlify={handleDeployNetlify} 
          deployStage={deployStage}
          deployError={deployError}
        />
      )}

      {showSEOModal && (
        <SEOModal
          isOpen={showSEOModal}
          onClose={() => setShowSEOModal(false)}
          pageName={pages.find(p => p.id === currentPage)?.name || 'Home'}
          seoData={seoData[currentPage] || {}}
          pageText={editor ? editor.getHtml().replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''}
          onSave={(data) => {
            setSeoData(prev => ({ ...prev, [currentPage]: data }));
          }}
        />
      )}

      {showTranslateModal && (
        <TranslateModal
          isOpen={showTranslateModal}
          onClose={() => setShowTranslateModal(false)}
          editor={editor}
        />
      )}

      {/* AI SECTION GENERATOR MODAL */}
      {showAIModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-purple-100">
            <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold text-xl">
              <Sparkles className="w-6 h-6" /> AI Section Generator
            </div>
            <p className="text-sm text-gray-500 mb-4">Describe the section you want to generate (e.g. "Modern AI SaaS hero with gradient buttons and clean typography").</p>
            
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Section Type</label>
            <select value={aiSectionType} onChange={(e) => setAiSectionType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl mb-4 text-sm focus:outline-none focus:border-purple-500">
              <option value="hero">Hero Header</option>
              <option value="features">Features Grid</option>
              <option value="pricing">Pricing Cards</option>
            </select>

            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Prompt Description</label>
            <textarea 
              value={aiPrompt} 
              onChange={(e) => setAiPrompt(e.target.value)} 
              placeholder="Enter details..." 
              className="w-full p-3 border border-gray-200 rounded-xl mb-6 text-sm h-28 focus:outline-none focus:border-purple-500"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAIModal(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleGenerateAI} disabled={isGeneratingAI} className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 shadow-md flex items-center gap-2">
                {isGeneratingAI ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />} Generate & Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO & ACCESSIBILITY AUDIT MODAL */}
      {showSEOModal && seoResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xl">
                <ShieldCheck className="w-6 h-6" /> SEO & Accessibility Audit
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${seoResult.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                Score: {seoResult.score}/100
              </div>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar mb-6">
              {seoResult.issues.map((issue, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs flex items-start gap-2">
                  {issue.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                  <span className="text-gray-700">{issue.message}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowSEOModal(false)} className="px-6 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* VERSION HISTORY MODAL */}
      {showVersionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xl">
                <History className="w-6 h-6 text-purple-600" /> Project Version Timeline
              </div>
              <button onClick={() => setShowVersionModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar mb-6">
              {versions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">No saved versions found yet. Click Save to create your first snapshot.</p>
              ) : (
                versions.map((ver) => (
                  <div key={ver.id} className="p-3 border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{ver.version_name}</p>
                      <p className="text-xs text-gray-400">{new Date(ver.created_at).toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleRestoreVersion(ver)} className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Builder;
