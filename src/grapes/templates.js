import { ecommerce } from './templates/ecommerce';
import { agency } from './templates/agency';
import { restaurant } from './templates/restaurant';
import { event } from './templates/event';
import { blog } from './templates/blog';
import { saasDark } from './templates/saasDark';
import { realEstate } from './templates/realEstate';
import { crypto } from './templates/crypto';
import { gym } from './templates/gym';
import { mobileApp } from './templates/mobileApp';

export const TEMPLATES = {
  ecommerce,
  agency,
  restaurant,
  event,
  blog,
  saasDark,
  realEstate,
  crypto,
  gym,
  mobileApp,
  portfolio: {
    name: 'Portfolio',
    html: `<div id="portfolio-root">

<!-- ════════════════ NAV ════════════════ -->
<nav class="pf-nav">
  <span class="pf-logo">Alex.dev</span>
  <div class="pf-nav-links">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact" class="pf-nav-cta">Hire Me</a>
  </div>
</nav>

<!-- ════════════════ HERO ════════════════ -->
<section class="pf-hero" id="hero">
  <div class="pf-hero-glow"></div>
  <div class="pf-hero-inner">
    <div class="pf-avatar-wrap">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
        alt="Profile"
        class="pf-avatar"
      />
      <span class="pf-avatar-badge">✦ Open to work</span>
    </div>
    <p class="pf-hero-tag">Full-Stack Web Developer</p>
    <h1 class="pf-hero-title">Hi, I'm <span class="pf-accent">Alex Morgan</span></h1>
    <p class="pf-hero-sub">
      I craft fast, accessible, and pixel-perfect web experiences.<br/>
      Turning ideas into beautiful products since 2018.
    </p>
    <div class="pf-hero-btns">
      <a href="#projects" class="pf-btn-primary">View My Work ↓</a>
      <a href="#contact" class="pf-btn-ghost">Get in Touch</a>
    </div>
  </div>
</section>

<!-- ════════════════ ABOUT ════════════════ -->
<section class="pf-section pf-about" id="about">
  <div class="pf-container pf-two-col">
    <div class="pf-about-img-wrap">
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
        alt="Working"
        class="pf-about-img"
      />
    </div>
    <div class="pf-about-text">
      <p class="pf-section-label">About Me</p>
      <h2 class="pf-section-title">Passionate about<br/><span class="pf-accent">great interfaces</span></h2>
      <p class="pf-body-text">
        I'm a full-stack developer based in San Francisco with 6+ years of experience building
        products for startups and agencies. I specialize in React, Node.js, and everything in
        between — and I care deeply about the details that make a product feel truly great.
      </p>
      <p class="pf-body-text" style="margin-top:16px;">
        When I'm not coding, you'll find me hiking trails, reading design books, or mentoring
        junior developers in my local community.
      </p>
      <div class="pf-stats-row">
        <div class="pf-stat"><span class="pf-stat-num">6+</span><span class="pf-stat-label">Years Exp.</span></div>
        <div class="pf-stat"><span class="pf-stat-num">80+</span><span class="pf-stat-label">Projects Done</span></div>
        <div class="pf-stat"><span class="pf-stat-num">40+</span><span class="pf-stat-label">Happy Clients</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════ SKILLS ════════════════ -->
<section class="pf-section pf-skills-section" id="skills">
  <div class="pf-container">
    <p class="pf-section-label pf-center">Technical Skills</p>
    <h2 class="pf-section-title pf-center">What I work with</h2>
    <div class="pf-skills-grid">
      <div class="pf-skill-card">
        <div class="pf-skill-icon">⚛️</div>
        <h3 class="pf-skill-name">React / Next.js</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:92%"></div></div>
        <span class="pf-bar-label">92%</span>
      </div>
      <div class="pf-skill-card">
        <div class="pf-skill-icon">🟢</div>
        <h3 class="pf-skill-name">Node.js / Express</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:85%"></div></div>
        <span class="pf-bar-label">85%</span>
      </div>
      <div class="pf-skill-card">
        <div class="pf-skill-icon">🎨</div>
        <h3 class="pf-skill-name">CSS / Tailwind</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:95%"></div></div>
        <span class="pf-bar-label">95%</span>
      </div>
      <div class="pf-skill-card">
        <div class="pf-skill-icon">🗄️</div>
        <h3 class="pf-skill-name">PostgreSQL / MongoDB</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:78%"></div></div>
        <span class="pf-bar-label">78%</span>
      </div>
      <div class="pf-skill-card">
        <div class="pf-skill-icon">☁️</div>
        <h3 class="pf-skill-name">AWS / DevOps</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:70%"></div></div>
        <span class="pf-bar-label">70%</span>
      </div>
      <div class="pf-skill-card">
        <div class="pf-skill-icon">📱</div>
        <h3 class="pf-skill-name">React Native</h3>
        <div class="pf-bar-bg"><div class="pf-bar" style="width:65%"></div></div>
        <span class="pf-bar-label">65%</span>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════ PROJECTS ════════════════ -->
<section class="pf-section" id="projects">
  <div class="pf-container">
    <p class="pf-section-label pf-center">Work</p>
    <h2 class="pf-section-title pf-center">Featured Projects</h2>
    <div class="pf-projects-grid">

      <div class="pf-project-card">
        <div class="pf-project-img-wrap">
          <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80" alt="Project 1" class="pf-project-img"/>
          <span class="pf-project-tag">SaaS</span>
        </div>
        <div class="pf-project-body">
          <h3 class="pf-project-title">AnalyticsPro Dashboard</h3>
          <p class="pf-project-desc">A real-time analytics dashboard built with React, D3.js, and a Node.js backend. Handles 50k+ daily active users.</p>
          <div class="pf-project-tags"><span>React</span><span>D3.js</span><span>Node</span></div>
          <a href="#" class="pf-project-link">View Case Study →</a>
        </div>
      </div>

      <div class="pf-project-card">
        <div class="pf-project-img-wrap">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Project 2" class="pf-project-img"/>
          <span class="pf-project-tag">E-Commerce</span>
        </div>
        <div class="pf-project-body">
          <h3 class="pf-project-title">ShopFlow E-Commerce</h3>
          <p class="pf-project-desc">A headless e-commerce platform with Stripe integration, inventory management, and a custom Shopify-like admin.</p>
          <div class="pf-project-tags"><span>Next.js</span><span>Stripe</span><span>Postgres</span></div>
          <a href="#" class="pf-project-link">View Case Study →</a>
        </div>
      </div>

      <div class="pf-project-card">
        <div class="pf-project-img-wrap">
          <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80" alt="Project 3" class="pf-project-img"/>
          <span class="pf-project-tag">Mobile</span>
        </div>
        <div class="pf-project-body">
          <h3 class="pf-project-title">Wellbeing App</h3>
          <p class="pf-project-desc">A cross-platform wellness tracking app with AI-powered habit recommendations and beautiful data visualizations.</p>
          <div class="pf-project-tags"><span>React Native</span><span>Firebase</span><span>ML</span></div>
          <a href="#" class="pf-project-link">View Case Study →</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ════════════════ CONTACT ════════════════ -->
<section class="pf-section pf-contact-section" id="contact">
  <div class="pf-container pf-contact-inner">
    <div class="pf-contact-text">
      <p class="pf-section-label">Contact</p>
      <h2 class="pf-section-title">Let's work<br/><span class="pf-accent">together</span></h2>
      <p class="pf-body-text">Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours.</p>
      <div class="pf-contact-links">
        <a href="mailto:alex@example.com" class="pf-contact-email">✉ alex@example.com</a>
        <a href="https://linkedin.com" class="pf-contact-social">LinkedIn ↗</a>
        <a href="https://github.com" class="pf-contact-social">GitHub ↗</a>
      </div>
    </div>
    <form class="pf-form" onsubmit="return false;">
      <div class="pf-form-row">
        <input type="text" placeholder="Your Name" class="pf-input"/>
        <input type="email" placeholder="Your Email" class="pf-input"/>
      </div>
      <input type="text" placeholder="Subject" class="pf-input pf-input-full"/>
      <textarea placeholder="Tell me about your project…" rows="5" class="pf-input pf-input-full pf-textarea"></textarea>
      <button type="submit" class="pf-btn-primary pf-submit">Send Message ✦</button>
    </form>
  </div>
</section>

<!-- ════════════════ FOOTER ════════════════ -->
<footer class="pf-footer">
  <p>© 2025 Alex Morgan · Designed &amp; Built by me · All rights reserved.</p>
  <p style="margin-top:6px; font-size:0.78rem; opacity:0.5;">San Francisco, CA</p>
</footer>

</div>`,
    css: `
/* ══ Base Reset ══════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', system-ui, sans-serif; background: #fafafa; color: #111; }
a { text-decoration: none; }
img { max-width: 100%; display: block; }

/* ══ Accent color ════════════════════════════════════════════ */
.pf-accent { color: #7c3aed; }

/* ══ NAV ═════════════════════════════════════════════════════ */
.pf-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 60px; background: #fff; border-bottom: 1px solid #f0f0f0;
  position: sticky; top: 0; z-index: 100;
}
.pf-logo { font-size: 1.25rem; font-weight: 800; color: #111; letter-spacing: -0.03em; }
.pf-nav-links { display: flex; gap: 28px; align-items: center; font-size: 0.9rem; }
.pf-nav-links a { color: #555; font-weight: 500; transition: color 0.2s; }
.pf-nav-links a:hover { color: #7c3aed; }
.pf-nav-cta {
  background: #7c3aed; color: #fff !important; padding: 8px 20px;
  border-radius: 999px; font-weight: 600;
}
.pf-nav-cta:hover { background: #6d28d9; opacity: 1 !important; }

/* ══ HERO ════════════════════════════════════════════════════ */
.pf-hero {
  position: relative; min-height: 92vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 80px 24px;
  background: linear-gradient(160deg, #faf5ff 0%, #ede9fe 40%, #f0fdf4 100%);
  overflow: hidden;
}
.pf-hero-glow {
  position: absolute; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%);
  pointer-events: none;
}
.pf-hero-inner { position: relative; z-index: 1; max-width: 680px; }
.pf-avatar-wrap { display: inline-block; position: relative; margin-bottom: 28px; }
.pf-avatar {
  width: 110px; height: 110px; border-radius: 50%;
  object-fit: cover; border: 4px solid #fff;
  box-shadow: 0 8px 32px rgba(124,58,237,0.2);
}
.pf-avatar-badge {
  position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  background: #7c3aed; color: #fff; font-size: 0.7rem; font-weight: 600;
  padding: 3px 10px; border-radius: 999px; white-space: nowrap;
}
.pf-hero-tag {
  color: #7c3aed; font-weight: 600; font-size: 0.85rem;
  letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px;
}
.pf-hero-title {
  font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 900;
  line-height: 1.1; margin-bottom: 20px; color: #1a1a2e; letter-spacing: -0.03em;
}
.pf-hero-sub {
  color: #6b7280; font-size: 1.05rem; line-height: 1.7; margin-bottom: 36px;
}
.pf-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ══ BUTTONS ═════════════════════════════════════════════════ */
.pf-btn-primary {
  display: inline-block; background: #7c3aed; color: #fff;
  padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
  transition: all 0.2s; box-shadow: 0 4px 20px rgba(124,58,237,0.3);
}
.pf-btn-primary:hover { background: #6d28d9; transform: translateY(-2px); }
.pf-btn-ghost {
  display: inline-block; border: 2px solid #d1d5db; color: #374151;
  padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
  transition: all 0.2s;
}
.pf-btn-ghost:hover { border-color: #7c3aed; color: #7c3aed; }

/* ══ SECTION HELPERS ═════════════════════════════════════════ */
.pf-section { padding: 96px 0; }
.pf-container { max-width: 1120px; margin: 0 auto; padding: 0 40px; }
.pf-section-label {
  color: #7c3aed; font-weight: 600; font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 10px;
}
.pf-section-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 900;
  color: #1a1a2e; line-height: 1.2; margin-bottom: 24px; letter-spacing: -0.02em;
}
.pf-body-text { color: #6b7280; line-height: 1.8; font-size: 1rem; }
.pf-center { text-align: center; }

/* ══ ABOUT ═══════════════════════════════════════════════════ */
.pf-about { background: #fff; }
.pf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.pf-about-img { border-radius: 20px; width: 100%; object-fit: cover; height: 420px; }
.pf-about-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
.pf-stats-row { display: flex; gap: 32px; margin-top: 36px; }
.pf-stat { display: flex; flex-direction: column; }
.pf-stat-num { font-size: 2rem; font-weight: 900; color: #7c3aed; line-height: 1; }
.pf-stat-label { font-size: 0.8rem; color: #9ca3af; margin-top: 4px; font-weight: 500; }

/* ══ SKILLS ══════════════════════════════════════════════════ */
.pf-skills-section { background: #faf5ff; }
.pf-skills-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
.pf-skill-card {
  background: #fff; border: 1px solid #ede9fe; border-radius: 16px;
  padding: 24px; transition: box-shadow 0.2s;
}
.pf-skill-card:hover { box-shadow: 0 8px 24px rgba(124,58,237,0.1); }
.pf-skill-icon { font-size: 1.8rem; margin-bottom: 10px; }
.pf-skill-name { font-weight: 700; font-size: 0.95rem; color: #1a1a2e; margin-bottom: 14px; }
.pf-bar-bg {
  background: #ede9fe; border-radius: 999px; height: 8px; overflow: hidden; margin-bottom: 6px;
}
.pf-bar {
  height: 100%; background: linear-gradient(90deg, #7c3aed, #a78bfa);
  border-radius: 999px; transition: width 1s ease;
}
.pf-bar-label { font-size: 0.75rem; font-weight: 600; color: #7c3aed; }

/* ══ PROJECTS ════════════════════════════════════════════════ */
.pf-projects-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
.pf-project-card {
  background: #fff; border-radius: 18px; overflow: hidden;
  border: 1px solid #f0f0f0; transition: all 0.25s;
}
.pf-project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
.pf-project-img-wrap { position: relative; height: 200px; overflow: hidden; background: #e9d5ff; }
.pf-project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.pf-project-card:hover .pf-project-img { transform: scale(1.05); }
.pf-project-tag {
  position: absolute; top: 12px; left: 12px;
  background: #7c3aed; color: #fff; font-size: 0.72rem; font-weight: 600;
  padding: 4px 10px; border-radius: 999px;
}
.pf-project-body { padding: 20px; }
.pf-project-title { font-size: 1rem; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
.pf-project-desc { font-size: 0.875rem; color: #6b7280; line-height: 1.6; margin-bottom: 14px; }
.pf-project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.pf-project-tags span {
  background: #f5f3ff; color: #7c3aed; font-size: 0.72rem;
  font-weight: 600; padding: 3px 10px; border-radius: 999px;
}
.pf-project-link { font-size: 0.85rem; font-weight: 700; color: #7c3aed; }
.pf-project-link:hover { text-decoration: underline; }

/* ══ CONTACT ═════════════════════════════════════════════════ */
.pf-contact-section { background: #1a1a2e; color: #fff; }
.pf-contact-section .pf-section-label { color: #a78bfa; }
.pf-contact-section .pf-section-title { color: #fff; }
.pf-contact-section .pf-body-text { color: rgba(255,255,255,0.6); }
.pf-contact-inner { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: start; }
.pf-contact-links { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }
.pf-contact-email {
  color: #a78bfa; font-size: 1rem; font-weight: 600;
  border-bottom: 1px solid rgba(167,139,250,0.3); padding-bottom: 14px;
}
.pf-contact-social { color: rgba(255,255,255,0.5); font-size: 0.9rem; font-weight: 500; }
.pf-contact-social:hover { color: #a78bfa; }

/* FORM */
.pf-form { display: flex; flex-direction: column; gap: 14px; }
.pf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.pf-input {
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  color: #fff; border-radius: 10px; padding: 13px 16px; font-size: 0.9rem;
  outline: none; width: 100%; transition: border-color 0.2s;
  font-family: inherit;
}
.pf-input::placeholder { color: rgba(255,255,255,0.35); }
.pf-input:focus { border-color: #7c3aed; }
.pf-input-full { width: 100%; }
.pf-textarea { resize: vertical; min-height: 120px; }
.pf-submit { width: 100%; padding: 14px; cursor: pointer; border: none; font-family: inherit; }

/* ══ FOOTER ══════════════════════════════════════════════════ */
.pf-footer {
  text-align: center; padding: 28px; background: #111;
  color: rgba(255,255,255,0.4); font-size: 0.85rem;
}

/* ══ RESPONSIVE ══════════════════════════════════════════════ */
@media (max-width: 992px) {
  .pf-projects-grid { grid-template-columns: repeat(2,1fr); }
  .pf-skills-grid   { grid-template-columns: repeat(2,1fr); }
  .pf-two-col        { grid-template-columns: 1fr; }
  .pf-contact-inner  { grid-template-columns: 1fr; }
  .pf-about-img      { height: 280px; }
}
@media (max-width: 600px) {
  .pf-nav { padding: 14px 20px; }
  .pf-nav-links { gap: 14px; }
  .pf-projects-grid { grid-template-columns: 1fr; }
  .pf-skills-grid   { grid-template-columns: 1fr; }
  .pf-form-row      { grid-template-columns: 1fr; }
  .pf-stats-row     { gap: 20px; }
  .pf-hero           { min-height: 80vh; }
}`,
  },


  landing: {
    name: 'Landing Page',
    html: `<div id="lp-root">

<!-- ════════ NAV ════════ -->
<nav class="lp-nav">
  <span class="lp-logo">🚀 LaunchKit</span>
  <div class="lp-nav-links">
    <a href="#features">Features</a>
    <a href="#testimonials">Reviews</a>
    <a href="#pricing">Pricing</a>
    <a href="#cta" class="lp-nav-cta">Get Started Free →</a>
  </div>
</nav>

<!-- ════════ HERO ════════ -->
<section class="lp-hero" id="hero">
  <div class="lp-hero-bg"></div>
  <div class="lp-hero-content">
    <div class="lp-hero-badge">✦ Trusted by 12,000+ companies</div>
    <h1 class="lp-hero-h1">
      The fastest way to<br/>
      <span class="lp-gradient-text">ship great products</span>
    </h1>
    <p class="lp-hero-sub">
      LaunchKit gives your team every tool to design, build, and scale — without writing a single line of code. Go from idea to live in hours.
    </p>
    <div class="lp-hero-btns" id="cta-hero">
      <a href="#cta" class="lp-btn-primary lp-btn-lg">Start for Free — No CC required</a>
      <a href="#features" class="lp-btn-ghost lp-btn-lg">See how it works ↓</a>
    </div>
    <!-- Social proof bar -->
    <div class="lp-social-proof">
      <div class="lp-avatars">
        <img src="https://i.pravatar.cc/32?img=1" alt="user"/>
        <img src="https://i.pravatar.cc/32?img=2" alt="user"/>
        <img src="https://i.pravatar.cc/32?img=3" alt="user"/>
        <img src="https://i.pravatar.cc/32?img=4" alt="user"/>
      </div>
      <span class="lp-proof-text">⭐⭐⭐⭐⭐ 4.9/5 from <strong>2,400+</strong> reviews</span>
    </div>
    <!-- Hero visual -->
    <div class="lp-hero-visual">
      <div class="lp-hero-card lp-hc1"><span>📈 Revenue up 340%</span></div>
      <div class="lp-hero-card lp-hc2"><span>⚡ 2× faster shipping</span></div>
      <div class="lp-hero-screen">
        <div class="lp-screen-bar"><span></span><span></span><span></span></div>
        <div class="lp-screen-body">
          <div class="lp-screen-chart"></div>
          <div class="lp-screen-rows">
            <div class="lp-screen-row" style="width:80%"></div>
            <div class="lp-screen-row" style="width:60%"></div>
            <div class="lp-screen-row" style="width:90%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════ LOGOS STRIP ════════ -->
<section class="lp-logos">
  <p class="lp-logos-label">Trusted by teams at</p>
  <div class="lp-logos-strip">
    <span class="lp-logo-item">Notion</span>
    <span class="lp-logo-item">Stripe</span>
    <span class="lp-logo-item">Figma</span>
    <span class="lp-logo-item">Linear</span>
    <span class="lp-logo-item">Vercel</span>
    <span class="lp-logo-item">Loom</span>
  </div>
</section>

<!-- ════════ FEATURES ════════ -->
<section class="lp-section" id="features">
  <div class="lp-container">
    <div class="lp-section-head">
      <span class="lp-section-label">Features</span>
      <h2 class="lp-section-title">Everything your team needs</h2>
      <p class="lp-section-sub">One platform. Every tool. Zero complexity.</p>
    </div>
    <div class="lp-features-grid">
      <div class="lp-feature-card lp-fc-accent">
        <div class="lp-feature-icon">⚡</div>
        <h3>Lightning Performance</h3>
        <p>Pages load in under 100ms worldwide with our edge-optimized global CDN. Core Web Vitals score 100 out of the box.</p>
        <a href="#" class="lp-feature-link">Learn more →</a>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon">🛡️</div>
        <h3>Enterprise Security</h3>
        <p>SOC 2 Type II certified. End-to-end encryption, role-based access control, and automatic compliance checks.</p>
        <a href="#" class="lp-feature-link">Learn more →</a>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon">📊</div>
        <h3>Real-time Analytics</h3>
        <p>Understand every user action with session recording, funnel analysis, and custom event tracking built in.</p>
        <a href="#" class="lp-feature-link">Learn more →</a>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon">🔗</div>
        <h3>200+ Integrations</h3>
        <p>Connect to Slack, GitHub, Salesforce, HubSpot, Zapier, and 200+ other tools with one click. No dev needed.</p>
        <a href="#" class="lp-feature-link">Learn more →</a>
      </div>
    </div>
  </div>
</section>

<!-- ════════ TESTIMONIALS ════════ -->
<section class="lp-section lp-testi-section" id="testimonials">
  <div class="lp-container">
    <div class="lp-section-head">
      <span class="lp-section-label">Testimonials</span>
      <h2 class="lp-section-title">Loved by builders worldwide</h2>
      <p class="lp-section-sub">Don't take our word for it — hear from people who ship every day.</p>
    </div>
    <div class="lp-testi-grid">

      <div class="lp-testi-card">
        <div class="lp-testi-stars">★★★★★</div>
        <p class="lp-testi-quote">"LaunchKit cut our go-to-market time in half. We launched our MVP in 3 weeks instead of 3 months. Absolutely game-changing."</p>
        <div class="lp-testi-author">
          <img src="https://i.pravatar.cc/48?img=5" alt="Sarah" class="lp-testi-avatar"/>
          <div>
            <strong>Sarah Chen</strong>
            <span>Co-founder, DataFlow AI</span>
          </div>
        </div>
      </div>

      <div class="lp-testi-card lp-testi-featured">
        <div class="lp-testi-stars">★★★★★</div>
        <p class="lp-testi-quote">"I've used every builder on the market. LaunchKit is on a completely different level. The analytics and integrations alone are worth 10× the price."</p>
        <div class="lp-testi-author">
          <img src="https://i.pravatar.cc/48?img=8" alt="Marcus" class="lp-testi-avatar"/>
          <div>
            <strong>Marcus Powell</strong>
            <span>Head of Growth, Reverie</span>
          </div>
        </div>
      </div>

      <div class="lp-testi-card">
        <div class="lp-testi-stars">★★★★★</div>
        <p class="lp-testi-quote">"Our non-technical team built and shipped a full product with zero developer help. The support team is also incredibly responsive."</p>
        <div class="lp-testi-author">
          <img src="https://i.pravatar.cc/48?img=12" alt="Priya" class="lp-testi-avatar"/>
          <div>
            <strong>Priya Sharma</strong>
            <span>Product Lead, Finlo</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ════════ PRICING ════════ -->
<section class="lp-section" id="pricing">
  <div class="lp-container">
    <div class="lp-section-head">
      <span class="lp-section-label">Pricing</span>
      <h2 class="lp-section-title">Simple, transparent pricing</h2>
      <p class="lp-section-sub">No surprises. Cancel anytime. Start free.</p>
    </div>
    <div class="lp-pricing-grid">

      <!-- STARTER -->
      <div class="lp-price-card">
        <div class="lp-price-tier">Starter</div>
        <div class="lp-price-amount"><span class="lp-price-num">$0</span><span class="lp-price-per">/mo</span></div>
        <p class="lp-price-desc">Perfect for individuals and side projects.</p>
        <ul class="lp-price-features">
          <li>✓ 3 projects</li>
          <li>✓ 5GB storage</li>
          <li>✓ Basic analytics</li>
          <li>✓ Community support</li>
          <li class="lp-dim">✗ Custom domain</li>
          <li class="lp-dim">✗ Team collaboration</li>
        </ul>
        <a href="#" class="lp-btn-ghost lp-price-btn">Get Started Free</a>
      </div>

      <!-- PRO (featured) -->
      <div class="lp-price-card lp-price-featured">
        <div class="lp-price-popular">Most Popular ✦</div>
        <div class="lp-price-tier">Pro</div>
        <div class="lp-price-amount"><span class="lp-price-num">$49</span><span class="lp-price-per">/mo</span></div>
        <p class="lp-price-desc">For growing teams that ship fast.</p>
        <ul class="lp-price-features">
          <li>✓ Unlimited projects</li>
          <li>✓ 100GB storage</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Custom domain</li>
          <li>✓ Team collaboration (10)</li>
        </ul>
        <a href="#" class="lp-btn-primary lp-price-btn">Start 14-Day Trial</a>
      </div>

      <!-- ENTERPRISE -->
      <div class="lp-price-card">
        <div class="lp-price-tier">Enterprise</div>
        <div class="lp-price-amount"><span class="lp-price-num">$199</span><span class="lp-price-per">/mo</span></div>
        <p class="lp-price-desc">For organizations that need it all.</p>
        <ul class="lp-price-features">
          <li>✓ Unlimited everything</li>
          <li>✓ 1TB storage</li>
          <li>✓ Custom analytics</li>
          <li>✓ 24/7 dedicated support</li>
          <li>✓ SSO &amp; SAML</li>
          <li>✓ Unlimited team members</li>
        </ul>
        <a href="#" class="lp-btn-ghost lp-price-btn">Contact Sales</a>
      </div>

    </div>
    <p class="lp-price-note">All plans include a 14-day free trial · No credit card required · Cancel anytime</p>
  </div>
</section>

<!-- ════════ FINAL CTA ════════ -->
<section class="lp-cta-section" id="cta">
  <div class="lp-cta-glow"></div>
  <div class="lp-cta-inner">
    <span class="lp-section-label" style="color:#a78bfa;">Get Started Today</span>
    <h2 class="lp-cta-title">
      Stop waiting.<br/>Start shipping.
    </h2>
    <p class="lp-cta-sub">
      Join 12,000+ teams already building with LaunchKit. Your first project is completely free.
    </p>
    <div class="lp-cta-btns">
      <a href="#" class="lp-btn-white lp-btn-lg">Create Free Account →</a>
      <a href="#" class="lp-btn-outline-white lp-btn-lg">Book a Demo</a>
    </div>
    <p class="lp-cta-fine">Free forever · No credit card · Cancel anytime</p>
  </div>
</section>

<!-- ════════ FOOTER ════════ -->
<footer class="lp-footer">
  <div class="lp-footer-inner">
    <div>
      <span class="lp-footer-logo">🚀 LaunchKit</span>
      <p class="lp-footer-tagline">The platform for ambitious teams.</p>
    </div>
    <div class="lp-footer-links">
      <a href="#">Product</a>
      <a href="#">Pricing</a>
      <a href="#">Docs</a>
      <a href="#">Blog</a>
      <a href="#">Careers</a>
    </div>
  </div>
  <div class="lp-footer-bottom">
    <p>© 2025 LaunchKit, Inc. All rights reserved.</p>
    <div class="lp-footer-legal">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Security</a>
    </div>
  </div>
</footer>

</div>`,
    css: `
/* ══ Reset ═══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', system-ui, sans-serif; background: #fff; color: #111; line-height: 1.6; }
a { text-decoration: none; }
img { max-width: 100%; display: block; }

/* ══ NAV ═════════════════════════════════════════════ */
.lp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 64px; background: #fff; border-bottom: 1px solid #f0f0f0;
  position: sticky; top: 0; z-index: 100;
}
.lp-logo { font-size: 1.2rem; font-weight: 800; color: #111; }
.lp-nav-links { display: flex; align-items: center; gap: 28px; font-size: 0.9rem; }
.lp-nav-links a { color: #555; font-weight: 500; transition: color 0.2s; }
.lp-nav-links a:hover { color: #4f46e5; }
.lp-nav-cta {
  background: #4f46e5; color: #fff !important; padding: 9px 22px;
  border-radius: 999px; font-weight: 700; transition: background 0.2s;
}
.lp-nav-cta:hover { background: #4338ca; }

/* ══ HERO ════════════════════════════════════════════ */
.lp-hero {
  position: relative; padding: 100px 64px 80px;
  background: linear-gradient(150deg, #fafafa 0%, #eef2ff 50%, #faf5ff 100%);
  overflow: hidden; text-align: center;
}
.lp-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.lp-hero-content { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
.lp-hero-badge {
  display: inline-block; background: #eef2ff; color: #4f46e5;
  font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;
  padding: 6px 16px; border-radius: 999px; border: 1px solid #c7d2fe;
  margin-bottom: 28px;
}
.lp-hero-h1 {
  font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 900; line-height: 1.08;
  letter-spacing: -0.04em; color: #0f0a1e; margin-bottom: 24px;
}
.lp-gradient-text {
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.lp-hero-sub {
  color: #6b7280; font-size: 1.15rem; max-width: 580px;
  margin: 0 auto 36px; line-height: 1.75;
}
.lp-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }

/* Social proof */
.lp-social-proof { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 64px; }
.lp-avatars { display: flex; }
.lp-avatars img { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff; margin-left: -8px; }
.lp-avatars img:first-child { margin-left: 0; }
.lp-proof-text { font-size: 0.85rem; color: #6b7280; }

/* Hero visual (mock app) */
.lp-hero-visual { position: relative; max-width: 700px; margin: 0 auto; }
.lp-hero-screen {
  background: #1e1e2e; border-radius: 16px; overflow: hidden;
  box-shadow: 0 24px 80px rgba(79,70,229,0.2), 0 4px 20px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.1);
}
.lp-screen-bar {
  background: #2a2a3d; padding: 10px 14px; display: flex; gap: 6px; align-items: center;
}
.lp-screen-bar span { width: 10px; height: 10px; border-radius: 50%; }
.lp-screen-bar span:nth-child(1) { background: #ff5f57; }
.lp-screen-bar span:nth-child(2) { background: #febc2e; }
.lp-screen-bar span:nth-child(3) { background: #28c840; }
.lp-screen-body { padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.lp-screen-chart {
  height: 100px; background: linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0.1) 100%);
  border-radius: 8px; grid-column: 1 / -1;
}
.lp-screen-rows { display: flex; flex-direction: column; gap: 8px; grid-column: 1 / -1; }
.lp-screen-row { height: 10px; background: rgba(255,255,255,0.1); border-radius: 999px; }
.lp-hero-card {
  position: absolute; background: #fff; border-radius: 12px; padding: 12px 18px;
  font-size: 0.8rem; font-weight: 700; color: #111;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12); z-index: 2;
}
.lp-hc1 { top: -16px; right: -10px; }
.lp-hc2 { bottom: 20px; left: -10px; }

/* ══ LOGOS ═══════════════════════════════════════════ */
.lp-logos { text-align: center; padding: 40px 64px; border-bottom: 1px solid #f0f0f0; }
.lp-logos-label { font-size: 0.8rem; font-weight: 500; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 20px; }
.lp-logos-strip { display: flex; gap: 48px; justify-content: center; align-items: center; flex-wrap: wrap; }
.lp-logo-item { font-size: 1.1rem; font-weight: 800; color: #d1d5db; letter-spacing: -0.02em; }

/* ══ SECTION HELPERS ═════════════════════════════════ */
.lp-section { padding: 96px 0; }
.lp-container { max-width: 1160px; margin: 0 auto; padding: 0 64px; }
.lp-section-head { text-align: center; margin-bottom: 56px; }
.lp-section-label {
  display: inline-block; color: #4f46e5; font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 12px;
}
.lp-section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900;
  color: #0f0a1e; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 16px;
}
.lp-section-sub { color: #6b7280; font-size: 1.05rem; max-width: 520px; margin: 0 auto; }

/* ══ BUTTONS ═════════════════════════════════════════ */
.lp-btn-primary {
  display: inline-block; background: #4f46e5; color: #fff; border-radius: 12px;
  font-weight: 700; transition: all 0.2s; box-shadow: 0 4px 20px rgba(79,70,229,0.3);
}
.lp-btn-primary:hover { background: #4338ca; transform: translateY(-1px); }
.lp-btn-ghost {
  display: inline-block; border: 2px solid #e5e7eb; color: #374151;
  border-radius: 12px; font-weight: 700; transition: all 0.2s;
}
.lp-btn-ghost:hover { border-color: #4f46e5; color: #4f46e5; }
.lp-btn-lg { padding: 15px 32px; font-size: 1rem; }
.lp-btn-white {
  display: inline-block; background: #fff; color: #4f46e5;
  border-radius: 12px; font-weight: 800; transition: all 0.2s;
}
.lp-btn-white:hover { background: #f0f0f0; }
.lp-btn-outline-white {
  display: inline-block; border: 2px solid rgba(255,255,255,0.4); color: #fff;
  border-radius: 12px; font-weight: 700; transition: all 0.2s;
}
.lp-btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

/* ══ FEATURES ════════════════════════════════════════ */
.lp-features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.lp-feature-card {
  background: #fafafa; border: 1px solid #f0f0f0; border-radius: 20px;
  padding: 32px; transition: all 0.25s;
}
.lp-feature-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); transform: translateY(-2px); }
.lp-fc-accent { background: #eef2ff; border-color: #c7d2fe; }
.lp-feature-icon { font-size: 2rem; margin-bottom: 16px; }
.lp-feature-card h3 { font-size: 1.1rem; font-weight: 800; color: #0f0a1e; margin-bottom: 10px; }
.lp-feature-card p { color: #6b7280; font-size: 0.9rem; line-height: 1.7; margin-bottom: 16px; }
.lp-feature-link { font-size: 0.875rem; font-weight: 700; color: #4f46e5; }
.lp-feature-link:hover { text-decoration: underline; }

/* ══ TESTIMONIALS ════════════════════════════════════ */
.lp-testi-section { background: #0f0a1e; }
.lp-testi-section .lp-section-label { color: #818cf8; }
.lp-testi-section .lp-section-title { color: #fff; }
.lp-testi-section .lp-section-sub { color: rgba(255,255,255,0.5); }
.lp-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.lp-testi-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px;
}
.lp-testi-featured {
  background: linear-gradient(135deg, rgba(79,70,229,0.3), rgba(124,58,237,0.2));
  border-color: rgba(129,140,248,0.4);
}
.lp-testi-stars { color: #fbbf24; font-size: 1rem; letter-spacing: 2px; }
.lp-testi-quote { color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.7; flex: 1; font-style: italic; }
.lp-testi-author { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.lp-testi-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.15); }
.lp-testi-author strong { display: block; color: #fff; font-size: 0.9rem; }
.lp-testi-author span { color: rgba(255,255,255,0.45); font-size: 0.78rem; }

/* ══ PRICING ═════════════════════════════════════════ */
.lp-pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.lp-price-card {
  border: 2px solid #f0f0f0; border-radius: 20px; padding: 32px;
  display: flex; flex-direction: column; gap: 12px; background: #fff;
  transition: box-shadow 0.2s;
}
.lp-price-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
.lp-price-featured {
  border-color: #4f46e5; background: #f8f7ff;
  box-shadow: 0 0 0 4px rgba(79,70,229,0.1), 0 16px 40px rgba(79,70,229,0.15);
  position: relative;
}
.lp-price-popular {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: #4f46e5; color: #fff; font-size: 0.72rem; font-weight: 700;
  padding: 4px 14px; border-radius: 999px; white-space: nowrap;
}
.lp-price-tier { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; }
.lp-price-amount { display: flex; align-items: baseline; gap: 4px; }
.lp-price-num { font-size: 3rem; font-weight: 900; color: #0f0a1e; letter-spacing: -0.04em; }
.lp-price-per { font-size: 0.9rem; color: #9ca3af; font-weight: 500; }
.lp-price-desc { font-size: 0.875rem; color: #6b7280; line-height: 1.5; }
.lp-price-features { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; margin-top: 8px; }
.lp-price-features li { font-size: 0.875rem; color: #374151; font-weight: 500; }
.lp-dim { color: #d1d5db !important; }
.lp-price-btn { display: block; text-align: center; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; margin-top: 8px; }
.lp-price-note { text-align: center; margin-top: 32px; color: #9ca3af; font-size: 0.83rem; }

/* ══ CTA SECTION ═════════════════════════════════════ */
.lp-cta-section {
  position: relative; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%);
  padding: 100px 64px; text-align: center; overflow: hidden;
}
.lp-cta-glow {
  position: absolute; width: 700px; height: 400px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none;
}
.lp-cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
.lp-cta-title {
  font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; color: #fff;
  letter-spacing: -0.04em; line-height: 1.1; margin: 12px 0 20px;
}
.lp-cta-sub { color: rgba(255,255,255,0.65); font-size: 1.05rem; max-width: 480px; margin: 0 auto 40px; line-height: 1.7; }
.lp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
.lp-cta-fine { color: rgba(255,255,255,0.35); font-size: 0.8rem; }

/* ══ FOOTER ══════════════════════════════════════════ */
.lp-footer { background: #09090b; padding: 48px 64px 28px; color: rgba(255,255,255,0.5); }
.lp-footer-inner { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; flex-wrap: wrap; gap: 24px; }
.lp-footer-logo { font-size: 1.1rem; font-weight: 800; color: #fff; display: block; margin-bottom: 8px; }
.lp-footer-tagline { font-size: 0.85rem; color: rgba(255,255,255,0.35); }
.lp-footer-links { display: flex; gap: 28px; flex-wrap: wrap; }
.lp-footer-links a { color: rgba(255,255,255,0.5); font-size: 0.875rem; font-weight: 500; transition: color 0.2s; }
.lp-footer-links a:hover { color: #fff; }
.lp-footer-bottom { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; font-size: 0.8rem; flex-wrap: wrap; gap: 12px; }
.lp-footer-legal { display: flex; gap: 20px; }
.lp-footer-legal a { color: rgba(255,255,255,0.4); transition: color 0.2s; }
.lp-footer-legal a:hover { color: rgba(255,255,255,0.8); }

/* ══ RESPONSIVE ══════════════════════════════════════ */
@media (max-width: 992px) {
  .lp-features-grid { grid-template-columns: 1fr; }
  .lp-testi-grid    { grid-template-columns: 1fr; }
  .lp-pricing-grid  { grid-template-columns: 1fr; }
  .lp-hero { padding: 64px 24px 60px; }
  .lp-nav { padding: 14px 24px; }
  .lp-container { padding: 0 24px; }
  .lp-logos-strip { gap: 24px; }
  .lp-footer { padding: 40px 24px 24px; }
  .lp-cta-section { padding: 72px 24px; }
}
@media (max-width: 640px) {
  .lp-nav-links { gap: 12px; font-size: 0.8rem; }
  .lp-hero-h1 { font-size: 2.4rem; }
  .lp-screen-body { grid-template-columns: 1fr; }
  .lp-footer-inner { flex-direction: column; }
  .lp-footer-bottom { flex-direction: column; text-align: center; }
}`,
  },


  business: {
    name: 'Business Website',
    html: `<div id="bw-root">

<!-- ════════ NAVBAR ════════ -->
<nav class="bw-nav">
  <div class="bw-nav-brand">
    <div class="bw-nav-logo"></div>
    <span class="bw-brand-name">NexaCorp</span>
  </div>
  <div class="bw-nav-links">
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#testimonials">Testimonials</a>
    <a href="#contact">Contact</a>
    <a href="#contact" class="bw-nav-cta">Get a Quote</a>
  </div>
</nav>

<!-- ════════ HERO ════════ -->
<section class="bw-hero" id="hero">
  <div class="bw-hero-bg"></div>
  <div class="bw-container bw-hero-inner">
    <div class="bw-hero-text">
      <div class="bw-hero-eyebrow">✦ Trusted by 500+ businesses worldwide</div>
      <h1 class="bw-hero-h1">
        We drive growth<br/>through <span class="bw-sky">strategy</span><br/>& technology
      </h1>
      <p class="bw-hero-sub">
        NexaCorp is a full-service consulting and technology firm helping ambitious organizations scale smarter, faster, and more efficiently in a digital-first world.
      </p>
      <div class="bw-hero-actions">
        <a href="#contact" class="bw-btn-primary">Schedule a Free Consultation</a>
        <a href="#services" class="bw-btn-ghost">Explore Services →</a>
      </div>
    </div>
    <div class="bw-hero-visual">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
        alt="Business office"
        class="bw-hero-img"
      />
      <div class="bw-metric bw-m1"><span class="bw-metric-num">98%</span><span class="bw-metric-label">Client Retention</span></div>
      <div class="bw-metric bw-m2"><span class="bw-metric-num">$2.4B</span><span class="bw-metric-label">Revenue Generated</span></div>
    </div>
  </div>
  <!-- Stats bar -->
  <div class="bw-stats-bar">
    <div class="bw-stat"><span class="bw-stat-num">500+</span><span class="bw-stat-lbl">Clients Served</span></div>
    <div class="bw-stat-div"></div>
    <div class="bw-stat"><span class="bw-stat-num">12yr</span><span class="bw-stat-lbl">In Business</span></div>
    <div class="bw-stat-div"></div>
    <div class="bw-stat"><span class="bw-stat-num">40+</span><span class="bw-stat-lbl">Expert Team</span></div>
    <div class="bw-stat-div"></div>
    <div class="bw-stat"><span class="bw-stat-num">98%</span><span class="bw-stat-lbl">Satisfaction Rate</span></div>
  </div>
</section>

<!-- ════════ SERVICES ════════ -->
<section class="bw-section" id="services">
  <div class="bw-container">
    <div class="bw-section-head">
      <span class="bw-label">Our Services</span>
      <h2 class="bw-title">What we do best</h2>
      <p class="bw-subtitle">End-to-end solutions designed to take your business from where it is to where it deserves to be.</p>
    </div>
    <div class="bw-services-grid">
      <div class="bw-svc-card bw-svc-featured">
        <div class="bw-svc-icon">🎯</div>
        <h3>Business Strategy</h3>
        <p>Data-backed growth roadmaps and market entry strategies tailored to your industry and goals.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
      <div class="bw-svc-card">
        <div class="bw-svc-icon">💻</div>
        <h3>Web &amp; App Development</h3>
        <p>Custom-built digital products — from MVPs to enterprise platforms — that scale with your business.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
      <div class="bw-svc-card">
        <div class="bw-svc-icon">📣</div>
        <h3>Digital Marketing</h3>
        <p>SEO, paid media, email campaigns, and conversion optimization that deliver measurable ROI.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
      <div class="bw-svc-card">
        <div class="bw-svc-icon">☁️</div>
        <h3>Cloud &amp; IT Infrastructure</h3>
        <p>Migrate, modernize, and manage your cloud infrastructure with zero downtime and maximum security.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
      <div class="bw-svc-card">
        <div class="bw-svc-icon">📊</div>
        <h3>Data &amp; Analytics</h3>
        <p>Turn raw data into actionable insights with custom dashboards, BI tools, and predictive analytics.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
      <div class="bw-svc-card">
        <div class="bw-svc-icon">🛡️</div>
        <h3>Cybersecurity</h3>
        <p>Protect your business with penetration testing, compliance consulting, and 24/7 threat monitoring.</p>
        <a href="#" class="bw-svc-link">Learn more →</a>
      </div>
    </div>
  </div>
</section>

<!-- ════════ ABOUT ════════ -->
<section class="bw-section bw-about-section" id="about">
  <div class="bw-container bw-about-inner">
    <div class="bw-about-img-col">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
        alt="Team meeting"
        class="bw-about-img"
      />
      <div class="bw-about-badge">
        <span class="bw-badge-num">12+</span>
        <span class="bw-badge-txt">Years of Excellence</span>
      </div>
    </div>
    <div class="bw-about-text">
      <span class="bw-label">About NexaCorp</span>
      <h2 class="bw-title">Built on trust,<br/>driven by results</h2>
      <p class="bw-body">
        Founded in 2012, NexaCorp began as a boutique management consulting firm. Today, we are a 40-person team of strategists, engineers, designers, and marketers — united by one mission: helping our clients grow.
      </p>
      <p class="bw-body" style="margin-top:14px;">
        We partner with businesses ranging from seed-stage startups to global enterprises, delivering solutions that are practical, scalable, and impactful. Our cross-functional model means you get a single team that handles it all.
      </p>
      <div class="bw-about-checkmarks">
        <div class="bw-check">✓ ISO 27001 Certified Organization</div>
        <div class="bw-check">✓ Google Cloud &amp; AWS Premier Partner</div>
        <div class="bw-check">✓ Forbes 2024 Top 50 Consulting Firms</div>
        <div class="bw-check">✓ 98% client retention rate year-on-year</div>
      </div>
      <a href="#contact" class="bw-btn-primary" style="margin-top:32px; display:inline-block;">Work With Us</a>
    </div>
  </div>
</section>

<!-- ════════ TESTIMONIALS ════════ -->
<section class="bw-section bw-testi-section" id="testimonials">
  <div class="bw-container">
    <div class="bw-section-head">
      <span class="bw-label" style="color:#7dd3fc;">Client Testimonials</span>
      <h2 class="bw-title" style="color:#fff;">What our clients say</h2>
      <p class="bw-subtitle" style="color:rgba(255,255,255,0.55);">Real results, real stories — from companies we're proud to call partners.</p>
    </div>
    <div class="bw-testi-grid">
      <div class="bw-testi-card">
        <div class="bw-testi-stars">★★★★★</div>
        <p class="bw-testi-quote">"NexaCorp restructured our entire go-to-market strategy in 6 weeks. Revenue grew 180% in the first quarter post-engagement. Exceptional team."</p>
        <div class="bw-testi-person">
          <img src="https://i.pravatar.cc/48?img=11" alt="CEO" class="bw-testi-av"/>
          <div>
            <strong>Jonathan Mills</strong>
            <span>CEO, Meridian Capital Group</span>
          </div>
        </div>
      </div>
      <div class="bw-testi-card bw-testi-accent">
        <div class="bw-testi-stars">★★★★★</div>
        <p class="bw-testi-quote">"Our cloud migration was seamless. Zero downtime, 40% reduction in infrastructure costs, and the team was available 24/7 throughout. Highly recommend."</p>
        <div class="bw-testi-person">
          <img src="https://i.pravatar.cc/48?img=20" alt="CTO" class="bw-testi-av"/>
          <div>
            <strong>Priya Nair</strong>
            <span>CTO, FinBridge Technologies</span>
          </div>
        </div>
      </div>
      <div class="bw-testi-card">
        <div class="bw-testi-stars">★★★★★</div>
        <p class="bw-testi-quote">"From digital marketing to web development, NexaCorp handled our full transformation. We now generate 3× more qualified leads every month."</p>
        <div class="bw-testi-person">
          <img src="https://i.pravatar.cc/48?img=33" alt="CMO" class="bw-testi-av"/>
          <div>
            <strong>Diana Ruiz</strong>
            <span>CMO, Vertice Healthcare</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════ CONTACT ════════ -->
<section class="bw-section" id="contact">
  <div class="bw-container">
    <div class="bw-section-head">
      <span class="bw-label">Get in Touch</span>
      <h2 class="bw-title">Let's talk about your business</h2>
      <p class="bw-subtitle">Fill in the form and our team will get back to you within one business day.</p>
    </div>
    <div class="bw-contact-grid">
      <!-- Info column -->
      <div class="bw-contact-info">
        <div class="bw-contact-block">
          <div class="bw-contact-icon">📍</div>
          <div>
            <strong>Head Office</strong>
            <p>1200 Market Street, Suite 500<br/>San Francisco, CA 94102</p>
          </div>
        </div>
        <div class="bw-contact-block">
          <div class="bw-contact-icon">📞</div>
          <div>
            <strong>Call Us</strong>
            <p>+1 (415) 800-9200<br/>Mon–Fri, 9am–6pm PST</p>
          </div>
        </div>
        <div class="bw-contact-block">
          <div class="bw-contact-icon">✉️</div>
          <div>
            <strong>Email Us</strong>
            <p>hello@nexacorp.com<br/>support@nexacorp.com</p>
          </div>
        </div>
        <div class="bw-contact-block">
          <div class="bw-contact-icon">🌐</div>
          <div>
            <strong>Follow Us</strong>
            <p>LinkedIn · Twitter · Instagram</p>
          </div>
        </div>
      </div>
      <!-- Form -->
      <form class="bw-contact-form" onsubmit="return false;">
        <div class="bw-form-row">
          <div class="bw-form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Smith" class="bw-input"/>
          </div>
          <div class="bw-form-group">
            <label>Company</label>
            <input type="text" placeholder="Acme Inc." class="bw-input"/>
          </div>
        </div>
        <div class="bw-form-row">
          <div class="bw-form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@acme.com" class="bw-input"/>
          </div>
          <div class="bw-form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+1 (555) 000-0000" class="bw-input"/>
          </div>
        </div>
        <div class="bw-form-group">
          <label>Service Interested In</label>
          <select class="bw-input">
            <option value="">Select a service…</option>
            <option>Business Strategy</option>
            <option>Web &amp; App Development</option>
            <option>Digital Marketing</option>
            <option>Cloud &amp; IT Infrastructure</option>
            <option>Data &amp; Analytics</option>
            <option>Cybersecurity</option>
          </select>
        </div>
        <div class="bw-form-group">
          <label>Message</label>
          <textarea placeholder="Tell us about your project, goals, or challenges…" rows="5" class="bw-input bw-textarea"></textarea>
        </div>
        <button type="submit" class="bw-btn-primary bw-submit">Send Message →</button>
      </form>
    </div>
  </div>
</section>

<!-- ════════ FOOTER ════════ -->
<footer class="bw-footer">
  <div class="bw-footer-top">
    <div class="bw-footer-brand">
      <div class="bw-footer-logo-row">
        <div class="bw-footer-logobox"></div>
        <span class="bw-footer-name">NexaCorp</span>
      </div>
      <p class="bw-footer-desc">A full-service consulting and technology firm. Building better businesses since 2012.</p>
      <div class="bw-footer-socials">
        <a href="#">in</a>
        <a href="#">tw</a>
        <a href="#">ig</a>
        <a href="#">gh</a>
      </div>
    </div>
    <div class="bw-footer-col">
      <h4>Services</h4>
      <a href="#">Business Strategy</a>
      <a href="#">Web Development</a>
      <a href="#">Digital Marketing</a>
      <a href="#">Cloud Infrastructure</a>
      <a href="#">Data &amp; Analytics</a>
    </div>
    <div class="bw-footer-col">
      <h4>Company</h4>
      <a href="#">About Us</a>
      <a href="#">Our Team</a>
      <a href="#">Careers</a>
      <a href="#">Press</a>
      <a href="#">Blog</a>
    </div>
    <div class="bw-footer-col">
      <h4>Contact</h4>
      <a href="#">hello@nexacorp.com</a>
      <a href="#">+1 (415) 800-9200</a>
      <a href="#">1200 Market St, SF</a>
      <a href="#">Mon–Fri, 9am–6pm PST</a>
    </div>
  </div>
  <div class="bw-footer-bottom">
    <p>© 2025 NexaCorp, Inc. All rights reserved.</p>
    <div class="bw-footer-legal">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Policy</a>
    </div>
  </div>
</footer>

</div>`,
    css: `
/* ══ Reset ═══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', system-ui, sans-serif; background: #fff; color: #111; line-height: 1.6; }
a { text-decoration: none; }
img { max-width: 100%; display: block; }

/* ══ NAV ═════════════════════════════════════════════ */
.bw-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 64px; background: #fff;
  border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 100;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}
.bw-nav-brand { display: flex; align-items: center; gap: 10px; }
.bw-nav-logo { width: 36px; height: 36px; background: #0ea5e9; border-radius: 8px; }
.bw-brand-name { font-size: 1.2rem; font-weight: 800; color: #0c4a6e; letter-spacing: -0.02em; }
.bw-nav-links { display: flex; align-items: center; gap: 28px; font-size: 0.9rem; }
.bw-nav-links a { color: #374151; font-weight: 500; transition: color 0.2s; }
.bw-nav-links a:hover { color: #0ea5e9; }
.bw-nav-cta {
  background: #0ea5e9; color: #fff !important; padding: 9px 22px;
  border-radius: 8px; font-weight: 700; transition: background 0.2s;
}
.bw-nav-cta:hover { background: #0284c7; }

/* ══ LAYOUT ══════════════════════════════════════════ */
.bw-container { max-width: 1180px; margin: 0 auto; padding: 0 64px; }
.bw-section { padding: 96px 0; }
.bw-section-head { text-align: center; margin-bottom: 56px; }
.bw-label {
  display: inline-block; color: #0ea5e9; font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 12px;
}
.bw-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 900;
  color: #0c4a6e; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 16px;
}
.bw-subtitle { color: #6b7280; font-size: 1.05rem; max-width: 520px; margin: 0 auto; line-height: 1.7; }
.bw-body { color: #6b7280; font-size: 1rem; line-height: 1.8; }
.bw-sky { color: #0ea5e9; }

/* ══ BUTTONS ═════════════════════════════════════════ */
.bw-btn-primary {
  background: #0ea5e9; color: #fff; padding: 13px 28px; border-radius: 8px;
  font-weight: 700; font-size: 0.95rem; transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3);
}
.bw-btn-primary:hover { background: #0284c7; transform: translateY(-1px); }
.bw-btn-ghost {
  border: 2px solid #e5e7eb; color: #374151; padding: 13px 28px;
  border-radius: 8px; font-weight: 700; font-size: 0.95rem; transition: all 0.2s;
}
.bw-btn-ghost:hover { border-color: #0ea5e9; color: #0ea5e9; }

/* ══ HERO ════════════════════════════════════════════ */
.bw-hero {
  background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #fafafa 100%);
  padding-bottom: 0; overflow: hidden;
}
.bw-hero-bg {
  position: absolute; width: 800px; height: 600px;
  background: radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%);
  top: -100px; right: -200px; pointer-events: none;
}
.bw-hero-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: center; padding-top: 80px; padding-bottom: 80px;
  position: relative;
}
.bw-hero-eyebrow {
  display: inline-block; background: #e0f2fe; color: #0ea5e9;
  font-size: 0.78rem; font-weight: 700; padding: 6px 14px;
  border-radius: 999px; margin-bottom: 20px; border: 1px solid #bae6fd;
}
.bw-hero-h1 {
  font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 900;
  line-height: 1.1; letter-spacing: -0.03em; color: #0c4a6e; margin-bottom: 20px;
}
.bw-hero-sub {
  color: #6b7280; font-size: 1.05rem; line-height: 1.75; margin-bottom: 36px; max-width: 480px;
}
.bw-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.bw-hero-visual { position: relative; }
.bw-hero-img { border-radius: 20px; width: 100%; object-fit: cover; height: 420px; box-shadow: 0 24px 60px rgba(0,0,0,0.12); }
.bw-metric {
  position: absolute; background: #fff; border-radius: 12px; padding: 14px 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 2px;
}
.bw-metric-num { font-size: 1.4rem; font-weight: 900; color: #0c4a6e; line-height: 1; }
.bw-metric-label { font-size: 0.72rem; color: #6b7280; font-weight: 500; }
.bw-m1 { top: -10px; right: 20px; }
.bw-m2 { bottom: 20px; left: -20px; }

/* Stats bar */
.bw-stats-bar {
  background: #0c4a6e; color: #fff;
  display: flex; align-items: center; justify-content: center;
  gap: 0; padding: 28px 64px; flex-wrap: wrap;
}
.bw-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 48px; }
.bw-stat-num { font-size: 2rem; font-weight: 900; color: #38bdf8; line-height: 1; }
.bw-stat-lbl { font-size: 0.8rem; color: rgba(255,255,255,0.6); font-weight: 500; }
.bw-stat-div { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }

/* ══ SERVICES ════════════════════════════════════════ */
.bw-services-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
}
.bw-svc-card {
  background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;
  padding: 28px; transition: all 0.25s; cursor: default;
}
.bw-svc-card:hover {
  border-color: #7dd3fc; box-shadow: 0 8px 28px rgba(14,165,233,0.1);
  transform: translateY(-2px);
}
.bw-svc-featured {
  background: #f0f9ff; border-color: #bae6fd;
}
.bw-svc-icon { font-size: 2rem; margin-bottom: 14px; }
.bw-svc-card h3 { font-size: 1rem; font-weight: 800; color: #0c4a6e; margin-bottom: 10px; }
.bw-svc-card p { font-size: 0.875rem; color: #6b7280; line-height: 1.65; margin-bottom: 16px; }
.bw-svc-link { font-size: 0.85rem; font-weight: 700; color: #0ea5e9; transition: color 0.2s; }
.bw-svc-link:hover { color: #0284c7; text-decoration: underline; }

/* ══ ABOUT ═══════════════════════════════════════════ */
.bw-about-section { background: #f8fafc; }
.bw-about-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
}
.bw-about-img-col { position: relative; }
.bw-about-img { border-radius: 20px; width: 100%; height: 460px; object-fit: cover; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
.bw-about-badge {
  position: absolute; bottom: 24px; right: -24px;
  background: #0ea5e9; color: #fff; border-radius: 14px;
  padding: 16px 22px; display: flex; flex-direction: column; align-items: center;
  box-shadow: 0 8px 24px rgba(14,165,233,0.35);
}
.bw-badge-num { font-size: 1.8rem; font-weight: 900; line-height: 1; }
.bw-badge-txt { font-size: 0.72rem; font-weight: 600; opacity: 0.85; text-align: center; margin-top: 3px; }
.bw-about-text .bw-title { text-align: left; }
.bw-about-checkmarks { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.bw-check { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 600; color: #0c4a6e; }

/* ══ TESTIMONIALS ════════════════════════════════════ */
.bw-testi-section { background: #0c4a6e; }
.bw-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.bw-testi-card {
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 14px;
}
.bw-testi-accent {
  background: rgba(14,165,233,0.2); border-color: rgba(125,211,252,0.4);
}
.bw-testi-stars { color: #fbbf24; letter-spacing: 2px; font-size: 0.95rem; }
.bw-testi-quote { color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.7; font-style: italic; flex: 1; }
.bw-testi-person { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.bw-testi-av { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.2); }
.bw-testi-person strong { display: block; color: #fff; font-size: 0.9rem; }
.bw-testi-person span { color: rgba(255,255,255,0.45); font-size: 0.78rem; }

/* ══ CONTACT ═════════════════════════════════════════ */
.bw-contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; align-items: start; }
.bw-contact-info { display: flex; flex-direction: column; gap: 28px; }
.bw-contact-block { display: flex; gap: 16px; align-items: flex-start; }
.bw-contact-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
.bw-contact-block strong { display: block; font-size: 0.9rem; color: #0c4a6e; font-weight: 700; margin-bottom: 4px; }
.bw-contact-block p { font-size: 0.875rem; color: #6b7280; line-height: 1.6; }

/* Form */
.bw-contact-form { display: flex; flex-direction: column; gap: 16px; }
.bw-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.bw-form-group { display: flex; flex-direction: column; gap: 6px; }
.bw-form-group label { font-size: 0.82rem; font-weight: 600; color: #374151; }
.bw-input {
  border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 11px 14px;
  font-size: 0.9rem; color: #111; outline: none; width: 100%;
  transition: border-color 0.2s; font-family: inherit; background: #fff;
}
.bw-input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
.bw-textarea { resize: vertical; min-height: 120px; }
.bw-submit {
  display: block; width: 100%; padding: 14px;
  border: none; cursor: pointer; font-family: inherit;
  font-size: 1rem; border-radius: 8px;
}

/* ══ FOOTER ══════════════════════════════════════════ */
.bw-footer { background: #071c2c; color: rgba(255,255,255,0.5); }
.bw-footer-top {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px; padding: 60px 64px 40px;
}
.bw-footer-logo-row { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.bw-footer-logobox { width: 32px; height: 32px; background: #0ea5e9; border-radius: 7px; }
.bw-footer-name { font-size: 1.1rem; font-weight: 800; color: #fff; }
.bw-footer-desc { font-size: 0.85rem; line-height: 1.6; max-width: 220px; color: rgba(255,255,255,0.45); margin-bottom: 20px; }
.bw-footer-socials { display: flex; gap: 10px; }
.bw-footer-socials a {
  width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6);
  font-size: 0.75rem; font-weight: 700; transition: all 0.2s;
}
.bw-footer-socials a:hover { background: #0ea5e9; color: #fff; }
.bw-footer-col h4 { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; margin-bottom: 16px; }
.bw-footer-col { display: flex; flex-direction: column; gap: 10px; }
.bw-footer-col a { font-size: 0.875rem; color: rgba(255,255,255,0.45); transition: color 0.2s; }
.bw-footer-col a:hover { color: #7dd3fc; }
.bw-footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 20px 64px; font-size: 0.8rem; flex-wrap: wrap; gap: 12px;
}
.bw-footer-legal { display: flex; gap: 20px; }
.bw-footer-legal a { color: rgba(255,255,255,0.4); transition: color 0.2s; }
.bw-footer-legal a:hover { color: rgba(255,255,255,0.8); }

/* ══ RESPONSIVE ══════════════════════════════════════ */
@media (max-width: 1024px) {
  .bw-hero-inner     { grid-template-columns: 1fr; gap: 40px; }
  .bw-hero-visual    { display: none; }
  .bw-services-grid  { grid-template-columns: repeat(2, 1fr); }
  .bw-testi-grid     { grid-template-columns: repeat(2, 1fr); }
  .bw-about-inner    { grid-template-columns: 1fr; }
  .bw-about-img      { height: 300px; }
  .bw-about-badge    { right: 0; }
  .bw-contact-grid   { grid-template-columns: 1fr; }
  .bw-footer-top     { grid-template-columns: 1fr 1fr; }
  .bw-container      { padding: 0 32px; }
  .bw-nav            { padding: 16px 32px; }
  .bw-stats-bar      { padding: 24px 32px; gap: 0; }
}
@media (max-width: 640px) {
  .bw-services-grid  { grid-template-columns: 1fr; }
  .bw-testi-grid     { grid-template-columns: 1fr; }
  .bw-form-row       { grid-template-columns: 1fr; }
  .bw-footer-top     { grid-template-columns: 1fr; gap: 28px; padding: 40px 24px; }
  .bw-footer-bottom  { flex-direction: column; text-align: center; padding: 16px 24px; }
  .bw-stat           { padding: 0 20px; }
  .bw-nav-links      { gap: 12px; font-size: 0.8rem; }
  .bw-section        { padding: 64px 0; }
}`,
  },
};
