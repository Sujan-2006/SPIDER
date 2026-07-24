import React, { useState } from 'react';
import { Rocket, CheckCircle2, Copy, ExternalLink, Download, Globe, X, AlertTriangle, Loader2 } from 'lucide-react';

export default function DeployModal({ 
  isOpen, 
  onClose, 
  url, 
  onDownloadZip, 
  onDeployNetlify, 
  deployStage = 'idle', 
  deployError = '' 
}) {
  if (!isOpen) return null;
  const [subdomain, setSubdomain] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartDeploy = () => {
    onDeployNetlify(subdomain);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl overflow-hidden border border-gray-150 flex flex-col relative text-center">
        
        {/* Decorative glows */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-400/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5 text-left">
            <Rocket className="w-5 h-5 text-[#9D50BB]" />
            <h3 className="font-bold text-gray-900 font-serif">Publish Project</h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Idle Config Mode */}
        {deployStage === 'idle' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-1 font-bold">Go Live Instantly</h2>
              <p className="text-sm text-gray-500 font-medium">Configure a custom Netlify address or export your bundle.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-left text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Netlify Subdomain</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#FAF9F7] border border-gray-200 rounded-xl p-1 shadow-inner focus-within:border-[#9D50BB]">
                  <input 
                    type="text" 
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="my-cool-site"
                    className="flex-1 px-3 py-2 bg-transparent outline-none text-sm font-semibold text-gray-800"
                  />
                  <span className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-500 shadow-sm">
                    .netlify.app
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 block text-left">
                  Leave blank to generate a random URL name. Special characters are ignored.
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  onClick={handleStartDeploy}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
                >
                  <Globe className="w-4 h-4" /> Publish to Netlify Edge CDN
                </button>

                <button 
                  onClick={onDownloadZip}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-purple-200 text-[#9D50BB] font-semibold text-sm hover:bg-purple-50 transition-colors bg-white"
                >
                  <Download className="w-4 h-4" /> Download Standalone HTML/CSS ZIP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Loading Overlay */}
        {(deployStage === 'bundling' || deployStage === 'uploading' || deployStage === 'configuring') && (
          <div className="p-4 sm:p-8 space-y-8">
            <div className="w-16 h-16 mx-auto bg-purple-50 text-[#9D50BB] rounded-full flex items-center justify-center border border-purple-100 shadow-inner">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="max-w-xs mx-auto text-center">
              <h4 className="font-bold text-gray-900 text-lg mb-1">Deploying Workspace</h4>
              <p className="text-xs text-gray-500">Do not close this panel, publishing your changes...</p>
            </div>

            <div className="max-w-sm mx-auto space-y-4 border border-gray-100 bg-gray-50/50 p-5 rounded-2xl text-left">
              
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  deployStage === 'bundling' ? 'bg-purple-100 text-[#9D50BB]' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {deployStage === 'bundling' ? '1' : '✓'}
                </div>
                <span className={`text-sm font-semibold ${deployStage === 'bundling' ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                  Bundling visual styles & components
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  deployStage === 'bundling' 
                    ? 'bg-gray-100 text-gray-400' 
                    : deployStage === 'uploading' 
                      ? 'bg-purple-100 text-[#9D50BB]' 
                      : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {deployStage === 'bundling' ? '2' : deployStage === 'uploading' ? '2' : '✓'}
                </div>
                <span className={`text-sm font-semibold ${deployStage === 'uploading' ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                  Transferring bundle to CDN nodes
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  deployStage === 'configuring' ? 'bg-purple-100 text-[#9D50BB]' : 'bg-gray-100 text-gray-400'
                }`}>
                  {deployStage === 'configuring' ? '3' : '3'}
                </div>
                <span className={`text-sm font-semibold ${deployStage === 'configuring' ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                  Configuring SSL domain names
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Success Screen */}
        {deployStage === 'success' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner text-emerald-600">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-1 font-bold">Your site is Live!</h2>
              <p className="text-sm text-gray-500 font-medium">Your platform changes are compiled and active worldwide.</p>
            </div>

            {/* Live URL */}
            <div className="bg-[#FAF9F7] border border-gray-200 rounded-xl p-1 flex items-center shadow-inner max-w-sm mx-auto">
               <div className="px-4 py-2 flex-1 overflow-hidden text-left">
                 <p className="text-xs font-mono text-gray-700 truncate">{url}</p>
               </div>
               <button 
                 onClick={handleCopy}
                 className="p-2.5 bg-white border border-gray-250 rounded-lg text-gray-600 hover:text-[#9D50BB] hover:border-purple-200 transition-colors shadow-sm"
               >
                 {copied ? <span className="text-xs font-bold text-emerald-600">Copied!</span> : <Copy className="w-4 h-4" />}
               </button>
            </div>

            {/* QR Code and Mobile View */}
            <div className="pt-2 flex flex-col items-center justify-center gap-4">
              <div className="bg-white p-3 border border-gray-150 rounded-2xl shadow-sm">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(url || '')}`} 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Scan QR code to test your responsive design on mobile instantly.</p>
            </div>

            <div className="pt-4">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md"
              >
                Open Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Error Screen */}
        {deployStage === 'error' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-serif text-red-600 mb-1 font-bold">Deployment Failed</h2>
              <p className="text-sm text-gray-500 font-medium">Netlify returned an error during the creation/upload process.</p>
            </div>

            <div className="p-4 bg-red-50/50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl text-left leading-relaxed">
              {deployError}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3.5 border border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Close Dialog
              </button>
              <button 
                onClick={handleStartDeploy}
                className="flex-1 py-3.5 bg-[#111] hover:bg-gray-800 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
