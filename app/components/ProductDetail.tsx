'use client'
import { useState } from 'react'
import Image from 'next/image'
import { createCart, type ProductVariant } from '@/lib/shopify'

const productImages = [
  { src: '/product-bag.jpg', alt: 'sWrms bag — front' },
  { src: '/product-worm.jpg', alt: 'sWrms gummy worm' },
  { src: '/product-lifestyle.jpg', alt: 'sWrms lifestyle' },
  { src: '/product-lineup.jpg', alt: 'sWrms lineup' },
]

interface Props {
  variants: ProductVariant[]
  price: string
  currencyCode: string
}

const tabs = ['Description', 'Ingredients', 'FAQ'] as const
type Tab = typeof tabs[number]

const faqs = [
  { q: 'How many should I take?', a: 'Two gummy worms (300mg magnesium glycinate) 30-60 minutes before bed. Start with one if you\'re new to magnesium supplementation.' },
  { q: 'Will I feel groggy the next morning?', a: 'No. Unlike melatonin, magnesium glycinate works with your body\'s natural sleep chemistry. It helps you get into deep sleep, not knock you out.' },
  { q: 'Can I take it with other supplements?', a: 'Yes. Magnesium glycinate pairs well with L-theanine, ashwagandha, and most sleep stacks. Avoid taking with zinc as they compete for absorption.' },
  { q: 'How long until I notice a difference?', a: 'Most people notice improved sleep quality within 3-7 days. Full benefits — deeper sleep architecture, reduced nighttime waking — typically establish at 2-3 weeks.' },
  { q: 'What does it taste like?', a: 'Natural Berry is a lightly sweet mixed berry. Watermelon is mild and refreshing. Neither is cloyingly sweet — we use just enough to make the ritual enjoyable.' },
]

const ingredients = [
  { name: 'Magnesium Glycinate', amount: '300mg', note: 'Chelated for maximum absorption' },
  { name: 'Gelatin (vegan pectin)', amount: '—', note: 'Plant-based gummy base' },
  { name: 'Citric Acid', amount: '—', note: 'Natural tartness' },
  { name: 'Natural Flavors', amount: '—', note: 'Fruit-derived' },
  { name: 'Organic Cane Sugar', amount: '2g', note: 'Per serving (2 worms)' },
  { name: 'Beet Juice', amount: '—', note: 'Natural color (Berry flavor)' },
]

export default function ProductDetail({ variants, price, currencyCode }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Description')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeImg, setActiveImg] = useState(0)

  const fmt = (amount: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode || 'USD' }).format(parseFloat(amount))

  const handleCheckout = async () => {
    if (!selectedVariant) return
    setLoading(true)
    try {
      const cart = await createCart(selectedVariant.id, qty)
      window.location.href = cart.checkoutUrl
    } catch {
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setLoading(true)
    try {
      await createCart(selectedVariant.id, qty)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch {
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 bg-cloud min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-[10px] text-stone tracking-wider uppercase mb-8">
          <a href="/" className="hover:text-navy transition-colors">Home</a>
          <span>/</span>
          <span className="text-navy">Magnesium Glycinate Gummy Worms</span>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-start">
          {/* LEFT — Product visuals */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square bg-mist overflow-hidden relative">
              <Image
                src={productImages[activeImg].src}
                alt={productImages[activeImg].alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-navy text-cloud font-body text-[9px] tracking-widest uppercase px-3 py-1.5">
                {selectedVariant?.title ?? 'Mixed Berry'}
              </div>
              <div className="absolute top-4 right-4 border border-cloud/40 text-cloud font-body text-[9px] tracking-widest uppercase px-3 py-1.5 bg-navy/30 backdrop-blur-sm">
                Bestseller
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-navy' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt={img.alt} width={100} height={100} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Flavor swatches */}
            <div className="flex gap-3">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`flex-1 border py-3 flex items-center justify-center text-center transition-all duration-200 font-body text-xs tracking-wider ${
                    selectedVariant?.id === v.id
                      ? 'border-navy bg-navy/8'
                      : 'border-ink/10 bg-mist hover:border-navy/30'
                  }`}
                >
                  <span className={selectedVariant?.id === v.id ? 'text-navy' : 'text-stone'}>{v.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Purchase UI */}
          <div className="md:sticky md:top-28">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-indigo">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-xs text-stone tracking-wider">4.9 · 1,247 reviews</span>
              <a href="#reviews" className="font-body text-xs text-navy underline underline-offset-2 hover:no-underline">See all</a>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-ink font-light leading-tight mb-3">
              Magnesium Glycinate<br />
              <span className="italic text-navy">Gummy Worms</span>
            </h1>

            <p className="font-body text-xs text-stone leading-relaxed mb-5">
              Sleep support without the grogginess. The highest-bioavailability form of magnesium, chelated to glycine, in a gummy worm you&apos;ll actually look forward to eating.
            </p>

            {/* Price + savings */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-3xl text-navy">{fmt(price)}</span>
              <span className="font-body text-xs text-stone line-through">{fmt(String(parseFloat(price) * 1.25))}</span>
              <span className="font-body text-[10px] bg-navy/10 text-navy px-2 py-0.5 tracking-wider">SAVE 20%</span>
            </div>
            <div className="font-body text-[10px] text-stone tracking-wider mb-6">
              or {fmt(String(parseFloat(price) * 0.85))} / month with <span className="text-navy">Subscribe & Save</span>
            </div>

            {/* Flavor */}
            <div className="mb-5">
              <div className="font-body text-[10px] tracking-widest text-stone uppercase mb-2 flex items-center gap-2">
                Flavor: <span className="text-ink">{selectedVariant?.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    className={`font-body text-xs tracking-wider px-4 py-2 border transition-all ${
                      selectedVariant?.id === v.id
                        ? 'border-navy text-navy bg-navy/8'
                        : 'border-ink/15 text-stone hover:border-navy/40'
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mb-5">
              <div className="font-body text-[10px] tracking-widest text-stone uppercase mb-2">Quantity</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-ink/15">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 text-ink hover:text-navy transition-colors text-lg">−</button>
                  <span className="w-10 text-center font-body text-sm">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 text-ink hover:text-navy transition-colors text-lg">+</button>
                </div>
                {qty > 1 && <span className="font-body text-xs text-stone">{fmt(String(parseFloat(price) * qty))} total</span>}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-navy text-cloud font-body text-sm tracking-[0.2em] uppercase py-4 hover:bg-indigo transition-all duration-300 disabled:opacity-50 min-h-[52px] shadow-sm hover:shadow-md"
              >
                {loading ? 'Loading...' : `Buy Now — ${fmt(String(parseFloat(price) * qty))}`}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="w-full accent-border text-navy font-body text-sm tracking-[0.2em] uppercase py-4 hover:bg-navy/5 transition-all duration-300 disabled:opacity-50 min-h-[52px]"
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Urgency / scarcity */}
            <div className="flex items-center gap-2 mb-5 text-navy">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="font-body text-[10px] tracking-wider">23 people viewing right now · Only 47 units left</span>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-ink/8">
              {[
                { icon: '↩', label: '30-Day Returns' },
                { icon: '🔬', label: 'Lab Tested' },
                { icon: '⚡', label: 'Ships in 24h' },
              ].map((t) => (
                <div key={t.label} className="text-center py-2">
                  <div className="text-base mb-1">{t.icon}</div>
                  <div className="font-body text-[9px] text-stone tracking-wider uppercase">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16 sm:mt-24 border-b border-ink/10">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-body text-xs tracking-widest uppercase px-6 py-4 border-b-2 transition-all duration-200 ${
                  activeTab === tab
                    ? 'border-navy text-navy'
                    : 'border-transparent text-stone hover:text-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-2xl">
          {activeTab === 'Description' && (
            <div className="space-y-4 font-body text-xs sm:text-sm text-stone leading-relaxed">
              <p>sWrms are a magnesium glycinate supplement in gummy worm form. Simple concept, serious formulation. Each worm contains 200mg of elemental magnesium in the glycinate chelate form — the most bioavailable, gentle-on-the-gut form of magnesium available.</p>
              <p>Magnesium is the fourth most abundant mineral in the human body and participates in over 300 enzymatic reactions. When it comes to sleep, it acts as a natural calcium channel blocker, quieting neural excitability and activating the parasympathetic nervous system.</p>
              <p>We chose glycinate because the glycine amino acid it&apos;s chelated to has independent sleep-promoting effects via NMDA receptor modulation and core body temperature reduction — your brain&apos;s natural signal to enter sleep.</p>
              <p>No melatonin. No 5-HTP. No valerian. Just the mineral your body already needs, in the form it can actually use.</p>
            </div>
          )}

          {activeTab === 'Ingredients' && (
            <div>
              <div className="divide-y divide-ink/8">
                {ingredients.map((ing) => (
                  <div key={ing.name} className="flex items-center justify-between py-4 gap-4">
                    <div>
                      <div className="font-body text-xs sm:text-sm text-ink tracking-wider">{ing.name}</div>
                      <div className="font-body text-[10px] text-stone mt-0.5">{ing.note}</div>
                    </div>
                    <div className="font-body text-xs text-navy shrink-0">{ing.amount}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-mist border border-ink/8">
                <p className="font-body text-[10px] text-stone leading-relaxed">
                  No artificial colors, flavors, or preservatives. Free from gluten, dairy, soy, and nuts. Manufactured in a cGMP-certified facility. Third-party tested for purity and potency.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'FAQ' && (
            <div className="divide-y divide-ink/8">
              {faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-body text-xs sm:text-sm text-ink tracking-wider">{faq.q}</span>
                    <span className={`text-navy text-lg transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 mt-3' : 'max-h-0'}`}>
                    <p className="font-body text-xs text-stone leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
