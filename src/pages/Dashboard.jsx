import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getProjects, saveProject, deleteProject as removeProject } from '../services/projectService';
import { Plus, Trash2, Edit3, Globe, FileEdit, Layers } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signup');
        return;
      }
      setUser(session.user);
    } else {
      const demoUser = JSON.parse(localStorage.getItem('spider_demo_user') || '{"email":"demo@spider.app","full_name":"Creator"}');
      setUser({ email: demoUser.email, user_metadata: { full_name: demoUser.full_name } });
    }
    fetchProjects();
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('spider_demo_user');
    navigate('/signup');
  };

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data || []);
    
    // Fetch deployments from local storage (or supabase if implemented there)
    const localDeploys = JSON.parse(localStorage.getItem('spider_local_deployments') || '[]');
    setDeployments(localDeploys);
    
    setLoading(false);
  };

  const handleRename = async (id, currentName) => {
    const newName = window.prompt("Enter new project name:", currentName);
    if (newName && newName.trim() !== '' && newName !== currentName) {
      const proj = projects.find(p => p.id === id);
      await saveProject({ id, name: newName.trim(), data: proj?.data || {} });
      fetchProjects();
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await removeProject(id);
    fetchProjects();
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAF9F7] font-sans">
      <Sidebar user={user} handleSignOut={handleSignOut} activePage="dashboard" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10 pt-18 md:pt-10 custom-scrollbar relative md:ml-64">
        {/* Background gradient blur */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-[500px] sm:h-[500px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Header Options */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mb-6 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#111] mb-2 tracking-tight">The Atelier</h1>
            <p className="text-gray-500 font-medium">Manage your digital presence</p>
          </div>
          <Link to="/builder" className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#111] to-gray-800 text-white font-medium hover:opacity-90 transition-opacity shadow-xl shadow-gray-200 hover:-translate-y-0.5 transform duration-300 w-full sm:w-auto justify-center whitespace-nowrap">
            <Plus className="w-5 h-5" /> New Project
          </Link>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Projects</h3>
               <div className="p-2.5 bg-purple-50 rounded-xl text-[#9D50BB]"><Layers className="w-5 h-5"/></div>
             </div>
             <p className="text-3xl sm:text-4xl font-serif text-gray-900">{projects.length}</p>
          </div>
          <div className="p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Published</h3>
               <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><Globe className="w-5 h-5"/></div>
             </div>
             <p className="text-3xl sm:text-4xl font-serif text-gray-900">
               {projects.filter(p => localStorage.getItem(`netlify_site_${p.id}`)).length}
             </p>
          </div>
          <div className="p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">In Draft</h3>
               <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500"><FileEdit className="w-5 h-5"/></div>
             </div>
             <p className="text-3xl sm:text-4xl font-serif text-gray-900">
               {projects.filter(p => !localStorage.getItem(`netlify_site_${p.id}`)).length}
             </p>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-14">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                <Link to={`/builder/${project.id}`} className="block h-40 sm:h-52 relative overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {deployments.find(d => d.project_id === project.id) ? (
                        <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1.5">
                          <Globe className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-amber-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/50 shadow-sm flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Draft
                        </span>
                      )}
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
                    <p className="text-xs text-gray-500 font-medium mb-4">Last edited: {new Date(project.updated_at).toLocaleString()}</p>
                    
                    {/* Live URL Link */}
                    {deployments.find(d => d.project_id === project.id) && (
                      <a 
                        href={deployments.find(d => d.project_id === project.id).live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded transition-colors mb-4 truncate max-w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-3 h-3 shrink-0" /> {deployments.find(d => d.project_id === project.id).live_url.replace('https://', '')}
                      </a>
                    )}
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
        <div className="pt-4">
          <Link to="/builder" className="flex items-center gap-5 p-6 bg-white border border-gray-200 border-dashed rounded-2xl hover:border-[#9D50BB] hover:bg-purple-50/30 transition-all duration-300 group cursor-pointer text-left hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 w-full max-w-sm">
             <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:border-purple-200 transition-colors shadow-sm">
               <div className="w-6 h-6 border-2 border-gray-400 border-dashed rounded group-hover:border-[#9D50BB] transition-colors" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 text-lg mb-1">Blank Canvas</h4>
               <p className="text-xs text-gray-500 font-medium tracking-wide">Start from scratch</p>
             </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
