export const gym = {
  name: 'Fitness & Gym Center',
  html: `<div id="gy-root">
    <nav class="gy-nav">
      <div class="gy-container gy-flex-nav">
        <span class="gy-logo">KINETIC</span>
        <div class="gy-links">
          <a href="#about">Classes</a>
          <a href="#trainers">Team</a>
          <a href="#join" class="gy-cta">Join Gym</a>
        </div>
      </div>
    </nav>
    <header class="gy-hero">
      <div class="gy-hero-overlay"></div>
      <div class="gy-container gy-hero-content">
        <span class="gy-badge">NO EXCUSES</span>
        <h1>UNLEASH YOUR PURE ENERGY</h1>
        <p>State-of-the-art weights, professional strength coaching, and high-intensity metabolic conditioning classes tailored to accelerate your results.</p>
        <div class="gy-actions">
          <a href="#" class="gy-btn-primary">View Class Schedule</a>
          <a href="#" class="gy-btn-outline">Free Day Pass</a>
        </div>
      </div>
    </header>
  </div>`,
  css: `
    #gy-root {
      background: #000000;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      padding-bottom: 100px;
    }
    .gy-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .gy-nav {
      padding: 24px 0;
      border-bottom: 1px solid #111111;
    }
    .gy-flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .gy-logo {
      font-weight: 900;
      letter-spacing: 2px;
      color: #f97316;
      font-size: 1.5rem;
    }
    .gy-links a {
      color: #a3a3a3;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .gy-links a:hover {
      color: white;
    }
    .gy-cta {
      background: #f97316;
      color: black !important;
      padding: 8px 18px;
      border-radius: 4px;
      font-weight: bold;
    }
    .gy-hero {
      background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80');
      background-size: cover;
      background-position: center;
      height: 70vh;
      display: flex;
      align-items: center;
      position: relative;
    }
    .gy-hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
    }
    .gy-hero-content {
      position: relative;
      z-index: 1;
      max-width: 650px;
    }
    .gy-badge {
      display: inline-block;
      background: #f97316;
      color: black;
      padding: 4px 10px;
      border-radius: 2px;
      font-size: 0.75rem;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .gy-hero h1 {
      font-size: 4rem;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 16px 0;
    }
    .gy-hero p {
      font-size: 1.1rem;
      color: #a3a3a3;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .gy-actions {
      display: flex;
      gap: 16px;
    }
    .gy-btn-primary {
      background: #f97316;
      color: black;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 4px;
      font-weight: bold;
    }
    .gy-btn-outline {
      border: 1px solid #f97316;
      color: #f97316;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 4px;
      font-weight: bold;
    }
  `
};
