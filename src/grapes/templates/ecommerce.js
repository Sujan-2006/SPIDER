export const ecommerce = {
  name: 'E-Commerce Storefront',
  html: `<div id="ec-root">
    <!-- NAVIGATION -->
    <nav class="ec-nav">
      <div class="ec-container ec-nav-flex">
        <span class="ec-logo">VibeShop</span>
        <div class="ec-nav-links">
          <a href="#new">New Arrivals</a>
          <a href="#categories">Categories</a>
          <a href="#featured">Featured</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="ec-nav-icons">
          <span class="ec-cart-icon">🛒 <span class="ec-cart-badge">3</span></span>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="ec-hero">
      <div class="ec-hero-overlay"></div>
      <div class="ec-container ec-hero-content">
        <span class="ec-hero-subtitle">Summer Collection 2026</span>
        <h1 class="ec-hero-title">Rethink Your Style</h1>
        <p class="ec-hero-desc">Discover handpicked minimalist fashion that matches your vibe. Up to 40% off on premium arrivals.</p>
        <a href="#featured" class="ec-btn-primary">Shop Collection Now</a>
      </div>
    </header>

    <!-- CATEGORIES -->
    <section class="ec-section" id="categories">
      <div class="ec-container">
        <h2 class="ec-section-title">Shop by Category</h2>
        <div class="ec-category-grid">
          <div class="ec-category-card ec-cat-1">
            <div class="ec-category-overlay"></div>
            <div class="ec-category-content">
              <h3>Casual Wear</h3>
              <a href="#">Explore →</a>
            </div>
          </div>
          <div class="ec-category-card ec-cat-2">
            <div class="ec-category-overlay"></div>
            <div class="ec-category-content">
              <h3>Accessories</h3>
              <a href="#">Explore →</a>
            </div>
          </div>
          <div class="ec-category-card ec-cat-3">
            <div class="ec-category-overlay"></div>
            <div class="ec-category-content">
              <h3>Footwear</h3>
              <a href="#">Explore →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="ec-section ec-bg-light" id="featured">
      <div class="ec-container">
        <h2 class="ec-section-title">Trending Now</h2>
        <div class="ec-product-grid">
          
          <div class="ec-product-card">
            <div class="ec-product-img-wrap">
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80" alt="Product" class="ec-product-img"/>
              <span class="ec-product-badge">New</span>
            </div>
            <div class="ec-product-info">
              <h3 class="ec-product-title">Minimalist Cotton Tee</h3>
              <p class="ec-product-price">$29.00</p>
              <button class="ec-btn-add">Add to Cart</button>
            </div>
          </div>

          <div class="ec-product-card">
            <div class="ec-product-img-wrap">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" alt="Product" class="ec-product-img"/>
              <span class="ec-product-badge ec-badge-sale">Sale</span>
            </div>
            <div class="ec-product-info">
              <h3 class="ec-product-title">Athletic Red Runner</h3>
              <p class="ec-product-price"><span class="ec-old-price">$120.00</span> $89.00</p>
              <button class="ec-btn-add">Add to Cart</button>
            </div>
          </div>

          <div class="ec-product-card">
            <div class="ec-product-img-wrap">
              <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" alt="Product" class="ec-product-img"/>
            </div>
            <div class="ec-product-info">
              <h3 class="ec-product-title">Premium Leather Bag</h3>
              <p class="ec-product-price">$149.00</p>
              <button class="ec-btn-add">Add to Cart</button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="ec-footer" id="contact">
      <div class="ec-container ec-footer-grid">
        <div class="ec-footer-brand">
          <h3>VibeShop</h3>
          <p>Curated modern fashion items built to last.</p>
        </div>
        <div class="ec-footer-links">
          <h4>Customer Care</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Size Guide</a>
        </div>
        <div class="ec-footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Subscribe for early access sales.</p>
          <div class="ec-newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>Join</button>
          </div>
        </div>
      </div>
    </footer>
  </div>`,
  css: `
    #ec-root {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      margin: 0;
      background: #ffffff;
    }
    .ec-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .ec-section {
      padding: 80px 0;
    }
    .ec-bg-light {
      background: #f8fafc;
    }
    .ec-section-title {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 48px;
    }
    .ec-nav {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 0;
    }
    .ec-nav-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ec-logo {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -1px;
      color: #f43f5e;
    }
    .ec-nav-links a {
      margin: 0 16px;
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .ec-nav-links a:hover {
      color: #f43f5e;
    }
    .ec-cart-icon {
      font-weight: bold;
      cursor: pointer;
      position: relative;
    }
    .ec-cart-badge {
      background: #f43f5e;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 99px;
      position: absolute;
      top: -10px;
      right: -15px;
    }
    .ec-hero {
      background-image: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80');
      background-size: cover;
      background-position: center;
      height: 60vh;
      display: flex;
      align-items: center;
      position: relative;
      color: white;
    }
    .ec-hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    .ec-hero-content {
      position: relative;
      z-index: 1;
      max-width: 600px;
    }
    .ec-hero-subtitle {
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fda4af;
      font-size: 0.9rem;
    }
    .ec-hero-title {
      font-size: 3.5rem;
      font-weight: 900;
      margin: 12px 0;
      line-height: 1.1;
    }
    .ec-hero-desc {
      font-size: 1.1rem;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    .ec-btn-primary {
      background: #f43f5e;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 99px;
      font-weight: 600;
      box-shadow: 0 10px 20px rgba(244, 63, 94, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }
    .ec-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(244, 63, 94, 0.4);
    }
    .ec-category-grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 24px;
    }
    .ec-category-card {
      height: 350px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: flex-end;
      padding: 24px;
      background-size: cover;
      background-position: center;
      transition: transform 0.3s;
      cursor: pointer;
    }
    .ec-category-card:hover {
      transform: translateY(-8px);
    }
    .ec-cat-1 { background-image: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80'); }
    .ec-cat-2 { background-image: url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'); }
    .ec-cat-3 { background-image: url('https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80'); }
    .ec-category-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%);
    }
    .ec-category-content {
      position: relative;
      z-index: 1;
      color: white;
    }
    .ec-category-content h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .ec-category-content a {
      color: #fda4af;
      text-decoration: none;
      font-weight: 600;
    }
    .ec-product-grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 32px;
    }
    .ec-product-card {
      background: white;
      border-radius: 20px;
      border: 1px solid #f1f5f9;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .ec-product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
    }
    .ec-product-img-wrap {
      height: 300px;
      overflow: hidden;
      position: relative;
    }
    .ec-product-img {
      width: 100%;
      height: 100%;
      object-cover: cover;
    }
    .ec-product-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: #f43f5e;
      color: white;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .ec-badge-sale {
      background: #e2e8f0;
      color: #334155;
    }
    .ec-product-info {
      padding: 24px;
    }
    .ec-product-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .ec-product-price {
      font-weight: bold;
      color: #f43f5e;
      font-size: 1.2rem;
      margin: 0 0 16px 0;
    }
    .ec-old-price {
      text-decoration: line-through;
      color: #94a3b8;
      font-size: 1rem;
      margin-right: 8px;
    }
    .ec-btn-add {
      width: 100%;
      border: none;
      background: #1e293b;
      color: white;
      padding: 12px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ec-btn-add:hover {
      background: #f43f5e;
    }
    .ec-footer {
      background: #0f172a;
      color: #94a3b8;
      padding: 80px 0;
    }
    .ec-footer-grid {
      display: grid;
      grid-template-cols: 2fr 1fr 2fr;
      gap: 64px;
    }
    .ec-footer-brand h3, .ec-footer-links h4, .ec-footer-newsletter h4 {
      color: white;
      margin-bottom: 24px;
    }
    .ec-footer-links a {
      display: block;
      color: #94a3b8;
      text-decoration: none;
      margin-bottom: 12px;
    }
    .ec-footer-links a:hover {
      color: white;
    }
    .ec-newsletter-form {
      display: flex;
      margin-top: 16px;
    }
    .ec-newsletter-form input {
      flex: 1;
      padding: 12px 16px;
      border-radius: 12px 0 0 12px;
      border: 1px solid #334155;
      background: #1e293b;
      color: white;
    }
    .ec-newsletter-form button {
      background: #f43f5e;
      color: white;
      border: none;
      padding: 0 24px;
      border-radius: 0 12px 12px 0;
      font-weight: bold;
      cursor: pointer;
    }
  `
};
