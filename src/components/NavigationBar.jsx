import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on landing page, dashboard, AND builder (builder has its own header)
  if (['/', '/landing', '/dashboard', '/builder'].includes(location.pathname)) {
    return null;
  }

  // Common handler to go to dashboard
  const goDashboard = () => navigate('/');

  return (
    <div className="w-full shrink-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 z-50">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="w-px h-5 bg-gray-200" />

      <button
        onClick={goDashboard}
        aria-label="Go home"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 transition-all"
      >
        <Home className="w-4 h-4" />
        Dashboard
      </button>
    </div>
  );
}

