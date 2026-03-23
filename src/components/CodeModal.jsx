import React, { useState } from 'react';
import { X, Copy, Check, Code } from 'lucide-react';

export default function CodeModal({ isOpen, onClose, html, css }) {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = activeTab === 'html' ? html : css;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#111] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/40">
           <div className="flex items-center gap-3 text-white">
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Code className="w-5 h-5" />
             </div>
             <h3 className="font-serif text-xl tracking-wide">Source Code</h3>
           </div>
           
           <div className="flex items-center gap-2">
             <div className="flex p-1 bg-gray-900 rounded-lg border border-gray-800 mr-4">
               <button 
                 onMouseDown={() => setActiveTab('html')}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'html' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-white'}`}
               >
                 HTML
               </button>
               <button 
                 onMouseDown={() => setActiveTab('css')}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'css' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-white'}`}
               >
                 CSS
               </button>
             </div>
             
             <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors">
               <X className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto p-6 bg-[#0a0a0a] text-gray-300 font-mono text-sm leading-relaxed custom-scrollbar whitespace-pre-wrap">
          {activeTab === 'html' ? html : css}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-black/40 flex justify-end">
           <button 
             onClick={handleCopy}
             className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors"
           >
             {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
             {copied ? 'Copied!' : 'Copy to Clipboard'}
           </button>
        </div>
      </div>
    </div>
  );
}
