export const event = {
  name: 'Event / Conference Landing',
  html: `<div id="ev-root">
    <!-- HERO -->
    <header class="ev-hero">
      <div class="ev-hero-overlay"></div>
      <nav class="ev-nav">
        <div class="ev-container ev-nav-flex">
          <span class="ev-logo">DEVSUMMIT.26</span>
          <div class="ev-nav-links">
            <a href="#about">About</a>
            <a href="#speakers">Speakers</a>
            <a href="#schedule">Schedule</a>
            <a href="#pricing" class="ev-nav-cta">Register Now</a>
          </div>
        </div>
      </nav>

      <div class="ev-container ev-hero-content">
        <div class="ev-date-badge">📅 SEPT 14-16, 2026 • SF & VIRTUAL</div>
        <h1 class="ev-title">Build the Future of the Web</h1>
        <p class="ev-desc">Join 5,000+ engineers, designers, and innovators for three days of cutting-edge frontend talks, hands-on workshops, and immersive hackathons.</p>
        <div class="ev-actions">
          <a href="#pricing" class="ev-btn-primary">Get Your Ticket</a>
          <a href="#speakers" class="ev-btn-ghost">View Speakers</a>
        </div>
      </div>
    </header>

    <!-- KEY STATS -->
    <section class="ev-stats">
      <div class="ev-container ev-stats-grid">
        <div class="ev-stat-card">
          <h2>40+</h2>
          <p>Global Speakers</p>
        </div>
        <div class="ev-stat-card">
          <h2>3</h2>
          <p>Practical Tracks</p>
        </div>
        <div class="ev-stat-card">
          <h2>24h</h2>
          <p>Active Networking</p>
        </div>
        <div class="ev-stat-card">
          <h2>5k+</h2>
          <p>Attendees</p>
        </div>
      </div>
    </section>

    <!-- SPEAKERS -->
    <section class="ev-section" id="speakers">
      <div class="ev-container">
        <div class="ev-center-header">
          <span class="ev-label">THE LINEUP</span>
          <h2 class="ev-section-title">Keynote Speakers</h2>
        </div>

        <div class="ev-speakers-grid">
          
          <div class="ev-speaker-card">
            <div class="ev-speaker-img-wrap">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" alt="Speaker" />
            </div>
            <div class="ev-speaker-info">
              <h3>Sarah Chen</h3>
              <p class="ev-speaker-title">VP of Eng, Vercel</p>
              <span class="ev-speaker-topic">NextJS & React Server Components</span>
            </div>
          </div>

          <div class="ev-speaker-card">
            <div class="ev-speaker-img-wrap">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" alt="Speaker" />
            </div>
            <div class="ev-speaker-info">
              <h3>Marcus Aurelius</h3>
              <p class="ev-speaker-title">Principal Designer, Airbnb</p>
              <span class="ev-speaker-topic">The AI Design Paradigm</span>
            </div>
          </div>

          <div class="ev-speaker-card">
            <div class="ev-speaker-img-wrap">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" alt="Speaker" />
            </div>
            <div class="ev-speaker-info">
              <h3>Linus Torvaldsen</h3>
              <p class="ev-speaker-title">Creator of WebAssembly Core</p>
              <span class="ev-speaker-topic">Running OS in Browser Sandbox</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SCHEDULE / TIMELINE -->
    <section class="ev-section ev-bg-darker" id="schedule">
      <div class="ev-container ev-timeline-container">
        <div class="ev-center-header">
          <span class="ev-label">THE PROGRAM</span>
          <h2 class="ev-section-title text-white">Event Schedule</h2>
        </div>

        <div class="ev-timeline">
          
          <div class="ev-timeline-item">
            <div class="ev-time">09:00 AM</div>
            <div class="ev-event-details">
              <h4>Opening Keynote & Announcements</h4>
              <p>Kickstart DevSummit with major announcements and our vision for the web in 2026.</p>
            </div>
          </div>

          <div class="ev-timeline-item">
            <div class="ev-time">10:30 AM</div>
            <div class="ev-event-details">
              <h4>Designing for Latency</h4>
              <p>An expert panel on optimizing layouts, rendering loops, and lazy loading assets.</p>
            </div>
          </div>

          <div class="ev-timeline-item">
            <div class="ev-time">02:00 PM</div>
            <div class="ev-event-details">
              <h4>WebAssembly & Beyond</h4>
              <p>A deep dive into high-performance web systems and the compilation pipeline.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- PRICING / REGISTRATION -->
    <section class="ev-section" id="pricing">
      <div class="ev-container">
        <div class="ev-center-header">
          <span class="ev-label">TICKETS</span>
          <h2 class="ev-section-title">Claim Your Space</h2>
        </div>

        <div class="ev-pricing-grid">
          
          <div class="ev-price-card">
            <h3>Standard Pass</h3>
            <p class="ev-price-value">$299</p>
            <ul class="ev-price-features">
              <li>Full access to all keynote sessions</li>
              <li>Virtual networking platform</li>
              <li>Event recordings for 30 days</li>
            </ul>
            <button class="ev-btn-price">Buy Standard Pass</button>
          </div>

          <div class="ev-price-card ev-vip">
            <div class="ev-vip-badge">Popular</div>
            <h3>VIP Pass</h3>
            <p class="ev-price-value">$699</p>
            <ul class="ev-price-features">
              <li>All Standard features + VIP lounge</li>
              <li>Hands-on in-person workshops</li>
              <li>Exclusive speaker dinner invite</li>
              <li>Lifetime access to talk recordings</li>
            </ul>
            <button class="ev-btn-price">Buy VIP Pass</button>
          </div>

        </div>
      </div>
    </section>
  </div>`,
  css: `
    #ev-root {
      background: #0f172a;
      color: #cbd5e1;
      font-family: 'Inter', sans-serif;
      margin: 0;
    }
    .ev-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .ev-section {
      padding: 100px 0;
    }
    .ev-bg-darker {
      background: #020617;
    }
    .ev-label {
      font-size: 0.75rem;
      letter-spacing: 3px;
      color: #a78bfa;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 12px;
      display: block;
    }
    .ev-section-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: white;
      margin-top: 0;
      margin-bottom: 32px;
    }
    .ev-nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      padding: 28px 0;
    }
    .ev-nav-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ev-logo {
      color: white;
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .ev-nav-links a {
      color: #94a3b8;
      text-decoration: none;
      margin-left: 28px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .ev-nav-links a:hover {
      color: white;
    }
    .ev-nav-cta {
      background: linear-gradient(135deg, #7c3aed, #a78bfa);
      color: white !important;
      padding: 10px 24px;
      border-radius: 99px;
      box-shadow: 0 4px 14px rgba(124,58,237,0.3);
    }
    .ev-hero {
      background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80');
      background-size: cover;
      background-position: center;
      min-height: 85vh;
      display: flex;
      align-items: center;
      position: relative;
      color: white;
    }
    .ev-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.95) 100%);
    }
    .ev-hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin-top: 100px;
    }
    .ev-date-badge {
      display: inline-block;
      background: rgba(167, 139, 250, 0.15);
      border: 1px solid rgba(167, 139, 250, 0.3);
      color: #c084fc;
      padding: 8px 16px;
      border-radius: 99px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 24px;
    }
    .ev-title {
      font-size: 4.5rem;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 24px 0;
    }
    .ev-desc {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #94a3b8;
      margin-bottom: 40px;
    }
    .ev-actions {
      display: flex;
      gap: 16px;
    }
    .ev-btn-primary {
      background: #7c3aed;
      color: white;
      text-decoration: none;
      padding: 18px 36px;
      border-radius: 99px;
      font-weight: bold;
      transition: background 0.2s;
    }
    .ev-btn-primary:hover {
      background: #6d28d9;
    }
    .ev-btn-ghost {
      border: 1px solid #475569;
      color: white;
      text-decoration: none;
      padding: 18px 36px;
      border-radius: 99px;
      font-weight: bold;
      transition: background 0.2s;
    }
    .ev-btn-ghost:hover {
      background: rgba(255,255,255,0.05);
    }
    .ev-stats {
      background: #020617;
      border-top: 1px solid #1e293b;
      border-bottom: 1px solid #1e293b;
      padding: 48px 0;
    }
    .ev-stats-grid {
      display: grid;
      grid-template-cols: repeat(4, 1fr);
      text-align: center;
    }
    .ev-stat-card h2 {
      font-size: 3rem;
      font-weight: 900;
      color: white;
      margin: 0 0 8px 0;
    }
    .ev-stat-card p {
      color: #64748b;
      margin: 0;
      font-weight: 600;
    }
    .ev-center-header {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 64px auto;
    }
    .ev-speakers-grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 32px;
    }
    .ev-speaker-card {
      background: #1e293b;
      border-radius: 20px;
      border: 1px solid #334155;
      overflow: hidden;
    }
    .ev-speaker-img-wrap {
      aspect-ratio: 1/1;
      overflow: hidden;
    }
    .ev-speaker-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ev-speaker-info {
      padding: 24px;
    }
    .ev-speaker-info h3 {
      font-size: 1.25rem;
      color: white;
      margin: 0 0 4px 0;
    }
    .ev-speaker-title {
      font-size: 0.9rem;
      color: #94a3b8;
      display: block;
      margin-bottom: 16px;
    }
    .ev-speaker-topic {
      font-size: 0.8rem;
      font-weight: bold;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      padding: 4px 12px;
      border-radius: 99px;
    }
    .ev-timeline-container {
      max-width: 800px;
    }
    .ev-timeline {
      position: relative;
      padding-left: 32px;
      border-left: 2px solid #334155;
    }
    .ev-timeline-item {
      position: relative;
      margin-bottom: 48px;
    }
    .ev-timeline-item::before {
      content: '';
      position: absolute;
      left: -41px;
      top: 6px;
      width: 16px;
      height: 16px;
      border-radius: 99px;
      background: #7c3aed;
      border: 4px solid #020617;
    }
    .ev-time {
      font-family: monospace;
      font-weight: bold;
      color: #a78bfa;
      margin-bottom: 8px;
    }
    .ev-event-details h4 {
      font-size: 1.3rem;
      color: white;
      margin: 0 0 8px 0;
    }
    .ev-event-details p {
      color: #94a3b8;
      margin: 0;
      line-height: 1.5;
    }
    .ev-pricing-grid {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .ev-price-card {
      background: #1e293b;
      border-radius: 24px;
      border: 1px solid #334155;
      padding: 48px;
      display: flex;
      flex-direction: column;
    }
    .ev-price-value {
      font-size: 3.5rem;
      font-weight: 900;
      color: white;
      margin: 16px 0 32px 0;
    }
    .ev-price-features {
      list-style: none;
      padding: 0;
      margin: 0 0 48px 0;
      flex-grow: 1;
    }
    .ev-price-features li {
      margin-bottom: 16px;
      font-weight: 500;
    }
    .ev-price-features li::before {
      content: '✓ ';
      color: #10b981;
      font-weight: bold;
      margin-right: 8px;
    }
    .ev-btn-price {
      width: 100%;
      border: none;
      background: #475569;
      color: white;
      padding: 16px;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ev-btn-price:hover {
      background: #64748b;
    }
    .ev-vip {
      border-color: #7c3aed;
      background: linear-gradient(180deg, #1e293b 0%, rgba(124,58,237,0.1) 100%);
      position: relative;
    }
    .ev-vip-badge {
      position: absolute;
      top: 24px;
      right: 24px;
      background: #7c3aed;
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 99px;
    }
    .ev-vip .ev-btn-price {
      background: #7c3aed;
    }
    .ev-vip .ev-btn-price:hover {
      background: #6d28d9;
    }
  `
};
