'use client'
import { useState } from 'react'
import Image from 'next/image'
import { createCart, type ProductVariant } from '@/lib/shopify'

interface Props {
  variants: ProductVariant[]
  price: string
  currencyCode: string
}

const productImages = [
  { src: '/product-bag.jpg', alt: 'sWrms bag — front' },
  { src: '/product-lifestyle.jpg', alt: 'sWrms lifestyle shot' },
  { src: '/product-worm.jpg', alt: 'sWrms gummy worm close-up' },
  { src: '/product-lineup.jpg', alt: 'sWrms product lineup' },
]

export default function ProductSection({ variants, price, currencyCode }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
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
      alert('Something went wrong. Please try again.')
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
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="product" className="relative py-16 sm:py-24 lg:py-32 px-5 bg-mist">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image gallery */}
          <div className="order-2 md:order-1 space-y-3">
            {/* Main image */}
            <div className="aspect-square bg-cloud overflow-hidden relative">
              <Image
                src={productImages[activeImg].src}
                alt={productImages[activeImg].alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-navy' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="order-1 md:order-2">
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
            </div>

            <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-indigo uppercase mb-3">
              sWrms. Magnesium Glycinate
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-light leading-tight mb-4">
              Gummy Worms<br />
              <span className="italic text-navy">for Deep Sleep</span>
            </h2>

            <p className="font-body text-xs sm:text-sm text-stone leading-relaxed mb-6">
              300mg magnesium glycinate per serving. Calming mixed berry flavor. 60 gummies. No melatonin, no morning grogginess — just the sleep your body has been asking for.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-3xl sm:text-4xl text-navy">{fmt(price)}</span>
              <span className="font-body text-xs text-stone line-through">{fmt(String(parseFloat(price) * 1.25))}</span>
              <span className="font-body text-[10px] bg-indigo/10 text-indigo px-2 py-0.5 tracking-wider">SAVE 20%</span>
            </div>
            <div className="font-body text-[10px] text-stone tracking-wider mb-6">
              or {fmt(String(parseFloat(price) * 0.85))}/mo with{' '}
              <span className="text-indigo">Subscribe & Save</span>
            </div>

            {/* Variants */}
            {variants.length > 1 && (
              <div className="mb-5">
                <div className="font-body text-[10px] tracking-widest text-stone uppercase mb-2">
                  Flavor: <span className="text-ink">{selectedVariant?.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                      className={`font-body text-[10px] sm:text-xs tracking-wider px-3 sm:px-4 py-2 border transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-navy text-navy bg-navy/8'
                          : 'border-ink/15 text-stone hover:border-navy/40'
                      } ${!v.availableForSale ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-6">
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
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                disabled={loading || !selectedVariant?.availableForSale}
                className="w-full bg-navy text-cloud font-body text-xs sm:text-sm tracking-[0.2em] uppercase py-4 hover:bg-indigo transition-all duration-300 disabled:opacity-50 min-h-[52px] shadow-sm hover:shadow-md"
              >
                {loading ? 'Loading...' : 'Buy Now — Checkout'}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={loading || !selectedVariant?.availableForSale}
                className="w-full border border-navy/30 text-navy font-body text-xs sm:text-sm tracking-[0.2em] uppercase py-4 hover:bg-navy/5 transition-all duration-300 disabled:opacity-50 min-h-[52px]"
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 pt-6 border-t border-ink/8 grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Free Shipping', sub: 'Orders $50+' },
                { label: '30-Day Returns', sub: 'No questions' },
                { label: 'Lab Tested', sub: '3rd party' },
              ].map((t) => (
                <div key={t.label}>
                  <div className="font-body text-[9px] sm:text-[10px] tracking-wider text-navy uppercase leading-tight">{t.label}</div>
                  <div className="font-body text-[9px] text-stone mt-0.5">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
