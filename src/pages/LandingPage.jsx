import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Zap, Code2, MousePointer2, Globe, Smartphone, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';


const FEATURES = [
  {
    icon: MousePointer2,
    color: 'bg-violet-100 text-violet-600',
    title: 'Drag & Drop Builder',
    desc: 'Visually compose pages by dragging components onto the canvas. No code required — ever.',
  },
  {
    icon: Zap,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'One-Click Publish',
    desc: 'Deploy instantly to a global CDN. Your site goes live in seconds, not hours.',
  },
  {
    icon: Smartphone,
    color: 'bg-sky-100 text-sky-600',
    title: 'Responsive by Default',
    desc: 'Every component adapts beautifully across desktop, tablet, and mobile automatically.',
  },
  {
    icon: Globe,
    color: 'bg-amber-100 text-amber-600',
    title: 'Custom Domain',
    desc: 'Connect your own domain and control your brand from dashboard to browser bar.',
  },
  {
    icon: Layers,
    color: 'bg-rose-100 text-rose-600',
    title: 'Rich Block Library',
    desc: 'Choose from dozens of pre-built blocks — hero sections, grids, forms, navbars, and more.',
  },
  {
    icon: Code2,
    color: 'bg-fuchsia-100 text-fuchsia-600',
    title: 'Export Clean Code',
    desc: 'Download production-ready HTML & CSS at any time. You always own your output.',
  },
];

const TEMPLATES = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    badge: 'Personal',
    badgeColor: 'bg-violet-100 text-violet-700',
    accentColor: 'from-violet-500 to-purple-600',
    desc: 'A clean, minimal personal portfolio with a hero, about, skills with progress bars, featured project cards, and a contact form.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    sections: [
      'Sticky navigation bar with logo',
      'Hero with profile photo, role & CTA buttons',
      'About section with bio and stats',
      'Skills section with animated progress bars',
      'Projects grid with image cards',
      'Contact form + email & social links',
    ],
    color: 'violet',
  },
  {
    id: 'landing',
    title: 'Landing Page',
    badge: 'Marketing',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    accentColor: 'from-emerald-500 to-teal-600',
    desc: 'A high-converting SaaS landing page with a gradient hero, feature grid, dark testimonials, 3-tier pricing, and a final CTA.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    sections: [
      'Sticky nav with pill CTA button',
      'Hero with gradient headline & social proof',
      'Brand logo trust strip',
      '4-card feature grid',
      'Dark testimonials with star ratings',
      '3-tier pricing cards (Starter / Pro / Enterprise)',
      'Full-width conversion CTA banner',
      'Multi-column dark footer',
    ],
    color: 'emerald',
  },
  {
    id: 'business',
    title: 'Business Website',
    badge: 'Corporate',
    badgeColor: 'bg-sky-100 text-sky-700',
    accentColor: 'from-sky-500 to-blue-600',
    desc: 'A polished, corporate multi-section website for agencies, consultancies, and professional service firms.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    sections: [
      'Sticky navbar with brand logo & CTA',
      'Split hero with office photo + stat cards',
      'Dark stats bar (clients, years, team, satisfaction)',
      '6-card services grid',
      'About section with team photo & checkmarks',
      'Dark testimonials with avatar photos',
      'Contact section: address, phone, email & form',
      '4-column dark footer with social links',
    ],
    color: 'sky',
  },
];

// ── Template Preview Modal ────────────────────────────────────────
function TemplatePreviewModal({ template, onConfirm, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.2s ease' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close preview"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Preview image */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl bg-gray-900 flex-shrink-0">
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-full object-cover opacity-70"
          />
          {/* Browser chrome overlay */}
          <div className="absolute inset-x-6 top-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 bg-white/20 rounded-md px-2 py-0.5 text-white/60 text-xs text-center">spider.build/{template.id}</div>
            </div>
          </div>
          {/* Badge */}
          <span className={`absolute bottom-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${template.badgeColor}`}>
            {template.badge}
          </span>
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{template.title} Template</h2>
            <p className="text-gray-500 leading-relaxed">{template.desc}</p>
          </div>

          {/* Sections list */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Included</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {template.sections.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-200"
            >
              Use This Template <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);


  return (
    <div className="min-h-screen bg-white font-sans overflow-auto">

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600" />
          <span className="font-bold text-xl tracking-tight text-gray-900">SPIDER</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-indigo-600 transition-all shadow-md"
          >
            Start for free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
        {/* Gradient blob */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-indigo-100 via-violet-100 to-pink-100 rounded-full blur-3xl opacity-60" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          No-Code Website Builder
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] max-w-4xl">
          Build websites visually{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
            with drag-and-drop
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed">
          Design, customize, and publish stunning websites — no coding needed.
          Drag blocks, style components, and go live in minutes.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transform transition-all"
          >
            Start Building <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-lg hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
          >
            Choose Template
          </button>
        </div>

        {/* Mini trust row */}
        <p className="mt-8 text-sm text-gray-400">
          Free to start · No credit card · Export anytime
        </p>
      </section>

      {/* ── MOCK BROWSER PREVIEW ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
              spider.build/my-website
            </div>
          </div>
          {/* Canvas placeholder */}
          <div className="bg-[radial-gradient(rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:24px_24px] h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                <MousePointer2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-400 font-medium">Drag your first block here…</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Everything you need to build fast</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">A complete toolkit for non-technical creators and professionals alike.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section id="templates" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Ready-made Templates
            </span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Start from a template</h2>
            <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
              Pick one, customise it in the visual builder, and publish — in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/40 transition-all duration-300 flex flex-col"
              >
                {/* Preview image */}
                <div className="relative h-48 overflow-hidden bg-gray-700">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Badge overlay */}
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">{t.title} Template</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{t.desc}</p>

                  <button
                    onClick={() => setPreviewTemplate(t)}
                    className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
                  >
                    Preview Template <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW MODAL ── */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onConfirm={() => {
            setIsTransitioning(true);
            try {
              localStorage.setItem('selectedTemplate', previewTemplate.id);
            } catch (_) {}
            
            // Give the user a moment to see the loading state for a smooth feel
            setTimeout(() => {
              navigate(`/builder?template=${previewTemplate.id}`);
            }, 600);
          }}
          onClose={() => setPreviewTemplate(null)}
        />
      )}

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Ready to build your website?</h2>
        <p className="text-indigo-200 text-lg mb-10 max-w-lg mx-auto">
          Join thousands of creators building beautiful websites without a single line of code.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl"
        >
          Start Building Free <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* ── TRANSITION OVERLAY ── */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center animate-pulse">
           <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 to-violet-600 animate-spin mb-6" />
           <h2 className="text-xl font-bold text-gray-900">Preparing your workspace...</h2>
           <p className="text-gray-500 mt-2">Setting up the visual builder</p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-8">
        <p>© 2025 SPIDER · No-Code Website Builder · Built with ❤️</p>
      </footer>
    </div>
  );
}
