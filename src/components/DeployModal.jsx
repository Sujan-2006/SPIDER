import React, { useState } from 'react';
import { Rocket, CheckCircle2, Copy, ExternalLink, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeployModal({ isOpen, onClose, url }) {
  if (!isOpen) return null;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative text-center">
        {/* Background decorative blob */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-400/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-400/20 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="p-10 relative z-10">
          <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative shadow-inner border border-emerald-100">
             <Rocket className="w-10 h-10 text-emerald-500 animate-bounce" />
             <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
               <CheckCircle2 className="w-6 h-6 text-emerald-600" />
             </div>
          </div>
          
          <h2 className="text-3xl font-serif text-[#111] mb-2 tracking-tight">Mission Accomplished</h2>
          <p className="text-gray-500 font-medium mb-8">Your site has been successfully deployed to the global edge network on <span className="text-[#111] font-bold">Netlify</span>.</p>
          
          <div className="bg-[#FAF9F7] border border-gray-200 rounded-xl p-1 mb-8 flex items-center shadow-inner">
             <div className="px-4 py-2 flex-1 overflow-hidden">
               <p className="text-sm font-mono text-gray-700 truncate">{url}</p>
             </div>
             <button 
               onClick={handleCopy}
               className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#9D50BB] hover:border-purple-200 transition-colors shadow-sm focus:outline-none"
               title="Copy URL"
             >
               {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
             </button>
          </div>

          <div className="space-y-3">
             <a 
               href={url} 
               target="_blank" 
               rel="noreferrer"
               className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/30"
             >
               <ExternalLink className="w-5 h-5" /> Visit Live Site
             </a>
             <Link 
               to="/dashboard"
               className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
             >
               <ArrowLeft className="w-5 h-5" /> Back to Dashboard
             </Link>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            Close Dialog
          </button>
        </div>
        
        {/* Footer Note */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 relative z-10 text-xs text-gray-500 font-medium">
          Changes in the editor can be redeployed anytime via the Publish button.
        </div>
      </div>
    </div>
  );
}
