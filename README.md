# Sovereign Fashion House — E-commerce

Modern luxury-fashion storefront for **Sovereign Fashion House Limited** — *Elegance. African creativity. Confidence. Purposeful style.*

A full redesign of sovereignfashion.com, built as site #2 of the Geovision 90-Day Brand & Digital Roadmap (the commercial engine that leads revenue).

## ✨ Highlights

- **Wow hero** — “Wear Your Sovereignty”, cinematic imagery, animated intro **preloader**.
- **Emerald + ivory + gold** brand (gold ties it to Dr. Jane's master brand), editorial serif type.
- **Full shopping experience** — cart with localStorage persistence, cart drawer, quantity & size selection.
- **WhatsApp-first checkout & ordering** (per the roadmap) — every order routes to a prefilled WhatsApp message.
- Pages: Home, Shop (filters, search, sort), Product detail (gallery + add to cart), Lookbook (masonry + lightbox), Custom Orders (bespoke enquiry), About, Delivery & Returns (FAQ), Contact.
- Scroll-reveal + page-transition animations (Framer Motion), floating WhatsApp on every page, fully responsive, SEO metadata.

## 🛠 Tech Stack

React 18 · Vite · Tailwind CSS · Framer Motion · React Router · lucide-react

## 🚀 Getting Started

```bash
npm install
npm run assets   # regenerate product data + optimized public images from /assets
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## 🗂 Structure

```
assets/                 # raw source product photos (name + price in filename)
scripts/process-assets.mjs  # -> public/assets/products + src/data/products.js
src/
  context/CartContext.jsx    # cart state, localStorage, WhatsApp checkout
  components/                # Navbar, Footer, CartDrawer, ProductCard, Preloader, …
  data/site.js               # brand, nav, contact, WhatsApp helpers
  pages/                     # one file per route
```

Products are generated from the raw asset filenames — drop new photos in `assets/` (with the price in the name) and run `npm run assets`.

---

Crafted by **[Geovision Services Ltd](https://github.com/GeovisionServicesGlobal)**.
