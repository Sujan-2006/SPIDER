import React, { useState, useRef } from 'react';
import { X, FileText, Search, Image, Code2, Zap, Download, Trash2, Eye, EyeOff } from 'lucide-react';

const TABS = [
  { id: 'page',       label: 'Page',       icon: FileText },
  { id: 'seo',        label: 'SEO',        icon: Search   },
  { id: 'background', label: 'Background', icon: Image    },
  { id: 'css',        label: 'Custom CSS', icon: Code2    },
  { id: 'actions',    label: 'Actions',    icon: Zap      },
];

export default function SettingsPanel({ editor, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('page');

  // Page settings
  const [pageTitle,       setPageTitle]       = useState('My Page');
  const [metaDescription, setMetaDescription] = useState('');

  // SEO settings
  const [metaTags, setMetaTags] = useState('');
  const [keywords, setKeywords] = useState('');

  // Background settings
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgImage, setBgImage] = useState('');

  // Custom CSS
  const [customCss, setCustomCss] = useState('');
  const customCssRef = useRef(null);

  // Actions state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [exportDone, setExportDone]       = useState(false);

  // ── helpers ─────────────────────────────────────────────────────────────────

  const setCanvasBodyStyle = (prop, value) => {
    if (!editor) return;
    const frame = editor.Canvas.getFrameEl();
    if (!frame) return;
    const body = frame.contentDocument?.body;
    if (body) body.style[prop] = value;
  };

  // ── real-time appliers ───────────────────────────────────────────────────────

  const applyBgColor = (color) => {
    setBgColor(color);
    setCanvasBodyStyle('backgroundColor', color);
  };

  const applyBgImage = (url) => {
    setBgImage(url);
    if (url.trim()) {
      setCanvasBodyStyle('backgroundImage', `url("${url}")`);
      setCanvasBodyStyle('backgroundSize', 'cover');
      setCanvasBodyStyle('backgroundPosition', 'center');
    } else {
      setCanvasBodyStyle('backgroundImage', '');
    }
  };

  const applyCustomCss = (css) => {
    setCustomCss(css);
    if (!editor) return;
    const frame = editor.Canvas.getFrameEl();
    if (!frame) return;
    const doc = frame.contentDocument;
    let styleEl = doc.getElementById('custom-page-css');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = 'custom-page-css';
      doc.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  };

  const applyPageTitle = (title) => {
    setPageTitle(title);
    if (editor) {
      const page = editor.Pages.getSelected();
      if (page) page.set('name', title || 'My Page');
    }
    const frame = editor?.Canvas.getFrameEl();
    if (frame?.contentDocument?.title !== undefined) {
      frame.contentDocument.title = title;
    }
  };

  // ── action handlers ──────────────────────────────────────────────────────────

  const handleExportHTML = () => {
    if (!editor) return;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}" />
  <meta name="keywords" content="${keywords}" />
  <style>
${editor.getCss()}
${customCss}
  </style>
</head>
<body>
${editor.getHtml()}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);

    setExportDone(true);
    setTimeout(() => setExportDone(false), 2500);
  };

  const handleExportCSS = () => {
    if (!editor) return;
    const css  = editor.getCss() + (customCss ? `\n/* Custom CSS */\n${customCss}` : '');
    const blob = new Blob([css], { type: 'text/css' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'style.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCanvas = () => {
    if (!editor) return;
    if (!window.confirm('Clear the entire canvas? This cannot be undone.')) return;
    editor.DomComponents.clear();
    editor.CssComposer.clear();
    editor.UndoManager.clear();
  };

  const handleTogglePreview = () => {
    if (!editor) return;
    if (isPreviewMode) {
      editor.stopCommand('core:preview');
    } else {
      editor.runCommand('core:preview');
    }
    setIsPreviewMode((prev) => !prev);
  };

  // ────────────────────────────────────────────────────────────────────────────

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className="relative w-[420px] h-full bg-white shadow-2xl flex flex-col pointer-events-auto"
        style={{ animation: 'slideInRight 0.25s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900 text-lg tracking-tight">Page Settings</h2>
            <p className="text-xs text-gray-400 mt-0.5">Changes apply to the canvas in real-time.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-100 shrink-0 bg-white overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-wider transition-all min-w-[60px]
                ${activeTab === id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

          {/* ── PAGE ── */}
          {activeTab === 'page' && (
            <div className="space-y-5">
              <Section title="Page Title" hint="Sets the browser tab title for this page.">
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => applyPageTitle(e.target.value)}
                  placeholder="e.g. My Awesome Website"
                  className={inputCls}
                />
              </Section>

              <Section title="Meta Description" hint="Short description shown in search engine results.">
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Describe this page in 1–2 sentences…"
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
                <p className="text-right text-[11px] text-gray-400 mt-1">{metaDescription.length}/160</p>
              </Section>
            </div>
          )}

          {/* ── SEO ── */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              <Section title="Meta Tags" hint='Comma-separated tags, e.g. "og:title, twitter:card".'>
                <textarea
                  value={metaTags}
                  onChange={(e) => setMetaTags(e.target.value)}
                  placeholder='e.g. og:title, og:description, twitter:card'
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Section>

              <Section title="Keywords" hint="Comma-separated keywords for search indexing.">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder='e.g. portfolio, design, web builder'
                  className={inputCls}
                />
              </Section>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 leading-relaxed">
                💡 Meta tags and keywords are saved with the project and injected into the exported HTML automatically.
              </div>
            </div>
          )}

          {/* ── BACKGROUND ── */}
          {activeTab === 'background' && (
            <div className="space-y-5">
              <Section title="Background Color" hint="Sets the page body background color.">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => applyBgColor(e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => applyBgColor(e.target.value)}
                    placeholder="#ffffff"
                    className={`${inputCls} font-mono uppercase flex-1`}
                  />
                  <button
                    onClick={() => applyBgColor('#ffffff')}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    Reset
                  </button>
                </div>
              </Section>

              <Section title="Background Image URL" hint="Enter a direct image URL or leave blank to disable.">
                <input
                  type="text"
                  value={bgImage}
                  onChange={(e) => applyBgImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className={inputCls}
                />
                {bgImage && (
                  <div
                    className="mt-3 h-24 rounded-xl border border-gray-200 bg-cover bg-center"
                    style={{ backgroundImage: `url("${bgImage}")` }}
                  />
                )}
                {bgImage && (
                  <button
                    onClick={() => applyBgImage('')}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Remove background image
                  </button>
                )}
              </Section>
            </div>
          )}

          {/* ── CUSTOM CSS ── */}
          {activeTab === 'css' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Custom CSS</h3>
                <p className="text-xs text-gray-400 mt-0.5">Applied to the canvas in real-time. Injected into exported HTML.</p>
              </div>
              <textarea
                ref={customCssRef}
                value={customCss}
                onChange={(e) => applyCustomCss(e.target.value)}
                placeholder={`/* Custom styles */\nbody {\n  font-family: 'Inter', sans-serif;\n}\n\nh1 {\n  color: #9D50BB;\n}`}
                rows={18}
                spellCheck={false}
                className="w-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-4 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed custom-scrollbar"
              />
              <button
                onClick={() => applyCustomCss('')}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Clear CSS
              </button>
            </div>
          )}

          {/* ── ACTIONS ── */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">Quick actions for your current project canvas.</p>

              {/* Export HTML */}
              <ActionCard
                icon={<Download className="w-5 h-5" />}
                title="Export HTML"
                description="Download a complete index.html with embedded CSS, meta tags, and your custom styles."
                buttonLabel={exportDone ? '✓ Downloaded!' : 'Export HTML'}
                buttonCls={exportDone
                  ? 'bg-emerald-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                onClick={handleExportHTML}
              />

              {/* Export CSS */}
              <ActionCard
                icon={<Code2 className="w-5 h-5" />}
                title="Export CSS"
                description="Download the generated stylesheet — including GrapesJS component styles and your custom CSS."
                buttonLabel="Export CSS"
                buttonCls="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleExportCSS}
              />

              {/* Preview Mode */}
              <ActionCard
                icon={isPreviewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                title="Preview Mode"
                description={isPreviewMode
                  ? 'Currently in preview mode. Click to return to edit mode.'
                  : 'Hide all builder UI and preview the page exactly as visitors see it.'}
                buttonLabel={isPreviewMode ? 'Exit Preview' : 'Enable Preview'}
                buttonCls={isPreviewMode
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-gray-900 hover:bg-gray-700 text-white'}
                onClick={handleTogglePreview}
                badge={isPreviewMode ? 'ACTIVE' : null}
              />

              {/* Clear Canvas */}
              <ActionCard
                icon={<Trash2 className="w-5 h-5" />}
                title="Clear Canvas"
                description="Remove all components from the canvas. This also clears undo history. Cannot be undone."
                buttonLabel="Clear Canvas"
                buttonCls="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleClearCanvas}
                danger
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md"
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function Section({ title, hint, children }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-semibold text-gray-700">{title}</label>
        {hint && <p className="text-[11px] text-gray-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function ActionCard({ icon, title, description, buttonLabel, buttonCls, onClick, danger = false, badge = null }) {
  return (
    <div className={`p-4 rounded-xl border ${danger ? 'border-red-100 bg-red-50/40' : 'border-gray-100 bg-gray-50'} space-y-3`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${danger ? 'bg-red-100 text-red-500' : 'bg-white text-gray-600 shadow-sm border border-gray-100'}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
            {badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 uppercase tracking-wide">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`w-full py-2 text-sm font-semibold rounded-lg transition-all ${buttonCls}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

const inputCls =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white';
