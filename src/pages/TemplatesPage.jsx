import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    badge: 'Commerce',
    badgeColor: 'bg-rose-100 text-rose-700',
    accentColor: 'from-rose-500 to-pink-600',
    desc: 'A modern online storefront with a hero layout, categorized grid, and featured products.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    sections: [
      'Minimalist sticky nav with shopping cart',
      'Summer collection banner',
      'Product category explorer cards',
      'Best sellers product grid',
      'Join newsletter subscribe box',
    ],
    color: 'rose',
  },
  {
    id: 'agency',
    title: 'Creative Agency',
    badge: 'Atelier',
    badgeColor: 'bg-purple-100 text-purple-700',
    accentColor: 'from-purple-500 to-indigo-600',
    desc: 'A dark, futuristic agency portfolio designed to present immersive Web3/creative projects.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    sections: [
      'Minimal typography-focused layout',
      'Immersive glow header',
      'Spectrum service grid',
      'Interactive project case studies',
      'Premium dark brand footer',
    ],
    color: 'purple',
  },
  {
    id: 'restaurant',
    title: 'Restaurant & Bistro',
    badge: 'Food & Drink',
    badgeColor: 'bg-amber-100 text-amber-700',
    accentColor: 'from-amber-500 to-orange-600',
    desc: 'An elegant template with recipe story cards, categorized menu cards, and reservation actions.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    sections: [
      'Classic heritage navbar',
      'Split chef story section',
      'Two-column menu price list',
      'Table booking form',
    ],
    color: 'amber',
  },
  {
    id: 'event',
    title: 'Tech Conference',
    badge: 'Events',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    accentColor: 'from-indigo-500 to-blue-600',
    desc: 'A clean conference landing page with ticket tier selections, timelines, and speakers.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    sections: [
      'Event details banner',
      'Attendee key statistics grid',
      'Speaker cards lineup',
      'Timeline schedule track',
      'Two-tier ticket card grid',
    ],
    color: 'indigo',
  },
  {
    id: 'blog',
    title: 'Writer Journal',
    badge: 'Writing',
    badgeColor: 'bg-red-100 text-red-700',
    accentColor: 'from-red-500 to-rose-600',
    desc: 'An aesthetic typography-driven blog template featuring newsletter signups and story feeds.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80',
    sections: [
      'Ink logo minimalist nav',
      'Creator newsletter box',
      'Latest article listing blocks',
      'About the writer dark section',
    ],
    color: 'red',
  },
  {
    id: 'saasDark',
    title: 'SaaS Dark Mode',
    badge: 'SaaS',
    badgeColor: 'bg-blue-100 text-blue-700',
    accentColor: 'from-blue-600 to-cyan-600',
    desc: 'A developer-first, dark mode product dashboard landing page.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    sections: [
      'Glow-styled navbar & status logo',
      'Edge deployment hero title',
      'Feature preview cards',
    ],
    color: 'blue',
  },
  {
    id: 'realEstate',
    title: 'Haven Real Estate',
    badge: 'Properties',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    accentColor: 'from-yellow-700 to-amber-800',
    desc: 'A high-end architectural property search and agency profile template.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    sections: [
      'Classic luxury nav banner',
      'Search search/filter input',
      'Neighborhood interior listings',
    ],
    color: 'yellow',
  },
  {
    id: 'crypto',
    title: 'Web3 Solis Protocol',
    badge: 'Web3',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    accentColor: 'from-emerald-600 to-teal-700',
    desc: 'A staking landing page for DeFi and Cosmos blockchain nodes.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
    sections: [
      'Decentralized logo nav',
      'DeFi liquid staking hero',
      'Security auditing badges',
    ],
    color: 'emerald',
  },
  {
    id: 'gym',
    title: 'Kinetic Fitness',
    badge: 'Sports',
    badgeColor: 'bg-orange-100 text-orange-800',
    accentColor: 'from-orange-500 to-red-600',
    desc: 'A bold, energetic dark-themed fitness club profile.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    sections: [
      'Bold branding orange nav',
      'High-intensity schedule hero',
      'Free day pass registration banner',
    ],
    color: 'orange',
  },
  {
    id: 'mobileApp',
    title: 'Flash Productivity',
    badge: 'App',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    accentColor: 'from-indigo-500 to-purple-600',
    desc: 'A responsive landing page for mobile applications featuring a phone mockup.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    sections: [
      'Interactive app store badge header',
      'Flash screen layout display list',
      'Feature mockup showcase grid',
    ],
    color: 'indigo',
  },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [user, setUser] = useState(null);
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
      } else {
        const demoUser = JSON.parse(localStorage.getItem('spider_demo_user') || '{"email":"demo@spider.app","full_name":"Creator"}');
        setUser({ email: demoUser.email, user_metadata: { full_name: demoUser.full_name } });
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

  const handleTemplateSelect = (t) => {
    setSelectedTemplate(t);
  };

  const startWithTemplate = (id) => {
    localStorage.setItem('selectedTemplate', id);
    navigate(`/builder?template=${id}`);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAF9F7] font-sans">
      <Sidebar user={user} handleSignOut={handleSignOut} activePage="templates" />
      
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10 pt-18 md:pt-10 custom-scrollbar relative md:ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 font-serif mb-4 flex items-center gap-3">
              <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-[#9D50BB] shrink-0" /> Template Library
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium">Start your next project with a premium, responsive foundation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {TEMPLATES.map((t) => (
              <div 
                key={t.id}
                onClick={() => handleTemplateSelect(t)}
                className="group cursor-pointer bg-white rounded-[24px] border border-gray-200/60 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative p-1">
                  <div className="w-full h-full rounded-[20px] overflow-hidden relative border border-gray-100">
                    <img 
                      src={t.image} 
                      alt={t.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium flex items-center gap-2">
                        Preview Template <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${t.badgeColor} shadow-sm backdrop-blur-sm bg-white/90`}>
                    {t.badge}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#9D50BB] transition-colors mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTemplate.accentColor} flex items-center justify-center text-white shadow-lg`}>
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-gray-900">{selectedTemplate.title}</h3>
                  <span className={`text-xs font-bold uppercase tracking-wide ${selectedTemplate.badgeColor.replace('bg-', 'text-').split(' ')[1]}`}>
                    {selectedTemplate.badge} Template
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8 custom-scrollbar">
              <div className="w-full md:w-3/5">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
                  <img src={selectedTemplate.image} alt={selectedTemplate.title} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 flex flex-col">
                <h4 className="text-lg font-bold text-gray-900 mb-3">About this template</h4>
                <p className="text-gray-600 leading-relaxed mb-8">{selectedTemplate.desc}</p>
                
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Included Sections</h4>
                <ul className="space-y-3 mb-8 flex-1">
                  {selectedTemplate.sections.map((section, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 text-${selectedTemplate.color}-500`} />
                      <span className="text-sm font-medium text-gray-700">{section}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => startWithTemplate(selectedTemplate.id)}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${selectedTemplate.accentColor} text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20`}
                >
                  Start Building <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
