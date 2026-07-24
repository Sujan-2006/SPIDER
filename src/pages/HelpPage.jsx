import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Play, Send, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const FAQS = [
  {
    q: 'How do I connect a custom domain to my published project?',
    a: 'Go to your Dashboard, locate your published project card, and click on "Settings". Under the Domains tab, type your custom domain (e.g. www.mybrand.com) and click Add. You will be provided with A and CNAME records to copy-paste into your DNS provider settings (like GoDaddy or Cloudflare).',
  },
  {
    q: 'Can I export clean code directly from the builder?',
    a: 'Absolutely! Click the standard "Export Code" icon in the builder’s top panel. A dialog will open showing the compiled, clean, responsive HTML and CSS code blocks, along with a "Download ZIP" option to save it locally.',
  },
  {
    q: 'How does the AI Theme & Brand Generator work?',
    a: 'In the builder sidebar, open the "AI Generator" tab. Type your brand description or prompts (e.g. "Minimal dark mode photography studio"), select your section type, and click Generate. Our backend compiles a custom palette, typography setup, and constructs matching code blocks inside the canvas.',
  },
  {
    q: 'What are the limits of the Free Atelier tier?',
    a: 'The Free tier grants you up to 5 active draft projects, full access to our builder features, offline browser caching, and deployment hosting on the default netlify subdomains. Custom domain endpoints and full AI generator limits require the Pro Atelier upgrade.',
  },
];

export default function HelpPage() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqStates, setFaqStates] = useState(FAQS.map(() => false));
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
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

  const toggleFaq = (idx) => {
    setFaqStates(faqStates.map((val, i) => (i === idx ? !val : val)));
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const resendKey = import.meta.env.VITE_RESEND_API_KEY;

    if (!resendKey) {
      // Simulate ticket submission if no API key is supplied
      setTicketSubmitted(true);
      setMessage('');
      setSubject('');
      setLoading(false);
      setTimeout(() => setTicketSubmitted(false), 5000);
      return;
    }

    try {
      // We route the request through corsproxy.io to bypass CORS issues on localhost
      const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.resend.com/emails'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'sec23cj054@sairamtap.edu.in',
          subject: `[SPIDER Support] ${subject}`,
          html: `
            <h3>New Support Ticket from SPIDER Workspace</h3>
            <p><strong>Sender:</strong> ${user?.email || 'Unknown'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to send email (Status: ${response.status})`);
      }

      setTicketSubmitted(true);
      setMessage('');
      setSubject('');
      setTimeout(() => setTicketSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while sending the email.');
    } finally {
      setLoading(false);
    }
  };

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-[#FAF9F7] font-sans">
      <Sidebar user={user} handleSignOut={handleSignOut} activePage="help" />

      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10 pt-18 md:pt-10 custom-scrollbar relative md:ml-64">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 font-serif mb-2 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-[#9D50BB]" /> Help & Support
            </h1>
            <p className="text-gray-500 font-medium">Browse documentation tutorials, FAQ guides, and connect with our team.</p>
          </div>

          {/* Search bar */}
          <div className="mb-6 md:mb-12">
            <input 
              type="text" 
              placeholder="Search help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-2xl px-4 sm:px-6 py-3.5 sm:py-4 border border-gray-200 rounded-2xl outline-none focus:border-[#9D50BB] focus:ring-1 focus:ring-[#9D50BB] font-medium shadow-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left: FAQs and Tutorials */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* FAQs Accordion */}
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-6 flex justify-between items-center gap-3 text-left hover:bg-gray-50/50 transition-colors"
                      >
                        <span className="font-bold text-gray-900 text-base">{faq.q}</span>
                        {faqStates[idx] ? <ChevronUp className="w-5 h-5 shrink-0 text-gray-400" /> : <ChevronDown className="w-5 h-5 shrink-0 text-gray-400" />}
                      </button>
                      
                      {faqStates[idx] && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-50 text-gray-600 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredFaqs.length === 0 && (
                    <p className="text-gray-500 font-medium text-sm">No matching FAQ items found for your query.</p>
                  )}
                </div>
              </div>

              {/* Video Tutorials Grid */}
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">Video Tutorials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="w-12 h-12 rounded-full bg-white text-purple-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-900 mb-1">Builder Basics in 5 Minutes</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Learn the foundations of visual editing, block layout dragging, and publishing.</p>
                    </div>
                  </div>

                  <div className="group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="w-12 h-12 rounded-full bg-white text-purple-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-900 mb-1">Working with AI Prompts</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Optimum ways to request branding layouts, content changes, and colors from AI.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="w-full">
              <div className="bg-white border border-gray-150 rounded-2xl p-4 sm:p-6 shadow-sm lg:sticky lg:top-10">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Need direct help?</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">File a ticket with our support engineers and we’ll get back to you within 24 hours.</p>

                {errorMsg && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}

                {ticketSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-950">Ticket Submitted!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">Thank you. An email ticket has been generated. Support will reach out soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Subject</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Domain connection failure"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9D50BB] text-sm font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
                      <textarea 
                        rows="4"
                        placeholder="Explain your problem here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9D50BB] text-sm font-medium resize-none"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-[#111] hover:bg-gray-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Ticket'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
