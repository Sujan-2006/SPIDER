import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LayoutTemplate, Settings, HelpCircle, LogOut, Plus, Trash2, Edit3, Globe, FileEdit, Layers } from 'lucide-react';

export default function Dashboard() {
  const projects = [
    { id: '1', name: 'Minimalist Portfolio', status: 'published', lastEdited: '2 hours ago', preview: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80' },
    { id: '2', name: 'Artisan Boutique', status: 'published', lastEdited: '1 day ago', preview: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&q=80' },
    { id: '3', name: 'Nexus SaaS', status: 'draft', lastEdited: 'Just now', preview: 'https://images.unsplash.com/photo-1545241047-6083a36db15e?w=600&q=80' }
  ];

  return (
    <div className="flex h-screen w-full bg-[#FAF9F7] font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-100 flex-col justify-between hidden md:flex z-10">
        <div>
          <div className="p-6 pb-2 mb-6 flex items-center gap-3 border-b border-gray-100/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500 shadow-lg"></div>
            <span className="font-bold text-2xl tracking-tight text-[#111] font-serif">SPIDER</span>
          </div>
          <nav className="px-4 space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#FAF9F7] text-[#9D50BB] rounded-xl font-semibold transition-colors shadow-sm border border-purple-50">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <a href="#templates" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
              <LayoutTemplate className="w-5 h-5" /> Templates
            </a>
            <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </a>
            <a href="#help" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
              <HelpCircle className="w-5 h-5" /> Help
            </a>
          </nav>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm border border-white">
               <img src="https://i.pravatar.cc/150?u=elena" alt="Elena Weaver" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Elena Weaver</p>
              <p className="text-xs text-gray-500">Creative Director</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition-colors bg-white px-4 py-2.5 rounded-lg border border-gray-200 hover:border-rose-200 hover:bg-rose-50 shadow-sm w-full justify-center">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10 custom-scrollbar relative">
        {/* Background gradient blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Header Options */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-serif text-[#111] mb-2 tracking-tight">The Atelier</h1>
            <p className="text-gray-500 font-medium">Manage your digital presence</p>
          </div>
          <Link to="/builder" className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#111] to-gray-800 text-white font-medium hover:opacity-90 transition-opacity shadow-xl shadow-gray-200 hover:-translate-y-0.5 transform duration-300">
            <Plus className="w-5 h-5" /> New Project
          </Link>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Projects</h3>
               <div className="p-2.5 bg-purple-50 rounded-xl text-[#9D50BB]"><Layers className="w-5 h-5"/></div>
             </div>
             <p className="text-4xl font-serif text-gray-900">3</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Published</h3>
               <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><Globe className="w-5 h-5"/></div>
             </div>
             <p className="text-4xl font-serif text-gray-900">2</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">In Draft</h3>
               <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500"><FileEdit className="w-5 h-5"/></div>
             </div>
             <p className="text-4xl font-serif text-gray-900">1</p>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-14">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group flex flex-col">
                <Link to={`/builder/${project.id}`} className="block h-52 relative overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {project.status === 'published' ? (
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/50 shadow-sm flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Published</span>
                    ) : (
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-amber-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/50 shadow-sm flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Draft</span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-0"></div>
                  <img src={project.preview} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </Link>
                <div className="p-6 flex flex-col flex-1 justify-between bg-white z-10">
                  <div>
                    <Link to={`/builder/${project.id}`}>
                      <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-[#9D50BB] transition-colors">{project.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-500 font-medium mb-6">Last edited: {project.lastEdited}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                     <Link to={`/builder/${project.id}`} className="text-sm font-bold text-[#111] hover:text-[#9D50BB] flex items-center gap-2 transition-colors">
                       <Edit3 className="w-4 h-4" /> Open Editor
                     </Link>
                     <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Project">
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blank Start Section */}
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Start from scratch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Portfolio', 'Landing Page', 'Business'].map((type, idx) => (
              <Link to="/builder" key={idx} className="flex items-center gap-5 p-6 bg-white border border-gray-200 border-dashed rounded-2xl hover:border-[#9D50BB] hover:bg-purple-50/30 transition-all duration-300 group cursor-pointer text-left hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5">
                 <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:border-purple-200 transition-colors shadow-sm">
                   <LayoutTemplate className="w-6 h-6 text-gray-400 group-hover:text-[#9D50BB] transition-colors" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-lg mb-1">{type}</h4>
                   <p className="text-xs text-gray-500 font-medium tracking-wide">Blank structure</p>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
