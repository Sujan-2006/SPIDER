import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Zap, Code2, ArrowRight, LayoutTemplate } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans overflow-auto custom-scrollbar">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D50BB] to-indigo-500"></div>
          <span className="font-bold text-2xl tracking-tight text-[#111] font-serif">SPIDER</span>
        </div>
        <div className="hidden md:flex gap-8 text-[15px] font-medium text-gray-600">
          <a href="#" className="hover:text-[#9D50BB] transition-colors">Showcase</a>
          <a href="#" className="hover:text-[#9D50BB] transition-colors">Resources</a>
          <a href="#" className="hover:text-[#9D50BB] transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/signup" className="text-[15px] font-medium text-gray-700 hover:text-black">Login</Link>
          <Link to="/signup" className="px-5 py-2.5 rounded-full bg-[#111] text-white text-[15px] font-medium hover:bg-[#9D50BB] transition-colors shadow-lg shadow-gray-200">
            Start Creating
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-24 pb-32 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#9D50BB]/10 to-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <h1 className="text-6xl md:text-8xl font-serif text-[#111] tracking-tight mb-8">
          Weave your <span className="italic text-[#9D50BB]">web.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Drag. Drop. Deploy. The high-end editorial builder for creators who demand pixel-perfect control without writing a single line of code.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#9D50BB] to-[#6E48AA] text-white font-medium hover:opacity-90 transition-opacity shadow-xl shadow-purple-500/20 text-lg">
            Start Building <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#templates" className="px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-lg">
            See Templates
          </a>
        </div>
        
        {/* Floating Digital Atelier Widget */}
        <div className="mt-24 relative max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 w-full h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="w-full h-full pt-12 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]">
              {/* Minimalist graphic of pencil/atelier */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                 <LayoutTemplate className="w-16 h-16 text-[#9D50BB] mx-auto mb-4 opacity-50" />
                 <p className="font-serif italic text-gray-400 text-xl">The Digital Atelier</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="bg-white py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAF9F7] border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-[#9D50BB]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111] mb-3">Tactile Precision</h3>
              <p className="text-gray-600 leading-relaxed">Drag & Drop components onto a free-form canvas. Align to grids, visually adjust padding, and craft perfection.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#FAF9F7] border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111] mb-3">One-Click Deploy</h3>
              <p className="text-gray-600 leading-relaxed">Push instantly to a global edge network. Lightspeed loading times straight out of the box with zero config.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF9F7] border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111] mb-3">No Code Ever</h3>
              <p className="text-gray-600 leading-relaxed">Pure visual expression. Leave the semicolons behind without sacrificing the power of raw CSS manipulation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-32 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-16">Start from a template</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="group cursor-pointer">
              <div className="w-full h-64 bg-gray-800 rounded-xl mb-4 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80" alt="Portfolio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
              </div>
              <h4 className="text-xl font-serif mb-1">Portfolio</h4>
              <p className="text-gray-400 text-sm">Editorial & Creative</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-full h-64 bg-gray-800 rounded-xl mb-4 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&q=80" alt="Books & Journals" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
              </div>
              <h4 className="text-xl font-serif mb-1">Books & Journals</h4>
              <p className="text-gray-400 text-sm">Long-form publishing</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-full h-64 bg-gray-800 rounded-xl mb-4 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1545241047-6083a36db15e?w=600&q=80" alt="Agency Landing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
              </div>
              <h4 className="text-xl font-serif mb-1">Agency</h4>
              <p className="text-gray-400 text-sm">Conversion-optimized landing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
