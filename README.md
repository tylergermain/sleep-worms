# SleepWorms™ — Next.js + Shopify Storefront Site

Dark, editorial single-product site for Magnesium Glycinate Gummy Worms.

## Stack
- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Shopify Storefront API (not Buy SDK — more flexible for SSR)
- Framer Motion

## Setup

```bash
cd sleep-worms
cp .env.local.example .env.local
# Edit .env.local with your Shopify credentials
npm install
npm run dev
```

## Shopify Setup

1. Go to Shopify Admin → Settings → Apps and sales channels → Develop apps
2. Create a new app → configure **Storefront API** access
3. Permissions needed: `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`
4. Copy the **Storefront access token** (not admin API key)
5. Set your product's handle (URL slug) as `NEXT_PUBLIC_PRODUCT_HANDLE`

## Deploy to Vercel

```bash
npx vercel
# Add env vars in Vercel dashboard
```

## Design Direction

**Aesthetic:** Dark editorial luxury × bioluminescent worm glow
**Fonts:** Cormorant Garamond (display) + DM Mono (body)
**Colors:** `#04060a` void black + `#a8ff5a` neon glow + `#f0ede8` lunar white
**Differentiation:** Bioluminescent worm motifs, typographic drama at large scale, no synthetic melatonin vibes
