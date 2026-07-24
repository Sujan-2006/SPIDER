export const saasDark = {
  name: 'SaaS Dark Mode Landing',
  html: `<div id="sd-root">
    <nav class="sd-nav">
      <div class="sd-container sd-flex-nav">
        <span class="sd-logo">AETHER.io</span>
        <div class="sd-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#cta" class="sd-cta-btn">Start Free</a>
        </div>
      </div>
    </nav>
    <header class="sd-hero">
      <div class="sd-container">
        <span class="sd-tag">v2.0 NOW LIVE</span>
        <h1 class="sd-title">Deploy code at the speed of thought</h1>
        <p class="sd-sub">Aether is a next-generation cloud runtime built for edge functions, optimized for maximum speed and zero cold starts.</p>
        <div class="sd-actions">
          <a href="#cta" class="sd-btn-solid">Get Started Free</a>
          <a href="#features" class="sd-btn-outline">Read Docs</a>
        </div>
      </div>
    </header>
  </div>`,
  css: `
    #sd-root {
      background: #030712;
      color: #f3f4f6;
      font-family: 'Inter', sans-serif;
      padding-bottom: 100px;
    }
    .sd-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
    }
    .sd-nav {
      padding: 24px 0;
      border-bottom: 1px solid #1f2937;
    }
    .sd-flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sd-logo {
      font-weight: 900;
      letter-spacing: 1px;
      color: #3b82f6;
      font-size: 1.25rem;
    }
    .sd-links a {
      color: #9ca3af;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .sd-links a:hover {
      color: white;
    }
    .sd-cta-btn {
      background: #3b82f6;
      color: white !important;
      padding: 8px 16px;
      border-radius: 6px;
    }
    .sd-hero {
      padding: 120px 0;
    }
    .sd-tag {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #60a5fa;
      padding: 6px 12px;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 24px;
    }
    .sd-title {
      font-size: 3.75rem;
      font-weight: 900;
      color: white;
      letter-spacing: -2px;
      line-height: 1.1;
      margin-bottom: 24px;
    }
    .sd-sub {
      font-size: 1.2rem;
      color: #9ca3af;
      max-width: 600px;
      margin: 0 auto 40px auto;
      line-height: 1.5;
    }
    .sd-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .sd-btn-solid {
      background: white;
      color: #030712;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: bold;
      text-decoration: none;
    }
    .sd-btn-outline {
      border: 1px solid #374151;
      color: white;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: bold;
      text-decoration: none;
    }
  `
};
