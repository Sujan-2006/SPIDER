import React, { useState, useEffect } from 'react';
import { Type, Palette, Code2, Sparkles, Download, Layers, Globe, Save, Key } from 'lucide-react';
import { downloadReactProjectZip } from '../services/codeExportService';
import { rewriteTextWithAI, generateBrandConfig } from '../services/aiService';

const RightSidebarInner = ({ editor, brandConfig = {}, setBrandConfig }) => {
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'style' | 'advanced'
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [elementText, setElementText] = useState('');
  const [elementSrc, setElementSrc] = useState('');
  const [elementHref, setElementHref] = useState('');
  const [elementStyles, setElementStyles] = useState({
    padding: '',
    margin: '',
    borderRadius: '',
    opacity: ''
  });
  const [elementAos, setElementAos] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);

  // Local Brand Design Tokens State
  const [primaryColor, setPrimaryColor] = useState(brandConfig.primaryColor || '#9D50BB');
  const [secondaryColor, setSecondaryColor] = useState(brandConfig.secondaryColor || '#6E48AA');
  const [fontHeading, setFontHeading] = useState(brandConfig.fontFamilyHeading || 'Playfair Display');
  const [fontBody, setFontBody] = useState(brandConfig.fontFamilyBody || 'Inter');
  const [activeThemePreset, setActiveThemePreset] = useState('custom');

  // AI Theme State
  const [themePrompt, setThemePrompt] = useState('');
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);

  // AI Image State
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const PRESET_THEMES = {
    custom: { name: 'Custom Theme' },
    minimal: { name: 'Minimal Clean', primaryColor: '#111111', secondaryColor: '#666666', fontFamilyHeading: 'Inter', fontFamilyBody: 'Inter' },
    bold: { name: 'Bold SaaS', primaryColor: '#4F46E5', secondaryColor: '#EC4899', fontFamilyHeading: 'Outfit', fontFamilyBody: 'Inter' },
    pastel: { name: 'Soft Pastel', primaryColor: '#F4A261', secondaryColor: '#2A9D8F', fontFamilyHeading: 'Playfair Display', fontFamilyBody: 'Plus Jakarta Sans' },
    dark: { name: 'Dark Mode', primaryColor: '#BB86FC', secondaryColor: '#03DAC6', fontFamilyHeading: 'Inter', fontFamilyBody: 'Roboto' }
  };

  const handleApplyPreset = (presetKey) => {
    setActiveThemePreset(presetKey);
    if (presetKey === 'custom') return;
    const theme = PRESET_THEMES[presetKey];
    setPrimaryColor(theme.primaryColor);
    setSecondaryColor(theme.secondaryColor);
    setFontHeading(theme.fontFamilyHeading);
    setFontBody(theme.fontFamilyBody);
    
    // Automatically apply to canvas
    setTimeout(() => {
      const btn = document.getElementById('apply-brand-btn');
      if (btn) btn.click();
    }, 50);
  };

  useEffect(() => {
    if (!editor) return;

    const handleComponentSelected = (model) => {
      setSelectedComponent(model);
      if (model) {
        setElementText(model.get('content') || model.getEl()?.innerText || '');
        setElementSrc(model.getAttributes()?.src || '');
        setElementHref(model.getAttributes()?.href || '');
        setElementAos(model.getAttributes()?.['data-aos'] || '');
        
        const currentStyle = model.getStyle();
        setElementStyles({
          padding: currentStyle['padding'] || '',
          margin: currentStyle['margin'] || '',
          borderRadius: currentStyle['border-radius'] || '',
          opacity: currentStyle['opacity'] || '1'
        });
      }
    };

    const handleComponentDeselected = () => {
      setSelectedComponent(null);
      setElementText('');
      setElementSrc('');
      setElementHref('');
      setElementAos('');
      setElementStyles({ padding: '', margin: '', borderRadius: '', opacity: '' });
    };

    editor.on('component:selected', handleComponentSelected);
    editor.on('component:deselected', handleComponentDeselected);

    // GrapesJS render target containers
    const stylesContainer = document.getElementById('styles-container');
    if (stylesContainer && stylesContainer.children.length === 0) {
      stylesContainer.appendChild(editor.StyleManager.render());
    }

    const layersContainer = document.getElementById('advanced-layers-container');
    if (layersContainer && layersContainer.children.length === 0) {
      layersContainer.appendChild(editor.LayerManager.render());
    }

    return () => {
      editor.off('component:selected', handleComponentSelected);
      editor.off('component:deselected', handleComponentDeselected);
    };
  }, [editor]);

  // Update canvas when Content tab form inputs change
  const handleTextChange = (val) => {
    setElementText(val);
    if (selectedComponent) {
      selectedComponent.components(val);
    }
  };

  const handleSrcChange = (val) => {
    setElementSrc(val);
    if (selectedComponent) {
      selectedComponent.addAttributes({ src: val });
    }
  };

  const handleHrefChange = (val) => {
    setElementHref(val);
    if (selectedComponent) {
      selectedComponent.addAttributes({ href: val });
    }
  };

  const handleAosChange = (val) => {
    setElementAos(val);
    if (selectedComponent) {
      if (val === '') {
        const attrs = { ...selectedComponent.getAttributes() };
        delete attrs['data-aos'];
        selectedComponent.setAttributes(attrs);
      } else {
        selectedComponent.addAttributes({ 'data-aos': val });
      }
    }
  };

  const handleStyleChange = (property, value) => {
    setElementStyles(prev => ({ ...prev, [property]: value }));
    if (selectedComponent) {
      const cssProp = property === 'borderRadius' ? 'border-radius' : property;
      const currentStyle = selectedComponent.getStyle();
      selectedComponent.setStyle({ ...currentStyle, [cssProp]: value });
    }
  };

  const handleAIRewriteText = async (mode) => {
    if (!elementText || isRewriting) return;

    setIsRewriting(true);
    try {
      const newText = await rewriteTextWithAI(elementText, mode);
      handleTextChange(newText);
    } catch (e) {
      alert("AI Rewrite failed: " + e.message);
    } finally {
      setIsRewriting(false);
    }
  };

  // Update Brand Design Tokens in Canvas CSS
  const handleCopyReact = () => {
    if (!selectedComponent) return;
    const html = selectedComponent.toHTML();
    
    // Basic HTML -> JSX transform
    const jsx = html
      .replace(/class=/g, 'className=')
      .replace(/for=/g, 'htmlFor=')
      .replace(/<!--/g, '{/*')
      .replace(/-->/g, '*/}')
      .replace(/<img(.*?)>/g, (match) => {
        if (!match.endsWith('/>')) return match.replace(/>$/, ' />');
        return match;
      })
      .replace(/<input(.*?)>/g, (match) => {
        if (!match.endsWith('/>')) return match.replace(/>$/, ' />');
        return match;
      })
      .replace(/<br>/g, '<br />');

    const componentCode = `export default function CustomComponent() {\n  return (\n    ${jsx}\n  );\n}`;
    navigator.clipboard.writeText(componentCode);
    alert('React component copied to clipboard!');
  };

  const handleGenerateImage = () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    // Use Pollinations.ai for instant free AI image generation
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=600&nologo=true`;
    
    // Simulate slight loading delay for UI feedback
    setTimeout(() => {
      handleSrcChange(url);
      setIsGeneratingImage(false);
      setImagePrompt(''); // Clear prompt
    }, 600);
  };

  const handleGenerateTheme = async () => {
    if (!themePrompt) return;
    setIsGeneratingTheme(true);
    try {
      const config = await generateBrandConfig(themePrompt);
      if (config) {
        if (config.primaryColor) setPrimaryColor(config.primaryColor);
        if (config.secondaryColor) setSecondaryColor(config.secondaryColor);
        if (config.fontFamilyHeading) setFontHeading(config.fontFamilyHeading);
        if (config.fontFamilyBody) setFontBody(config.fontFamilyBody);
        setActiveThemePreset('custom');
        // Automatically apply the generated theme
        setTimeout(() => {
          document.getElementById('apply-brand-btn')?.click();
        }, 100);
      }
    } catch (e) {
      alert("Error generating theme: " + e.message);
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  const handleApplyBrandConfig = () => {
    const updated = {
      primaryColor,
      secondaryColor,
      fontFamilyHeading: fontHeading,
      fontFamilyBody: fontBody,
    };

    if (setBrandConfig) setBrandConfig(updated);

    if (editor) {
      const cssString = `
        :root {
          --spider-primary: ${primaryColor};
          --spider-secondary: ${secondaryColor};
        }
        body { font-family: '${fontBody}', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: '${fontHeading}', serif; }
      `;
      editor.setStyle(cssString);
    }
  };

  return (
    <div className="w-[320px] h-full bg-white border-l border-gray-200 flex flex-col z-10 shrink-0 font-sans">
      {/* Sidebar Top Header */}
      <div className="h-14 border-b border-gray-100 flex items-center px-4 bg-gray-50/50 justify-between">
        <span className="font-bold text-gray-800 text-sm">Inspector & Controls</span>
        {selectedComponent && (
          <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono">
            {selectedComponent.get('tagName') || 'element'}
          </span>
        )}
      </div>

      {/* Progressive Tabs Switcher */}
      <div className="flex border-b border-gray-100 p-1 bg-gray-50/80 gap-1">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'content' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Type size={14} /> Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'style' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Palette size={14} /> Style
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'advanced' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Code2 size={14} /> Advanced ⚡
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {/* 1. CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {!selectedComponent ? (
              <div className="text-center py-12 text-gray-400">
                <Type className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium text-gray-600">Select any element on canvas</p>
                <p className="text-xs text-gray-400 mt-1">Click a text, image, or button to edit its content.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Text Content</label>
                  <textarea
                    value={elementText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg h-24 focus:outline-none focus:border-purple-500"
                    placeholder="Enter text..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAIRewriteText('shorten')}
                      disabled={isRewriting}
                      className="px-2 py-1 text-[11px] bg-purple-50 text-purple-700 rounded hover:bg-purple-100 flex items-center gap-1 disabled:opacity-50"
                    >
                      <Sparkles size={12} /> {isRewriting ? '...' : 'Shorten'}
                    </button>
                    <button
                      onClick={() => handleAIRewriteText('professional')}
                      disabled={isRewriting}
                      className="px-2 py-1 text-[11px] bg-purple-50 text-purple-700 rounded hover:bg-purple-100 flex items-center gap-1 disabled:opacity-50"
                    >
                      <Sparkles size={12} /> {isRewriting ? '...' : 'Make Professional'}
                    </button>
                  </div>
                </div>

                {selectedComponent.get('tagName') === 'img' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                      <input
                        type="text"
                        value={elementSrc}
                        onChange={(e) => handleSrcChange(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-3 rounded-xl border border-teal-100">
                      <label className="block text-[11px] font-bold text-teal-800 mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-teal-600" /> AI Image Generator
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                          placeholder="e.g. Futuristic city" 
                          className="flex-1 p-2 text-xs border border-teal-200 rounded focus:outline-none focus:border-teal-500 bg-white/80"
                        />
                        <button 
                          onClick={handleGenerateImage}
                          disabled={isGeneratingImage || !imagePrompt}
                          className="px-3 py-2 bg-teal-600 text-white rounded text-xs font-semibold hover:bg-teal-700 disabled:opacity-50 transition-colors"
                        >
                          {isGeneratingImage ? '...' : 'Create'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {(selectedComponent.get('tagName') === 'a' || selectedComponent.get('tagName') === 'button') && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Link (URL / Anchor)</label>
                    <input
                      type="text"
                      value={elementHref}
                      onChange={(e) => handleHrefChange(e.target.value)}
                      className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="#section or https://..."
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 2. STYLE TAB (BRAND DESIGN TOKENS) */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Global Brand Theme</h3>
              
              <div className="space-y-4">
                {/* AI THEME GENERATOR */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-100">
                  <label className="block text-xs font-bold text-purple-800 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-purple-600" /> AI Magic Theme
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={themePrompt}
                      onChange={(e) => setThemePrompt(e.target.value)}
                      placeholder="e.g. Cyberpunk Neon" 
                      className="flex-1 p-2 text-xs border border-purple-200 rounded focus:outline-none focus:border-purple-500"
                    />
                    <button 
                      onClick={handleGenerateTheme}
                      disabled={isGeneratingTheme || !themePrompt}
                      className="px-3 py-2 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      {isGeneratingTheme ? '...' : 'Generate'}
                    </button>
                  </div>
                </div>

                {/* THEME PRESET SWITCHER */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <label className="block text-xs font-bold text-purple-700 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} /> Theme Presets
                  </label>
                  <select 
                    value={activeThemePreset}
                    onChange={(e) => handleApplyPreset(e.target.value)}
                    className="w-full p-2 text-xs border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 font-medium text-gray-800 bg-white"
                  >
                    {Object.entries(PRESET_THEMES).map(([key, theme]) => (
                      <option key={key} value={key}>{theme.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Primary Brand Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                    <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 p-1.5 text-xs font-mono border border-gray-200 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Secondary Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                    <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="flex-1 p-1.5 text-xs font-mono border border-gray-200 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Heading Typography</label>
                  <select value={fontHeading} onChange={(e) => setFontHeading(e.target.value)} className="w-full p-2 text-xs border border-gray-200 rounded">
                    <option value="Playfair Display">Playfair Display (Editorial)</option>
                    <option value="Inter">Inter (Clean Modern)</option>
                    <option value="Outfit">Outfit (SaaS Tech)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Body Typography</label>
                  <select value={fontBody} onChange={(e) => setFontBody(e.target.value)} className="w-full p-2 text-xs border border-gray-200 rounded">
                    <option value="Inter">Inter (Sans-Serif)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  </select>
                </div>

                <button id="apply-brand-btn" onClick={handleApplyBrandConfig} className="w-full py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm">
                  Apply Brand Theme
                </button>
                </div>
              </div>
            </div>

            {/* ELEMENT LAYOUT & SPACING */}
            {selectedComponent && (
              <div className="pt-2 mt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Element Layout</h3>
                <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Padding (e.g. 10px 20px)</label>
                    <input 
                      type="text" 
                      value={elementStyles.padding} 
                      onChange={(e) => handleStyleChange('padding', e.target.value)} 
                      className="w-full p-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-purple-500 bg-white" 
                      placeholder="auto" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Margin (e.g. 0 auto)</label>
                    <input 
                      type="text" 
                      value={elementStyles.margin} 
                      onChange={(e) => handleStyleChange('margin', e.target.value)} 
                      className="w-full p-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-purple-500 bg-white" 
                      placeholder="auto" 
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Radius (px)</label>
                      <input 
                        type="text" 
                        value={elementStyles.borderRadius} 
                        onChange={(e) => handleStyleChange('borderRadius', e.target.value)} 
                        className="w-full p-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-purple-500 bg-white" 
                        placeholder="0px" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Opacity (0-1)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="1" 
                        value={elementStyles.opacity} 
                        onChange={(e) => handleStyleChange('opacity', e.target.value)} 
                        className="w-full p-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-purple-500 bg-white" 
                        placeholder="1" 
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}
            
            <div id="styles-container" className="hidden"></div>
          </div>
        )}

        {/* 3. ADVANCED TAB (DEVELOPER TOOLS) */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            
            {/* MOTION & ANIMATION */}
            {selectedComponent && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                  <Sparkles size={14} className="text-purple-500" /> Scroll Motion (AOS)
                </h4>
                <p className="text-[10px] text-gray-500 mb-2">Animate this element when it scrolls into view.</p>
                <select 
                  value={elementAos}
                  onChange={(e) => handleAosChange(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white font-medium text-gray-700"
                >
                  <option value="">None</option>
                  <optgroup label="Fade">
                    <option value="fade-up">Fade Up</option>
                    <option value="fade-down">Fade Down</option>
                    <option value="fade-left">Fade Left</option>
                    <option value="fade-right">Fade Right</option>
                  </optgroup>
                  <optgroup label="Zoom">
                    <option value="zoom-in">Zoom In</option>
                    <option value="zoom-in-up">Zoom In Up</option>
                  </optgroup>
                  <optgroup label="Flip">
                    <option value="flip-left">Flip Left</option>
                    <option value="flip-up">Flip Up</option>
                  </optgroup>
                </select>
              </div>
            )}

            <div className="border border-purple-100 bg-purple-50/50 p-3 rounded-xl">
              <h4 className="text-xs font-bold text-purple-800 flex items-center gap-1.5 mb-1">
                <Code2 size={14} /> Developer Tools
              </h4>
              <p className="text-[11px] text-purple-600">Export clean React components or inspect raw GrapesJS DOM layers & CSS rules.</p>
            </div>

            <button
              onClick={() => editor && downloadReactProjectZip(editor.getHtml(), editor.getCss(), { primaryColor, secondaryColor, fontHeading, fontBody })}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
            >
              <Download size={14} /> Export React + Vite ZIP Bundle
            </button>

            {selectedComponent && (
              <button
                onClick={handleCopyReact}
                className="w-full py-2 bg-white border border-purple-200 text-purple-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
              >
                <Code2 size={14} /> Copy Selected as React
              </button>
            )}

            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Layers size={14} /> Component DOM Tree
              </h4>
              <div id="advanced-layers-container" className="border border-gray-200 rounded-lg p-2 max-h-48 overflow-y-auto custom-scrollbar"></div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Palette size={14} /> GrapesJS Style Inspector
              </h4>
              <div id="styles-container" className="border border-gray-200 rounded-lg p-2 min-h-[200px]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500 text-xs truncate whitespace-normal break-all">{this.state.error.toString()}</div>;
    }
    return this.props.children;
  }
}

const RightSidebar = (props) => (
  <ErrorBoundary>
    <RightSidebarInner {...props} />
  </ErrorBoundary>
);

export default RightSidebar;
