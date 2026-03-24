import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LayoutDashboard, LayoutTemplate, Settings, HelpCircle, LogOut, Plus, Trash2, Edit3, Globe, FileEdit, Layers } from 'lucide-react';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signup');
    } else {
      setUser(session.user);
      fetchProjects();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signup');
  };

  const fetchProjects = async () => {
    setLoading(true);
    
    // Get the current user ID
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (userId) {
      const { data } = await supabase
        .from('projects')
        .select('id, name, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
        
      if (data) setProjects(data);
    }
    setLoading(false);
  };

  const handleRename = async (id, currentName) => {
    const newName = window.prompt("Enter new project name:", currentName);
    if (newName && newName.trim() !== '' && newName !== currentName) {
      const { error } = await supabase.from('projects').update({ name: newName.trim() }).eq('id', id);
      if (!error) fetchProjects();
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  return (
    <div className="flex h-screen w-full bg-[#FAF9F7] font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 fixed left-0 top-0 h-[100dvh] bg-white border-r border-gray-100 hidden md:flex flex-col z-50">
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-h-0 pb-32">
          <div className="p-6 pb-2 mb-6 flex items-center gap-3 border-b border-gray-100/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500 shadow-lg"></div>
            <span className="font-bold text-2xl tracking-tight text-[#111] font-serif">SPIDER</span>
          </div>
          <nav className="px-4 space-y-2 pb-6">
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
        
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-100 bg-gray-50/50 z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm border border-white shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold uppercase">
               {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || '?'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 leading-tight truncate">{user?.user_metadata?.full_name || 'Creator'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition-colors bg-white px-4 py-2.5 rounded-lg border border-gray-200 hover:border-rose-200 hover:bg-rose-50 shadow-sm w-full justify-center">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10 custom-scrollbar relative md:ml-64">
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
             <p className="text-4xl font-serif text-gray-900">{projects.length}</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Published</h3>
               <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><Globe className="w-5 h-5"/></div>
             </div>
             <p className="text-4xl font-serif text-gray-900">
               {projects.filter(p => localStorage.getItem(`netlify_site_${p.id}`)).length}
             </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">In Draft</h3>
               <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500"><FileEdit className="w-5 h-5"/></div>
             </div>
             <p className="text-4xl font-serif text-gray-900">
               {projects.filter(p => !localStorage.getItem(`netlify_site_${p.id}`)).length}
             </p>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-14">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && (
              <div className="col-span-full py-10 text-center text-gray-500 font-medium">
                Loading projects from Supabase...
              </div>
            )}
            {!loading && projects.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-500 font-medium border border-dashed border-gray-200 rounded-2xl">
                No projects found. Create your first project below!
              </div>
            )}

            {projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group flex flex-col">
                <Link to={`/builder/${project.id}`} className="block h-52 relative overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-amber-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/50 shadow-sm flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Saved</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-0"></div>
                  <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" alt="Project Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </Link>
                <div className="p-6 flex flex-col flex-1 justify-between bg-white z-10">
                  <div>
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <Link to={`/builder/${project.id}`} className="min-w-0">
                        <h3 className="text-xl font-serif text-gray-900 group-hover:text-[#9D50BB] transition-colors truncate">
                          {project.name || 'Untitled Project'}
                        </h3>
                      </Link>
                      <button onClick={(e) => { e.preventDefault(); handleRename(project.id, project.name || 'Untitled Project'); }} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors shrink-0" title="Rename Project">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-6">Last edited: {new Date(project.updated_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                     <Link to={`/builder/${project.id}`} className="text-sm font-bold text-[#111] hover:text-[#9D50BB] flex items-center gap-2 transition-colors">
                       <Edit3 className="w-4 h-4" /> Open Editor
                     </Link>
                     <button onClick={() => deleteProject(project.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Project">
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
