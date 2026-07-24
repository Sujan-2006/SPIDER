export const mobileApp = {
  name: 'Mobile App Landing Page',
  html: `<div id="ma-root">
    <nav class="ma-nav">
      <div class="ma-container ma-flex-nav">
        <span class="ma-logo">⚡ FLASH</span>
        <div class="ma-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#download" class="ma-cta">Download App</a>
        </div>
      </div>
    </nav>
    <header class="ma-hero">
      <div class="ma-container ma-split">
        <div class="ma-hero-text">
          <span class="ma-badge">productivity app</span>
          <h1>Supercharge Your Task Workflow</h1>
          <p>Flash organizes your daily scheduling list, tracks time blocks, and sends minimal notifications to keep you in focus mode.</p>
          <div class="ma-app-links">
            <span class="ma-store">Get on iOS 🍏</span>
            <span class="ma-store">Get on Android 🤖</span>
          </div>
        </div>
        <div class="ma-hero-mockup">
          <div class="ma-phone">
            <div class="ma-screen">
              <h4>Today's Goals</h4>
              <div class="ma-task">✦ Write code</div>
              <div class="ma-task">✦ Design layouts</div>
              <div class="ma-task">✦ Deploy updates</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>`,
  css: `
    #ma-root {
      background: #fafaf9;
      color: #1c1917;
      font-family: 'Inter', sans-serif;
      padding-bottom: 100px;
    }
    .ma-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .ma-nav {
      padding: 24px 0;
      border-bottom: 1px solid #e7e5e4;
    }
    .ma-flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ma-logo {
      font-weight: 900;
      letter-spacing: 1px;
      color: #6366f1;
      font-size: 1.25rem;
    }
    .ma-links a {
      color: #57534e;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .ma-links a:hover {
      color: black;
    }
    .ma-cta {
      background: #6366f1;
      color: white !important;
      padding: 8px 18px;
      border-radius: 99px;
    }
    .ma-hero {
      padding: 100px 0;
    }
    .ma-split {
      display: grid;
      grid-template-cols: 1.2fr 0.8fr;
      gap: 64px;
      align-items: center;
    }
    .ma-badge {
      display: inline-block;
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .ma-hero-text h1 {
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.1;
      margin-bottom: 16px;
    }
    .ma-hero-text p {
      font-size: 1.1rem;
      color: #57534e;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .ma-app-links {
      display: flex;
      gap: 16px;
    }
    .ma-store {
      background: #1c1917;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .ma-phone {
      width: 250px;
      height: 500px;
      border: 8px solid #1c1917;
      border-radius: 36px;
      background: white;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      padding: 16px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
    }
    .ma-screen {
      background: #f5f5f4;
      flex: 1;
      border-radius: 20px;
      padding: 16px;
    }
    .ma-screen h4 {
      margin-top: 0;
      margin-bottom: 16px;
      font-weight: bold;
    }
    .ma-task {
      background: white;
      padding: 10px 14px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
  `
};
