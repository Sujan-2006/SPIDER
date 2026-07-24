import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Database, CreditCard, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getNetlifyToken } from '../services/deployService';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [preferences, setPreferences] = useState({
    autoSave: true,
    aiAssist: true,
    marketingEmails: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (isSupabaseConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/signup');
          return;
        }
        setUser(session.user);
        setFullName(session.user.user_metadata?.full_name || '');
        setEmail(session.user.email || '');
      } else {
        const demoUser = JSON.parse(localStorage.getItem('spider_demo_user') || '{"email":"demo@spider.app","full_name":"Creator"}');
        setUser({ email: demoUser.email, user_metadata: { full_name: demoUser.full_name } });
        setFullName(demoUser.full_name);
        setEmail(demoUser.email);
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('spider_demo_user');
    navigate('/signup');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);

    if (isSupabaseConfigured && user) {
      await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
    } else {
      localStorage.setItem('spider_demo_user', JSON.stringify({ email, full_name: fullName }));
    }
  };



  return (
    <div className="flex min-h-screen w-full bg-[#FAF9F7] font-sans">
      <Sidebar user={user} handleSignOut={handleSignOut} activePage="settings" />

      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10 pt-18 md:pt-10 custom-scrollbar relative md:ml-64">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 font-serif mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8 text-[#9D50BB]" /> Settings
            </h1>
            <p className="text-gray-500 font-medium">Configure your digital atelier and workspace properties.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Tabs Sidebar */}
            <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2 border-b md:border-b-0 md:border-r border-gray-200/60 pb-4 md:pb-0 md:pr-6 shrink-0 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'profile' 
                    ? 'bg-white text-[#9D50BB] shadow-sm border border-purple-50 font-bold' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <User className="w-4 h-4" /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('billing')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'billing' 
                    ? 'bg-white text-[#9D50BB] shadow-sm border border-purple-50 font-bold' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Billing & Plan
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'preferences' 
                    ? 'bg-white text-[#9D50BB] shadow-sm border border-purple-50 font-bold' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <Sliders className="w-4 h-4" /> Preferences
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 bg-white border border-gray-150 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Profile Settings</h3>
                  
                  {isSaved && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Changes saved successfully!
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 shrink-0 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-[#9D50BB] text-2xl font-bold font-serif uppercase">
                      {fullName.charAt(0) || email.charAt(0) || '?'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Personal Avatar</h4>
                      <p className="text-xs text-gray-500">Avatar generated automatically based on your initial profile name.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9D50BB] focus:ring-1 focus:ring-[#9D50BB] font-medium"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        className="w-full px-4 py-3 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl outline-none font-medium cursor-not-allowed"
                        disabled
                      />
                      <span className="text-xs text-gray-400 mt-1 block">Your log-in email address cannot be changed.</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111] hover:bg-gray-800 text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    Save Profile Changes
                  </button>
                </form>
              )}

              {/* Billing / Plan Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Billing & Platform Tier</h3>
                    <p className="text-gray-500 text-sm">Review your active platform subscription tier limits.</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#9D50BB] to-[#6E48AA] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide">ACTIVE PLAN</span>
                    <h4 className="text-3xl font-serif font-black mt-3 mb-2">Free Atelier</h4>
                    <p className="text-xs text-purple-200">The perfect sandboxed platform environment to draft your visual ideas.</p>
                    
                    <div className="mt-8 border-t border-white/20 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
                      <div>
                        <p className="text-xs text-purple-200">Projects limit</p>
                        <p className="text-lg font-bold">1 of 5 projects used</p>
                      </div>
                      <span className="text-xs font-bold bg-white text-purple-950 px-4 py-2 rounded-lg cursor-default">Free Tier</span>
                    </div>
                  </div>

                  <div className="border border-dashed border-purple-200 rounded-2xl p-6 bg-purple-50/20">
                    <h4 className="font-bold text-gray-900 mb-2">Need unlimited access?</h4>
                    <p className="text-sm text-gray-600 mb-4">Upgrade to the **Pro Atelier** tier for unlimited projects, custom domains, premium templates, and fully integrated AI assistant generation.</p>
                    <button className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#9D50BB] to-indigo-600 text-white font-bold text-sm shadow-md shadow-purple-500/10 hover:opacity-95 transition-opacity">
                      Upgrade for $15/mo
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">User Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.autoSave}
                        onChange={(e) => setPreferences({ ...preferences, autoSave: e.target.checked })}
                        className="mt-1 w-4 h-4 shrink-0 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Automated Saving</h4>
                        <p className="text-xs text-gray-500">Enable constant updates back to Supabase/LocalStorage as you construct canvas sections.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.aiAssist}
                        onChange={(e) => setPreferences({ ...preferences, aiAssist: e.target.checked })}
                        className="mt-1 w-4 h-4 shrink-0 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">AI Assist Generator</h4>
                        <p className="text-xs text-gray-500">Allow the GPT/Claude-powered code generator panel inside the visual builder workspace.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketingEmails}
                        onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                        className="mt-1 w-4 h-4 shrink-0 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Product Newsletters</h4>
                        <p className="text-xs text-gray-500">Opt-in to product updates, release announcements, and premium templates design news.</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}



            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
