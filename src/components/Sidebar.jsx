import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LayoutTemplate, Settings, HelpCircle, LogOut, Menu, X } from 'lucide-react';

export default function Sidebar({ user, handleSignOut, activePage = 'dashboard' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
    { to: '/templates', label: 'Templates', icon: LayoutTemplate, key: 'templates' },
    { to: '/settings', label: 'Settings', icon: Settings, key: 'settings' },
    { to: '/help', label: 'Help', icon: HelpCircle, key: 'help' },
  ];

  const NavContent = () => (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-h-0 pb-24 md:pb-32">
        <Link to="/" className="p-6 pb-2 mb-6 flex items-center gap-3 border-b border-gray-100/50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500 shadow-lg shrink-0"></div>
          <span className="font-bold text-2xl tracking-tight text-[#111] font-serif">SPIDER</span>
        </Link>
        <nav className="px-4 space-y-2 pb-6">
          {navLinks.map(({ to, label, icon: Icon, key }) => (
            <Link 
              key={key}
              to={to} 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors active:bg-gray-100 ${
                activePage === key 
                  ? 'bg-[#FAF9F7] text-[#9D50BB] shadow-sm border border-purple-50 font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" /> {label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 md:p-5 border-t border-gray-100 bg-gray-50/50 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-white shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold uppercase">
             {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || '?'}
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate">{user?.user_metadata?.full_name || 'Creator'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition-colors bg-white px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 hover:border-rose-200 hover:bg-rose-50 shadow-sm w-full justify-center active:bg-rose-100">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500 shadow-md shrink-0"></div>
          <span className="font-bold text-lg tracking-tight text-[#111] font-serif">SPIDER</span>
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`md:hidden fixed left-0 top-0 h-[100dvh] w-72 max-w-[80vw] bg-white border-r border-gray-100 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-[100dvh] bg-white border-r border-gray-100 hidden md:flex flex-col z-50">
        <NavContent />
      </aside>
    </>
  );
}
