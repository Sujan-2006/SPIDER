import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Rocket, TerminalSquare } from 'lucide-react';

export default function PreviewPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 w-full bg-slate-50">
      <div className="text-center max-w-2xl bg-white p-12 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full">
            <Globe className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-800">
          Deploy Your Application
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed text-lg">
          Your project configuration is ready to merge into the deployment pipeline.
          Review your infrastructure settings before generating the final production bundle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <TerminalSquare className="w-4 h-4 text-emerald-500" />
              Build Output
            </h3>
            <p className="text-sm text-slate-500">Optimized production bundle is ready for edge distribution.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Custom Domain
            </h3>
            <p className="text-sm text-slate-500">Not configured. Fallback generic URL will be assigned automatically.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transform text-white text-lg font-semibold py-3 px-8 rounded-xl transition-all shadow-indigo-600/20 shadow-md"
            onClick={() => alert("Deployment pipeline simulation initializing...")}
          >
            <Rocket className="w-5 h-5" />
            Publish to Edge
          </button>
          <button 
            onClick={() => navigate('/builder')}
            className="text-slate-500 hover:text-slate-800 font-medium py-3 px-8 transition-colors"
          >
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
}
