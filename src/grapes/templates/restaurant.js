export const restaurant = {
  name: 'Elegant Restaurant / Cafe',
  html: `<div id="rt-root">
    <!-- HERO -->
    <header class="rt-hero">
      <div class="rt-hero-overlay"></div>
      <nav class="rt-nav">
        <div class="rt-container rt-nav-flex">
          <span class="rt-logo">GUSTO</span>
          <div class="rt-nav-links">
            <a href="#about">Our Story</a>
            <a href="#menu">The Menu</a>
            <a href="#contact">Location</a>
            <a href="#reserve" class="rt-nav-cta">Reserve</a>
          </div>
        </div>
      </nav>

      <div class="rt-container rt-hero-content">
        <span class="rt-subtitle">ESTABLISHED 2018</span>
        <h1 class="rt-title">A Taste of Harmony</h1>
        <p class="rt-desc">Handcrafted local cuisine, seasonal organic ingredients, and a warm, inviting dining space designed to inspire connection.</p>
        <div class="rt-actions">
          <a href="#menu" class="rt-btn-primary">Explore Menu</a>
          <a href="#reserve" class="rt-btn-secondary">Book a Table</a>
        </div>
      </div>
    </header>

    <!-- OUR STORY -->
    <section class="rt-section" id="about">
      <div class="rt-container rt-split">
        <div class="rt-story-text">
          <span class="rt-label">THE KITCHEN</span>
          <h2 class="rt-section-title">Earthy, honest, and local.</h2>
          <p class="rt-body-text">We believe the best memories are created around the dining table. Chef Isabella Rossi crafts custom dishes that respect old culinary customs while introducing modern gastronomic techniques.</p>
          <p class="rt-body-text">Every vegetable, herb, and meat product is sourced directly from certified organic farms within 100 miles of our kitchen doors.</p>
        </div>
        <div class="rt-story-img-wrap">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" alt="Kitchen Prep" />
        </div>
      </div>
    </section>

    <!-- MENU -->
    <section class="rt-section rt-bg-warm" id="menu">
      <div class="rt-container">
        <div class="rt-center-header">
          <span class="rt-label">SEASONAL FLAVORS</span>
          <h2 class="rt-section-title">The Culinary Menu</h2>
        </div>
        
        <div class="rt-menu-grid">
          <div class="rt-menu-column">
            <h3>Starters</h3>
            
            <div class="rt-menu-item">
              <div class="rt-item-header">
                <span class="rt-item-name">Tuscan Garlic Crostini</span>
                <span class="rt-item-price">$14</span>
              </div>
              <p class="rt-item-desc">Toasted sourdough, heirloom cherry tomatoes, fresh organic basil, aged balsamic drizzle.</p>
            </div>

            <div class="rt-menu-item">
              <div class="rt-item-header">
                <span class="rt-item-name">Wild Mushroom Arancini</span>
                <span class="rt-item-price">$16</span>
              </div>
              <p class="rt-item-desc">Crispy arborio rice balls, forest truffles, melting mozzarella core, spicy marinara.</p>
            </div>
          </div>

          <div class="rt-menu-column">
            <h3>Main Plates</h3>
            
            <div class="rt-menu-item">
              <div class="rt-item-header">
                <span class="rt-item-name">Pan-Seared Sea Bass</span>
                <span class="rt-item-price">$38</span>
              </div>
              <p class="rt-item-desc">Saffron cauliflower purée, roasted asparagus, lemon-caper emulsion.</p>
            </div>

            <div class="rt-menu-item">
              <div class="rt-item-header">
                <span class="rt-item-name">Prime Ribeye Steak</span>
                <span class="rt-item-price">$46</span>
              </div>
              <p class="rt-item-desc">14oz wood-fired dry aged beef, herb compound butter, truffle fries.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RESERVATION -->
    <section class="rt-section rt-reserve-section" id="reserve">
      <div class="rt-container rt-reserve-wrap">
        <h2 class="rt-section-title text-white">Join us tonight</h2>
        <p class="rt-reserve-desc">Reserve your spot early. Indoor cozy seating and open outdoor garden patio tables are available.</p>
        <div class="rt-reserve-form">
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Guests" />
          <input type="date" />
          <button>Find Table</button>
        </div>
      </div>
    </section>
  </div>`,
  css: `
    #rt-root {
      font-family: 'Playfair Display', serif;
      background: #fffcf9;
      color: #1e1b4b;
      margin: 0;
    }
    .rt-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .rt-section {
      padding: 100px 0;
    }
    .rt-bg-warm {
      background: #fdf6ee;
    }
    .rt-label {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 2px;
      color: #ea580c;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 12px;
      display: block;
    }
    .rt-section-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 32px;
    }
    .rt-nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      padding: 24px 0;
    }
    .rt-nav-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .rt-logo {
      color: white;
      font-size: 1.75rem;
      font-weight: 900;
      letter-spacing: 2px;
    }
    .rt-nav-links a {
      font-family: 'Inter', sans-serif;
      color: rgba(255,255,255,0.85);
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .rt-nav-links a:hover {
      color: white;
    }
    .rt-nav-cta {
      background: #ea580c;
      padding: 8px 20px;
      border-radius: 4px;
      color: white !important;
    }
    .rt-hero {
      background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80');
      background-size: cover;
      background-position: center;
      height: 70vh;
      display: flex;
      align-items: center;
      position: relative;
      color: white;
    }
    .rt-hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .rt-hero-content {
      position: relative;
      z-index: 1;
      max-width: 650px;
    }
    .rt-subtitle {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      letter-spacing: 3px;
      color: #ffedd5;
      font-size: 0.8rem;
    }
    .rt-title {
      font-size: 4rem;
      font-weight: bold;
      margin: 16px 0;
    }
    .rt-desc {
      font-family: 'Inter', sans-serif;
      font-size: 1.05rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 32px;
    }
    .rt-actions {
      display: flex;
      gap: 16px;
    }
    .rt-btn-primary {
      background: #ea580c;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .rt-btn-primary:hover {
      background: #c2410c;
    }
    .rt-btn-secondary {
      border: 1px solid white;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .rt-btn-secondary:hover {
      background: rgba(255,255,255,0.15);
    }
    .rt-split {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }
    .rt-body-text {
      font-family: 'Inter', sans-serif;
      color: #475569;
      line-height: 1.6;
      font-size: 1rem;
      margin-bottom: 24px;
    }
    .rt-story-img-wrap {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.06);
    }
    .rt-story-img-wrap img {
      width: 100%;
      display: block;
    }
    .rt-center-header {
      text-align: center;
      margin-bottom: 64px;
    }
    .rt-menu-grid {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 64px;
    }
    .rt-menu-column h3 {
      font-size: 1.75rem;
      border-bottom: 2px solid #fdba74;
      padding-bottom: 12px;
      margin-bottom: 32px;
    }
    .rt-menu-item {
      margin-bottom: 32px;
    }
    .rt-item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .rt-item-name {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .rt-item-price {
      font-family: 'Inter', sans-serif;
      font-weight: bold;
      color: #ea580c;
    }
    .rt-item-desc {
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      color: #475569;
      margin: 0;
      line-height: 1.4;
    }
    .rt-reserve-section {
      background: #7c2d12;
      color: white;
      text-align: center;
    }
    .rt-reserve-wrap {
      max-width: 700px;
    }
    .rt-reserve-desc {
      font-family: 'Inter', sans-serif;
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 32px;
    }
    .rt-reserve-form {
      display: grid;
      grid-template-cols: repeat(4, 1fr);
      gap: 12px;
    }
    .rt-reserve-form input {
      padding: 14px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      background: rgba(255,255,255,0.1);
      color: white;
      font-family: 'Inter', sans-serif;
    }
    .rt-reserve-form input::placeholder {
      color: rgba(255,255,255,0.7);
    }
    .rt-reserve-form button {
      background: white;
      color: #7c2d12;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: background 0.2s;
    }
    .rt-reserve-form button:hover {
      background: #ffedd5;
    }
  `
};
