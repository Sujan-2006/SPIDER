export const realEstate = {
  name: 'Premium Real Estate Agency',
  html: `<div id="re-root">
    <nav class="re-nav">
      <div class="re-container re-flex-nav">
        <span class="re-logo">HAVEN</span>
        <div class="re-links">
          <a href="#properties">Listings</a>
          <a href="#about">About</a>
          <a href="#contact" class="re-cta">Contact Broker</a>
        </div>
      </div>
    </nav>
    <header class="re-hero">
      <div class="re-container">
        <h1>Find Your True Sanctuary</h1>
        <p>Curated luxury listings in premium neighborhood locations. Handcrafted architectural masterpieces built to elevate living standards.</p>
        <div class="re-search">
          <input type="text" placeholder="Location, Neighborhood..." />
          <button>Search</button>
        </div>
      </div>
    </header>
  </div>`,
  css: `
    #re-root {
      background: #fafaf9;
      color: #1c1917;
      font-family: 'Playfair Display', serif;
      padding-bottom: 100px;
    }
    .re-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
    }
    .re-nav {
      padding: 24px 0;
      background: white;
      border-bottom: 1px solid #e7e5e4;
    }
    .re-flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .re-logo {
      font-weight: bold;
      letter-spacing: 2px;
      color: #78350f;
      font-size: 1.5rem;
    }
    .re-links a {
      font-family: 'Inter', sans-serif;
      color: #57534e;
      text-decoration: none;
      margin-left: 24px;
      font-weight: 500;
    }
    .re-cta {
      background: #78350f;
      color: white !important;
      padding: 8px 18px;
      border-radius: 4px;
    }
    .re-hero {
      padding: 100px 0;
      background-image: linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80');
      background-size: cover;
      background-position: center;
    }
    .re-hero h1 {
      font-size: 3.5rem;
      font-weight: bold;
      color: #78350f;
      margin-bottom: 16px;
    }
    .re-hero p {
      font-family: 'Inter', sans-serif;
      font-size: 1.1rem;
      color: #57534e;
      max-width: 600px;
      margin: 0 auto 32px auto;
      line-height: 1.6;
    }
    .re-search {
      display: flex;
      max-width: 500px;
      margin: 0 auto;
      background: white;
      padding: 6px;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      border: 1px solid #d6d3d1;
    }
    .re-search input {
      flex: 1;
      border: none;
      padding: 12px;
      font-family: 'Inter', sans-serif;
      outline: none;
    }
    .re-search button {
      background: #78350f;
      color: white;
      border: none;
      padding: 0 24px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
  `
};
