import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate auth & fetch
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Pane - Brand Identity */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#E6E6FA] via-[#F4E1FA] to-[#FFDAB9] flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract Web Wireframe Background */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] border-[1px] border-purple-300/30 rounded-full flex items-center justify-center">
            <div className="w-[450px] h-[450px] border-[1px] border-purple-300/40 rounded-full flex items-center justify-center">
                <div className="w-[300px] h-[300px] border-[1px] border-purple-300/50 rounded-full"></div>
            </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500 shadow-xl"></div>
          <span className="font-bold text-2xl tracking-tight text-[#111] font-serif">SPIDER</span>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-5xl font-serif text-[#111] leading-tight mb-8">
            Your next website <span className="italic text-[#9D50BB]">starts here.</span>
          </h2>
          <div className="space-y-4 font-medium text-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-[#9D50BB]">✦</span> Free to start
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#9D50BB]">✦</span> No credit card
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#9D50BB]">✦</span> Deploy instantly
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm font-medium text-gray-500">
          © 2026 Spider Platform.
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FAF9F7]">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-serif text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 mb-8">Join the digital atelier of tomorrow.</p>

          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm mb-6 text-sm font-medium text-gray-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
            Continue with Google
          </button>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or use email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required placeholder="Elena Weaver" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB] transition-all bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input type="email" required placeholder="elena@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB] transition-all bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB] transition-all bg-white" />
            </div>
            
            <div className="flex items-start pt-2">
              <input id="terms" type="checkbox" required className="mt-1 w-4 h-4 text-[#9D50BB] rounded border-gray-300 focus:ring-[#9D50BB]" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="font-medium text-[#9D50BB] hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-[#9D50BB] hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#9D50BB] to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account? <Link to="/signup" className="font-medium text-[#111] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
