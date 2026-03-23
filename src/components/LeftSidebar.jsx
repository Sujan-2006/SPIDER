import React, { useState, useEffect } from 'react';
import { Layers, LayoutTemplate, FileText, Search, Plus, Trash2, Copy, Edit2, Image as ImageIcon } from 'lucide-react';

const LeftSidebarInner = ({ editor }) => {
  const [activeTab, setActiveTab] = useState('blocks');
  const [blocks, setBlocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (!editor) return;

    // Blocks
    const handleBlocks = () => {
      const allBlocksRaw = editor.BlockManager.getAll();
      const allBlocks = allBlocksRaw.models || (Array.isArray(allBlocksRaw) ? allBlocksRaw : []);
      setBlocks(allBlocks);
      
      const cats = [...new Set(allBlocks.map(b => {
        const cat = b.get('category');
        return cat?.id || cat || 'Uncategorized';
      }))];
      setCategories(cats);
    };

    editor.on('block:add', handleBlocks);
    editor.on('block:remove', handleBlocks);
    editor.on('block:update', handleBlocks);
    handleBlocks(); // initial format

    // Pages
    const handlePages = () => {
      const allPagesRaw = editor.Pages.getAll();
      const allPages = allPagesRaw.models || (Array.isArray(allPagesRaw) ? allPagesRaw : []);
      setPages([...allPages]);
    };
    editor.on('page', handlePages);
    handlePages();

    // Layers are appended to "#layers-container" defined in Builder.jsx via config or manually rendered.
    // For now, we will let GrapesJS append to the DOM element if we set the config, 
    // or we might need to initialize the layer manager inside LeftSidebar.

    // Asset Manager
    const handleAssets = () => {
      if (activeTab === 'assets') {
        editor.runCommand('open-assets');
      }
    };
    handleAssets();

    return () => {
      editor.off('block:add block:remove block:update', handleBlocks);
      editor.off('page', handlePages);
    };
  }, [editor, activeTab]);

  const filteredBlocks = blocks.filter(b => 
    (b.get('label') || 'Unlabeled').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBlocks = () => (
    <div className="flex flex-col h-full fade-in">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search blocks..." 
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4" id="blocks-container">
        {/* We will let editor render blocks natively here, OR we can manually render them.
            Since GrapesJS allows customizing the block container via appendTo, 
            we just provide the container #blocks-container and let GrapesJS render. 
            However, we want custom search. So we manually drag blocks. */}
        {categories.map((cat, idx) => {
          const catBlocks = filteredBlocks.filter(b => {
            const bCat = b.get('category');
            return (bCat?.id || bCat || 'Uncategorized') === cat;
          });
          if (catBlocks.length === 0) return null;
          
          return (
            <div key={idx} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 px-1 font-playfair">{cat}</h3>
              <div className="grid grid-cols-2 gap-2">
                {catBlocks.map(block => (
                  <div
                    key={block.getId()}
                    className="gjs-block-custom flex flex-col items-center justify-center p-3 bg-white border border-gray-100 hover:border-primary hover:shadow-md hover:text-primary transition-all rounded-xl cursor-grab text-gray-600 text-center gap-2"
                    draggable
                    onDragStart={(e) => {
                      // Debug/Verification logging
                      console.log('Dragging block:', block.getId(), block.get('label'));
                      editor.BlockManager.startDrag(block, e);
                    }}
                    onDragEnd={() => {
                      console.log('Drag ended');
                      editor.BlockManager.endDrag();
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: block.get('media') }} className="w-6 h-6" />
                    <span className="text-[11px] font-medium leading-tight">{block.get('label')}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPages = () => (
    <div className="flex flex-col h-full fade-in p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 font-playfair">Pages</h3>
        <button 
          onClick={() => {
            editor.Pages.add({
              name: `Page ${pages.length + 1}`,
              component: '<div>New Page Content</div>'
            });
          }}
          className="p-1.5 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {pages.map(page => {
          const isSelected = editor.Pages.getSelected()?.getId() === page.getId();
          return (
            <div 
              key={page.getId()} 
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isSelected ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
            >
              <div 
                className="flex-1 cursor-pointer font-medium text-sm truncate"
                onClick={() => editor.Pages.select(page.getId())}
              >
                {page.get('name') || page.getId()}
              </div>
              <div className="flex items-center gap-1">
                <button 
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
                  onClick={() => {
                    // duplicate
                    const newPage = editor.Pages.add({
                      name: `${page.get('name')} Copy`,
                      component: editor.getHtml({ component: page.getMainComponent() }),
                      style: editor.getCss({ component: page.getMainComponent() })
                    });
                    editor.Pages.select(newPage.getId());
                  }}
                  title="Duplicate"
                >
                  <Copy size={14} />
                </button>
                <button 
                  className="p-1.5 text-red-400 hover:text-red-600 rounded transition-colors"
                  onClick={() => {
                    if (pages.length > 1) {
                        editor.Pages.remove(page);
                    } else {
                        alert('Cannot delete the last page.');
                    }
                  }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLayers = () => (
    <div className="flex flex-col h-full fade-in p-2">
      <div id="layers-container" className="flex-1 overflow-y-auto custom-scrollbar"></div>
    </div>
  );

  return (
    <div className="w-[300px] h-full bg-white border-r border-gray-200 flex flex-col z-10 shrink-0">
      <div className="flex items-center justify-around h-14 border-b border-gray-100 bg-gray-50/50">
        <button 
          className={`flex-1 h-full flex items-center justify-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'blocks' ? 'text-primary border-primary bg-white' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
          onClick={() => setActiveTab('blocks')}
        >
          <LayoutTemplate size={16} /> Blocks
        </button>
        <button 
          className={`flex-1 h-full flex items-center justify-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'pages' ? 'text-primary border-primary bg-white' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
          onClick={() => setActiveTab('pages')}
        >
          <FileText size={16} /> Pages
        </button>
        <button 
          className={`flex-1 h-full flex items-center justify-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'layers' ? 'text-primary border-primary bg-white' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
          onClick={() => setActiveTab('layers')}
        >
          <Layers size={16} /> Layers
        </button>
        <button 
          className={`flex-1 h-full flex items-center justify-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'assets' ? 'text-primary border-primary bg-white' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
          onClick={() => setActiveTab('assets')}
        >
          <ImageIcon size={16} /> Library
        </button>
      </div>

      <div className="flex-1 overflow-hidden bg-white">
        {activeTab === 'blocks' && renderBlocks()}
        {activeTab === 'pages' && renderPages()}
        {activeTab === 'assets' && (
          <div className="flex flex-col h-full fade-in p-4">
             <div id="assets-container" className="flex-1 overflow-y-auto custom-scrollbar"></div>
          </div>
        )}
        {/* We render layers container here, GrapesJS will append layer manager to it */}
        <div style={{ display: activeTab === 'layers' ? 'block' : 'none', height: '100%' }}>
            {renderLayers()}
        </div>
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

const LeftSidebar = (props) => (
  <ErrorBoundary>
    <LeftSidebarInner {...props} />
  </ErrorBoundary>
);

export default LeftSidebar;
