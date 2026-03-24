import React, { useState, useEffect } from 'react';
import { Palette, Settings2, Save } from 'lucide-react';

const RightSidebarInner = ({ editor }) => {
  const [activeTab, setActiveTab] = useState('styles');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSavedAsSymbol, setIsSavedAsSymbol] = useState(false);

  const saveAsSymbol = () => {
    if (!editor || !selectedComponent) return;
    
    const component = selectedComponent;
    const html = component.toHTML();
    const css = editor.CodeManager.getCode(component, 'css', { cssProps: 'all' });
    const id = `symbol-${Date.now()}`;
    const label = `Symbol ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    editor.BlockManager.add(id, {
      label: label,
      category: 'User Symbols',
      content: `<style>${css}</style>${html}`,
      media: `<svg viewBox="0 0 24 24" style="width:100%; height:100%"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l5.59-5.59L19 10l-7 7z"/></svg>`
    });

    setIsSavedAsSymbol(true);
    setTimeout(() => setIsSavedAsSymbol(false), 2000);
  };

  useEffect(() => {
    if (!editor) return;

    const handleComponentSelected = (model) => {
      setSelectedComponent(model);
    };

    const handleComponentDeselected = () => {
      setSelectedComponent(null);
    };

    editor.on('component:selected', handleComponentSelected);
    editor.on('component:deselected', handleComponentDeselected);

    // Ensure GrapesJS UI is appended to our React containers whenever this mounts
    const stylesContainer = document.getElementById('styles-container');
    if (stylesContainer && stylesContainer.children.length === 0) {
      stylesContainer.appendChild(editor.StyleManager.render());
    }

    const traitsContainer = document.getElementById('traits-container');
    if (traitsContainer && traitsContainer.children.length === 0) {
      traitsContainer.appendChild(editor.TraitManager.render());
    }

    return () => {
      editor.off('component:selected', handleComponentSelected);
      editor.off('component:deselected', handleComponentDeselected);
    };
  }, [editor]);


  return (
    <div className="w-[300px] h-full bg-white border-l border-gray-200 flex flex-col z-10 shrink-0">
      <div className="flex justify-between items-center px-4 h-14 border-b border-gray-100 bg-gray-50/50">
        <h2 className="font-semibold text-gray-800 font-playfair tracking-wide">Inspector</h2>
      </div>

      <div className="flex items-center h-12 border-b border-gray-100 px-2 gap-2">
        <button
          className={`flex-1 h-8 rounded-md flex items-center justify-center gap-2 text-xs font-medium transition-all ${
            activeTab === 'styles' ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('styles')}
        >
          <Palette size={14} /> Design
        </button>
        <button
          className={`flex-1 h-8 rounded-md flex items-center justify-center gap-2 text-xs font-medium transition-all ${
            activeTab === 'traits' ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('traits')}
        >
          <Settings2 size={14} /> Settings
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white relative">
        {!selectedComponent && (
          <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center text-center p-6 text-gray-400 fade-in">
            <Settings2 size={40} className="mb-4 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">No Element Selected</p>
            <p className="text-xs text-gray-400 mt-2">Select an element on the canvas to edit its properties.</p>
          </div>
        )}

        <div style={{ display: activeTab === 'styles' ? 'block' : 'none', minHeight: '100%' }}>
          <div id="styles-container" className="fade-in"></div>
        </div>
        <div style={{ display: activeTab === 'traits' ? 'block' : 'none', minHeight: '100%' }}>
          <div id="traits-container" className="fade-in"></div>
        </div>

        {selectedComponent && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/30 mt-auto">
            <button
              onClick={saveAsSymbol}
              disabled={isSavedAsSymbol}
              className={`w-full py-2.5 rounded-lg border-2 flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                isSavedAsSymbol 
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm'
              }`}
            >
              <Save size={16} />
              {isSavedAsSymbol ? 'Saved to Symbols!' : 'Save as Symbol'}
            </button>
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
      return <div className="p-4 text-red-500 text-xs truncate whitespace-normal break-all">{this.state.error.toString()} - {this.state.error.stack}</div>;
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
