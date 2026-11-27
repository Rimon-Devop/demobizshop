# ShopShuru — Agency Website

Bangla-first (with English toggle) landing site for an e-commerce website agency serving new Bangladeshi online sellers.

Plain HTML/CSS/JS — no build step. Fast on mobile data, free to host.

## Files
| File | What it is |
|---|---|
| `index.html` | All page content (Bangla in `<span lang="bn">`, English in `<span lang="en">`) |
| `styles.css` | Design (colors are at the top under `:root`) |
| `config.js` | **Your WhatsApp number, phone and Facebook link — edit this first** |
| `main.js` | Language toggle, mobile menu, order form → WhatsApp |

## Live demos (`demos/`)
| Demo | Path |
|---|---|
| Organic food (gur, honey, ghee, masala) | `demos/organic/` |
| Beauty & cosmetics | `demos/beauty/` |
| Fashion & saree | `demos/fashion/` |
| Jewelry | `demos/jewelry/` |
| Single-product landing page (Facebook ads) | `demos/landing/` |

The 4 shops share one engine (`demos/assets/shop.js` + `shop.css`); each shop's `index.html` only holds its colors and product list,
so a new niche demo = copy a folder and edit the product data. Product pictures are drawn in SVG by `demos/assets/art.js` (no image files).
Thumbnails on the main page are screenshots in `assets/demos/`.

## Edit contact details
Open `config.js` and replace the placeholder WhatsApp number, phone and Facebook URL.

## Preview locally
Just open `index.html` in a browser.

## Deploy free on Cloudflare Pages
1. Go to dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Choose this repository.
3. Framework preset: **None**. Build command: *(leave empty)*. Output directory: `/`.
4. Deploy → you get `https://<project>.pages.dev`.
5. Later: **Custom domains** → add your domain. Every `git push` redeploys automatically.
