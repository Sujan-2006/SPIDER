export const crypto = {
  name: 'Web3 & Crypto Portal',
  html: `<div id="cr-root">
    <nav class="cr-nav">
      <div class="cr-container cr-flex-nav">
        <span class="cr-logo">◇ SOLIS</span>
        <div class="cr-links">
          <a href="#about">Ecosystem</a>
          <a href="#token">Token</a>
          <a href="#app" class="cr-cta">Launch App</a>
        </div>
      </div>
    </nav>
    <header class="cr-hero">
      <div class="cr-container">
        <span class="cr-badge">DECENTRALIZED PROTOCOL</span>
        <h1>Liquid Staking For The Cosmos</h1>
        <p>Stake your digital assets, earn compounding rewards, and participate in network governance while keeping your capital completely liquid.</p>
        <div class="cr-actions">
          <a href="#" class="cr-btn-primary">Stake Now</a>
          <a href="#" class="cr-btn-secondary">Whitepaper</a>
        </div>
      </div>
    </header>
  </div>`,
  css: `
    #cr-root {
      background: #0b0f19;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      padding-bottom: 100px;
    }
    .cr-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
    }
    .cr-nav {
      padding: 24px 0;
      border-bottom: 1px solid #1e293b;
    }
    .cr-flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cr-logo {
      font-weight: 900;
      letter-spacing: 2px;
      color: #10b981;
      font-size: 1.25rem;
    }
    .cr-links a {
      color: #94a3b8;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .cr-links a:hover {
      color: white;
    }
    .cr-cta {
      background: #10b981;
      color: #0b0f19 !important;
      padding: 8px 18px;
      border-radius: 99px;
      font-weight: 700;
    }
    .cr-hero {
      padding: 120px 0;
      background-image: radial-gradient(circle at top, rgba(16, 185, 129, 0.08) 0%, rgba(11, 15, 25, 0) 60%);
    }
    .cr-badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #34d399;
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    .cr-hero h1 {
      font-size: 4rem;
      font-weight: 900;
      color: white;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 24px 0;
    }
    .cr-hero p {
      font-size: 1.25rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 40px auto;
      line-height: 1.5;
    }
    .cr-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .cr-btn-primary {
      background: #10b981;
      color: #0b0f19;
      padding: 16px 32px;
      border-radius: 99px;
      font-weight: bold;
      text-decoration: none;
    }
    .cr-btn-secondary {
      border: 1px solid #334155;
      color: white;
      padding: 16px 32px;
      border-radius: 99px;
      font-weight: bold;
      text-decoration: none;
    }
  `
};
