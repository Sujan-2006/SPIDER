export const blog = {
  name: 'Personal Blog / Creator',
  html: `<div id="bl-root">
    <!-- HERO -->
    <header class="bl-hero">
      <nav class="bl-nav">
        <div class="bl-container bl-nav-flex">
          <span class="bl-logo">INK.</span>
          <div class="bl-nav-links">
            <a href="#posts">Articles</a>
            <a href="#about">About</a>
            <a href="#newsletter" class="bl-nav-cta">Subscribe</a>
          </div>
        </div>
      </nav>

      <div class="bl-container bl-hero-content">
        <span class="bl-subtitle">A DIGITALLY CURATED JOURNAL</span>
        <h1 class="bl-title">Thoughts on Design, Craft, and the Web</h1>
        <p class="bl-desc">Weekly essays on building visual tools, SaaS interfaces, and design aesthetics in the modern era.</p>
        <div class="bl-newsletter-box">
          <input type="email" placeholder="Type your email..." />
          <button>Subscribe</button>
        </div>
      </div>
    </header>

    <!-- RECENT POSTS -->
    <section class="bl-section" id="posts">
      <div class="bl-container">
        <h2 class="bl-section-title">Latest Writing</h2>
        
        <div class="bl-posts-grid">
          
          <article class="bl-post-card">
            <div class="bl-post-img-wrap">
              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&q=80" alt="Article Thumbnail" />
            </div>
            <div class="bl-post-body">
              <span class="bl-post-tag">DESIGN</span>
              <span class="bl-post-date">July 24, 2026</span>
              <h3>The Renaissance of Visual Web Builders</h3>
              <p>Why modern development tools are focusing heavily on visual compilation layers, and what it means for frontend engineers.</p>
              <a href="#" class="bl-post-link">Read Article →</a>
            </div>
          </article>

          <article class="bl-post-card">
            <div class="bl-post-img-wrap">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80" alt="Article Thumbnail" />
            </div>
            <div class="bl-post-body">
              <span class="bl-post-tag">TECH</span>
              <span class="bl-post-date">July 18, 2026</span>
              <h3>Exploring Local-First Web Architectures</h3>
              <p>An in-depth look at syncing client databases with server data stores, offline sync, and real-time multiplayer states.</p>
              <a href="#" class="bl-post-link">Read Article →</a>
            </div>
          </article>

          <article class="bl-post-card">
            <div class="bl-post-img-wrap">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Article Thumbnail" />
            </div>
            <div class="bl-post-body">
              <span class="bl-post-tag">CRAFT</span>
              <span class="bl-post-date">July 10, 2026</span>
              <h3>Curating Your Digital Atelier</h3>
              <p>How the physical workspace layout affects visual and mental output. Tips on lighting, setups, and tool selectiveness.</p>
              <a href="#" class="bl-post-link">Read Article →</a>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="bl-section bl-bg-dark" id="about">
      <div class="bl-container bl-about-grid">
        <div class="bl-about-img">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80" alt="Author Photo" />
        </div>
        <div class="bl-about-text">
          <span class="bl-subtitle text-orange">THE WRITER</span>
          <h2>Hi, I'm Clara Vance.</h2>
          <p>I'm a digital product designer and writer based in Brooklyn. I study the friction between human hands and computer interfaces.</p>
          <p>Formerly design director at Stripe and Figma. Currently consulting for early stage startup teams.</p>
          <div class="bl-socials">
            <a href="#">Read.cv</a> • <a href="#">Twitter</a> • <a href="#">Substack</a>
          </div>
        </div>
      </div>
    </section>
  </div>`,
  css: `
    #bl-root {
      background: #faf9f6;
      color: #171717;
      font-family: 'Inter', sans-serif;
      margin: 0;
    }
    .bl-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .bl-section {
      padding: 100px 0;
    }
    .bl-bg-dark {
      background: #171717;
      color: #e5e5e5;
    }
    .bl-subtitle {
      font-size: 0.75rem;
      letter-spacing: 2px;
      font-weight: 700;
      color: #e11d48;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: block;
    }
    .bl-section-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.25rem;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 48px;
    }
    .bl-nav {
      padding: 32px 0;
    }
    .bl-nav-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bl-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 900;
    }
    .bl-nav-links a {
      text-decoration: none;
      color: #525252;
      margin-left: 24px;
      font-weight: 500;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .bl-nav-links a:hover {
      color: #171717;
    }
    .bl-nav-cta {
      background: #171717;
      color: white !important;
      padding: 8px 18px;
      border-radius: 4px;
    }
    .bl-hero {
      padding-bottom: 80px;
      border-bottom: 1px solid #e5e5e5;
    }
    .bl-hero-content {
      margin-top: 80px;
      max-width: 700px;
    }
    .bl-title {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      line-height: 1.1;
      font-weight: 900;
      margin: 16px 0;
    }
    .bl-desc {
      font-size: 1.25rem;
      line-height: 1.5;
      color: #525252;
      margin-bottom: 32px;
    }
    .bl-newsletter-box {
      display: flex;
      max-width: 450px;
      background: white;
      border: 1px solid #d4d4d4;
      padding: 6px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .bl-newsletter-box input {
      flex: 1;
      border: none;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      outline: none;
    }
    .bl-newsletter-box button {
      background: #171717;
      color: white;
      border: none;
      padding: 0 20px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
    }
    .bl-posts-grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 32px;
    }
    .bl-post-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      transition: transform 0.2s;
    }
    .bl-post-card:hover {
      transform: translateY(-4px);
    }
    .bl-post-img-wrap {
      aspect-ratio: 16/10;
      overflow: hidden;
    }
    .bl-post-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .bl-post-body {
      padding: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .bl-post-tag {
      font-size: 0.7rem;
      font-weight: bold;
      color: #e11d48;
      letter-spacing: 1px;
      margin-bottom: 8px;
      display: inline-block;
    }
    .bl-post-date {
      font-size: 0.75rem;
      color: #737373;
      margin-left: 12px;
    }
    .bl-post-body h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem;
      margin-top: 0;
      margin-bottom: 12px;
      line-height: 1.3;
    }
    .bl-post-body p {
      font-size: 0.9rem;
      color: #525252;
      line-height: 1.5;
      margin-bottom: 24px;
      flex-grow: 1;
    }
    .bl-post-link {
      font-weight: bold;
      color: #171717;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .bl-about-grid {
      display: grid;
      grid-template-cols: 2fr 3fr;
      gap: 64px;
      align-items: center;
    }
    .bl-about-img {
      border-radius: 12px;
      overflow: hidden;
    }
    .bl-about-img img {
      width: 100%;
      display: block;
    }
    .text-orange {
      color: #f97316;
    }
    .bl-about-text h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: white;
      margin-top: 0;
    }
    .bl-about-text p {
      line-height: 1.6;
      color: #a3a3a3;
    }
    .bl-socials a {
      color: white;
      text-decoration: none;
    }
  `
};
