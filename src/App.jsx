import React, { useState } from 'react';
import { Type, Square, Image as ImageIcon, CheckSquare, Code, Download, X, Copy, Globe, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const COMPONENT_TYPES = [
  { type: 'text', label: 'Text', icon: Type, description: 'Add a text block' },
  { type: 'button', label: 'Button', icon: Square, description: 'Add a clickable button' },
  { type: 'image', label: 'Image', icon: ImageIcon, description: 'Insert an image' },
  { type: 'form', label: 'Form', icon: CheckSquare, description: 'Create a form input' },
];

const getDefaultProps = (type) => {
  switch (type) {
    case 'text':
      return {
        content: 'Sample Text',
        styles: { color: '#333333', fontSize: '16px', padding: '10px' }
      };
    case 'button':
      return {
        content: 'Click Me',
        styles: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }
      };
    case 'image':
      return {
        content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        styles: { width: '100%', maxWidth: '400px', borderRadius: '8px' }
      };
    case 'form':
      return {
        content: { buttonText: 'Submit', placeholder: 'Enter text...' },
        styles: { display: 'flex', gap: '8px', padding: '10px' }
      };
    default:
      return { content: '', styles: {} };
  }
};

const camelToDash = (str) => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

export default function App() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(null);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    
    if (type) {
      const defaultProps = getDefaultProps(type);
      const newElement = {
        id: Date.now().toString(),
        type: type,
        content: defaultProps.content,
        styles: defaultProps.styles
      };
      
      setElements([...elements, newElement]);
      setSelectedId(newElement.id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateElement = (id, key, value, isStyle = false) => {
    setElements(elements.map(el => {
      if (el.id === id) {
        if (isStyle) {
          return { ...el, styles: { ...el.styles, [key]: value } };
        } else {
          return { ...el, [key]: value };
        }
      }
      return el;
    }));
  };

  // Code Generation Logic
  const generateCSS = () => {
    let cssString = `/* Base Styles */\nbody {\n  font-family: system-ui, sans-serif;\n  background-color: #f8fafc;\n  margin: 0;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n`;
    
    elements.forEach(el => {
      cssString += `.el-${el.id} {\n`;
      for (const [key, value] of Object.entries(el.styles)) {
        if (value) {
          cssString += `  ${camelToDash(key)}: ${value};\n`;
        }
      }
      cssString += `}\n\n`;
    });
    return cssString;
  };

  const generateHTML = () => {
    let htmlString = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Exported Website</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n`;
    
    elements.forEach(el => {
      switch (el.type) {
        case 'text':
          htmlString += `  <p class="el-${el.id}">${el.content}</p>\n`;
          break;
        case 'button':
          htmlString += `  <button class="el-${el.id}" onclick="handleButtonClick('${el.id}')">${el.content}</button>\n`;
          break;
        case 'image':
          htmlString += `  <img class="el-${el.id}" src="${el.content}" alt="Exported Image" />\n`;
          break;
        case 'form':
          htmlString += `  <form class="el-${el.id}" onsubmit="handleFormSubmit(event, '${el.id}')">\n`;
          htmlString += `    <input type="text" placeholder="${el.content.placeholder}" style="flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />\n`;
          htmlString += `    <button type="submit" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">${el.content.buttonText}</button>\n`;
          htmlString += `  </form>\n`;
          break;
        default:
          break;
      }
    });

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

function handleFormSubmit(e, id) {
  e.preventDefault();
  alert('Form ' + id + ' submitted!');
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

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployedUrl(null);
    
    // In a real application, you would generateHTML() and POST it to a Netlify/Vercel API here
    
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 8);
      setDeployedUrl(`https://site-${randomString}.netlify.app`);
      setIsDeploying(false);
    }, 2000); // 2 second mock deployment wait
  };

  const renderComponent = (el) => {
    switch (el.type) {
      case 'text':
        return <p style={el.styles}>{el.content}</p>;
      case 'button':
        return <button style={el.styles}>{el.content}</button>;
      case 'image':
        return <img src={el.content} alt="Placeholder" style={el.styles} />;
      case 'form':
        return (
          <div style={el.styles}>
            <input 
              type="text" 
              placeholder={el.content.placeholder} 
              className="border border-gray-300 rounded px-3 py-2 flex-1 outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              {el.content.buttonText}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const selectedElement = elements.find(e => e.id === selectedId);

  return (
    <div className="flex w-full h-screen font-sans bg-gray-100 overflow-hidden relative">
      {/* Left Sidebar (20%) */}
      <div className="w-1/5 bg-[#111827] text-white flex flex-col pt-8 pb-6 shadow-2xl z-20 border-r border-gray-800">
        <h2 className="text-xl font-bold mb-8 px-6 tracking-wide text-gray-100 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
          Components
        </h2>
        <div className="w-full px-5 space-y-4 overflow-y-auto custom-scrollbar pb-6">
          {COMPONENT_TYPES.map(({ type, label, icon: Icon, description }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
              className="bg-[#1f2937] border border-gray-700 hover:border-blue-500 hover:bg-[#374151] p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 shadow-md hover:shadow-blue-900/20 group flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 text-gray-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{label}</h3>
              </div>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 ml-10 transition-colors pointer-events-none">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Center Canvas (60%) */}
      <div className="w-3/5 bg-[#f8fafc] flex flex-col p-8 transition-colors relative">
        <div className="mb-6 flex justify-between items-center px-2">
          <h2 className="text-2xl font-semibold text-gray-800">Canvas</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
              {elements.length} components
            </span>
            <button 
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Code className="w-4 h-4" />
              Export Code
            </button>
            <button 
              onClick={handleDeploy}
              disabled={isDeploying || elements.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                isDeploying || elements.length === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              {isDeploying ? 'Deploying...' : 'Deploy Website'}
            </button>
          </div>
        </div>
        
        <div 
          className="w-full flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col relative bg-white overflow-y-auto shadow-sm hover:border-blue-400 hover:bg-blue-50/10 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
            <div className="p-8 space-y-6 min-h-full pb-32">
              {elements.map((el) => {
                const isSelected = selectedId === el.id;
                
                return (
                  <div 
                    key={el.id} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(el.id);
                    }}
                    className={`relative rounded-lg cursor-pointer transition-all duration-200 group ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-white' 
                        : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 hover:ring-offset-white'
                    }`}
                  >
                    <div className={isSelected ? 'pointer-events-none' : ''}>
                      {renderComponent(el)}
                    </div>
                    {isSelected && (
                      <div className="absolute -top-7 left-0 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-t-md z-10 pointer-events-none">
                        {el.type}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel (20%) */}
      <div className="w-1/5 bg-[#111827] text-white flex flex-col pt-8 pb-6 shadow-2xl z-20 border-l border-gray-800">
        <h2 className="text-xl font-bold mb-8 px-6 tracking-wide text-gray-100 flex items-center gap-2">
          <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
          Properties
        </h2>
        <div className="w-full px-5 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          {selectedElement ? (
            <div className="w-full text-left bg-[#1f2937] p-5 rounded-xl border border-gray-700 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Editing</p>
                  <p className="font-bold text-lg text-white capitalize flex items-center gap-2">
                    {selectedElement.type}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                 
                 {selectedElement.type === 'text' && (
                   <>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Text Content</label>
                       <textarea 
                         value={selectedElement.content}
                         onChange={(e) => updateElement(selectedElement.id, 'content', e.target.value)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[80px] resize-y"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Font Size</label>
                       <input 
                         type="text" 
                         value={selectedElement.styles.fontSize || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'fontSize', e.target.value, true)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Color</label>
                       <div className="flex items-center gap-2">
                         <input 
                           type="color" 
                           value={selectedElement.styles.color || '#000000'}
                           onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                           className="h-9 w-12 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                         />
                         <input 
                           type="text" 
                           value={selectedElement.styles.color || ''}
                           onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                           className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                         />
                       </div>
                     </div>
                   </>
                 )}

                 {selectedElement.type === 'button' && (
                   <>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Label</label>
                       <input 
                         type="text" 
                         value={selectedElement.content}
                         onChange={(e) => updateElement(selectedElement.id, 'content', e.target.value)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Background Color</label>
                       <div className="flex items-center gap-2">
                         <input 
                           type="color" 
                           value={selectedElement.styles.backgroundColor || '#3b82f6'}
                           onChange={(e) => updateElement(selectedElement.id, 'backgroundColor', e.target.value, true)}
                           className="h-9 w-12 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                         />
                         <input 
                           type="text" 
                           value={selectedElement.styles.backgroundColor || ''}
                           onChange={(e) => updateElement(selectedElement.id, 'backgroundColor', e.target.value, true)}
                           className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                         />
                       </div>
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Text Color</label>
                       <div className="flex items-center gap-2">
                         <input 
                           type="color" 
                           value={selectedElement.styles.color || '#ffffff'}
                           onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                           className="h-9 w-12 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                         />
                         <input 
                           type="text" 
                           value={selectedElement.styles.color || ''}
                           onChange={(e) => updateElement(selectedElement.id, 'color', e.target.value, true)}
                           className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                         />
                       </div>
                     </div>
                   </>
                 )}

                 {selectedElement.type === 'image' && (
                   <>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Image URL</label>
                       <textarea 
                         value={selectedElement.content}
                         onChange={(e) => updateElement(selectedElement.id, 'content', e.target.value)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[100px] resize-y break-all"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Border Radius</label>
                       <input 
                         type="text" 
                         value={selectedElement.styles.borderRadius || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'borderRadius', e.target.value, true)}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       />
                     </div>
                   </>
                 )}

                 {selectedElement.type === 'form' && typeof selectedElement.content === 'object' && (
                   <>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Button Text</label>
                       <input 
                         type="text" 
                         value={selectedElement.content.buttonText || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'content', { ...selectedElement.content, buttonText: e.target.value })}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Placeholder</label>
                       <input 
                         type="text" 
                         value={selectedElement.content.placeholder || ''}
                         onChange={(e) => updateElement(selectedElement.id, 'content', { ...selectedElement.content, placeholder: e.target.value })}
                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       />
                     </div>
                   </>
                 )}

                 <div className="pt-4 border-t border-gray-700 mt-6">
                   <p className="text-xs text-gray-500 font-mono bg-gray-900 p-2 rounded truncate" title={selectedElement.id}>ID: {selectedElement.id}</p>
                   <button 
                     onClick={() => {
                       setElements(elements.filter(e => e.id !== selectedId));
                       setSelectedId(null);
                     }}
                     className="w-full mt-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 py-2 rounded-lg text-sm font-medium transition-colors"
                   >
                     Remove Component
                   </button>
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
