export const agency = {
  name: 'Modern Creative Agency',
  html: `<div id="ag-root">
    <!-- HERO -->
    <header class="ag-hero">
      <div class="ag-hero-glow"></div>
      <nav class="ag-nav">
        <div class="ag-container ag-nav-flex">
          <span class="ag-logo">NEON.studio</span>
          <div class="ag-nav-links">
            <a href="#about">Aesthetic</a>
            <a href="#services">Craft</a>
            <a href="#cases">Stories</a>
            <a href="#contact" class="ag-nav-cta">Connect</a>
          </div>
        </div>
      </nav>

      <div class="ag-container ag-hero-content">
        <span class="ag-badge">Design & Technology Atelier</span>
        <h1 class="ag-hero-title">WE SHAPE THE<br/>FUTURE OF <span class="ag-text-gradient">BRANDS</span></h1>
        <p class="ag-hero-sub">We partner with forward-thinking creators to sculpt unforgettable digital products and Web3 immersive portals.</p>
        <div class="ag-hero-actions">
          <a href="#cases" class="ag-btn-solid">See Our Craft</a>
          <a href="#contact" class="ag-btn-outline">Initiate Project</a>
        </div>
      </div>
    </header>

    <!-- SERVICES -->
    <section class="ag-section" id="services">
      <div class="ag-container">
        <p class="ag-label">OUR SPECTRUM</p>
        <h2 class="ag-section-title">We craft immersive ecosystems</h2>
        <div class="ag-services-grid">
          <div class="ag-service-card">
            <div class="ag-service-num">01</div>
            <h3>Creative Strategy</h3>
            <p>Developing architectural brand plans that capture attention and create emotional connection.</p>
          </div>
          <div class="ag-service-card">
            <div class="ag-service-num">02</div>
            <h3>3D & WebGL Experiences</h3>
            <p>Building high-end, responsive interactive web portals that defy standard limitations.</p>
          </div>
          <div class="ag-service-card">
            <div class="ag-service-num">03</div>
            <h3>Next-Gen Engineering</h3>
            <p>Robust, clean frontend code built using top stacks to deploy instantly worldwide.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CASES -->
    <section class="ag-section ag-border-t" id="cases">
      <div class="ag-container">
        <p class="ag-label">SELECTED STORIES</p>
        <h2 class="ag-section-title">Case Studies</h2>
        <div class="ag-cases-grid">
          
          <div class="ag-case-card">
            <div class="ag-case-img-wrap">
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80" alt="Case Studio" />
            </div>
            <div class="ag-case-info">
              <h3>Aether Meta-Universe</h3>
              <p>Web design, WebGL development, Identity</p>
            </div>
          </div>

          <div class="ag-case-card">
            <div class="ag-case-img-wrap">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Case Studio" />
            </div>
            <div class="ag-case-info">
              <h3>Zenith DeFi Protocol</h3>
              <p>User Interface, Identity system, Web design</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="ag-footer" id="contact">
      <div class="ag-container">
        <div class="ag-footer-inner">
          <div class="ag-footer-cta">
            <h2>HAVE A VISION?</h2>
            <a href="mailto:hello@neon.studio" class="ag-footer-email">hello@neon.studio →</a>
          </div>
          <div class="ag-footer-meta">
            <p>© 2026 NEON.studio. Designed in space.</p>
            <div class="ag-socials">
              <a href="#">X / Twitter</a>
              <a href="#">Read.cv</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>`,
  css: `
    #ag-root {
      background: #09090b;
      color: #fafafa;
      font-family: 'Outfit', sans-serif;
      margin: 0;
      overflow-x: hidden;
    }
    .ag-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
    }
    .ag-section {
      padding: 120px 0;
    }
    .ag-border-t {
      border-top: 1px solid #27272a;
    }
    .ag-label {
      font-size: 0.75rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #db2777;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .ag-section-title {
      font-size: 2.75rem;
      font-weight: 900;
      letter-spacing: -1px;
      margin: 0 0 64px 0;
      line-height: 1.1;
    }
    .ag-hero {
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding-bottom: 80px;
    }
    .ag-hero-glow {
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 400px;
      background: radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, rgba(9, 9, 11, 0) 70%);
      pointer-events: none;
    }
    .ag-nav {
      padding: 32px 0;
      width: 100%;
    }
    .ag-nav-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ag-logo {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .ag-nav-links a {
      color: #a1a1aa;
      text-decoration: none;
      margin-left: 32px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .ag-nav-links a:hover {
      color: #fafafa;
    }
    .ag-nav-cta {
      border: 1px solid #fafafa;
      padding: 8px 20px;
      border-radius: 99px;
      color: #fafafa !important;
    }
    .ag-nav-cta:hover {
      background: #fafafa;
      color: #09090b !important;
    }
    .ag-hero-content {
      margin-top: 100px;
      max-width: 800px;
      z-index: 1;
    }
    .ag-badge {
      display: inline-block;
      border: 1px solid #3f3f46;
      padding: 6px 16px;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 24px;
      color: #d4d4d8;
    }
    .ag-hero-title {
      font-size: 5rem;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 24px 0;
    }
    .ag-text-gradient {
      background: linear-gradient(to right, #db2777, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .ag-hero-sub {
      font-size: 1.25rem;
      color: #a1a1aa;
      line-height: 1.5;
      margin-bottom: 48px;
      max-width: 600px;
    }
    .ag-hero-actions {
      display: flex;
      gap: 20px;
    }
    .ag-btn-solid {
      background: #fafafa;
      color: #09090b;
      font-weight: 700;
      padding: 16px 36px;
      border-radius: 99px;
      text-decoration: none;
      transition: transform 0.2s, background 0.2s;
    }
    .ag-btn-solid:hover {
      transform: scale(1.03);
      background: #e4e4e7;
    }
    .ag-btn-outline {
      border: 1px solid #3f3f46;
      color: #fafafa;
      font-weight: 600;
      padding: 16px 36px;
      border-radius: 99px;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .ag-btn-outline:hover {
      background: rgba(255,255,255,0.05);
      border-color: #fafafa;
    }
    .ag-services-grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 32px;
    }
    .ag-service-card {
      border: 1px solid #27272a;
      border-radius: 24px;
      padding: 40px;
      background: #18181b/50;
      backdrop-filter: blur(10px);
      transition: border-color 0.3s;
    }
    .ag-service-card:hover {
      border-color: #c084fc;
    }
    .ag-service-num {
      font-size: 0.85rem;
      font-weight: bold;
      color: #db2777;
      margin-bottom: 24px;
    }
    .ag-service-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .ag-service-card p {
      color: #a1a1aa;
      line-height: 1.5;
      margin: 0;
    }
    .ag-cases-grid {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 48px;
    }
    .ag-case-card {
      cursor: pointer;
      display: block;
    }
    .ag-case-img-wrap {
      border-radius: 32px;
      overflow: hidden;
      aspect-ratio: 4/3;
      margin-bottom: 24px;
      background: #18181b;
      position: relative;
    }
    .ag-case-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .ag-case-card:hover img {
      transform: scale(1.05);
    }
    .ag-case-info h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .ag-case-info p {
      color: #71717a;
      margin: 0;
    }
    .ag-footer {
      padding: 120px 0 64px 0;
      border-top: 1px solid #27272a;
    }
    .ag-footer-cta {
      margin-bottom: 80px;
    }
    .ag-footer-cta h2 {
      font-size: 1rem;
      letter-spacing: 2px;
      color: #db2777;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .ag-footer-email {
      font-size: 4rem;
      font-weight: 900;
      color: #fafafa;
      text-decoration: none;
      letter-spacing: -2px;
      line-height: 1.0;
      transition: color 0.2s;
    }
    .ag-footer-email:hover {
      color: #c084fc;
    }
    .ag-footer-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #71717a;
      font-size: 0.9rem;
    }
    .ag-socials a {
      color: #a1a1aa;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .ag-socials a:hover {
      color: #fafafa;
    }
  `
};
