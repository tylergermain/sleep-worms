'use client'
import { useState } from 'react'
import { createCart, type ProductVariant } from '@/lib/shopify'

interface Props {
  variants: ProductVariant[]
  price: string
  currencyCode: string
}

export default function ProductSection({ variants, price, currencyCode }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

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
    <section id="product" className="relative py-16 sm:py-24 lg:py-32 px-5 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-[320px] sm:max-w-md aspect-square flex items-center justify-center">
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-forest/10" />
              <div className="absolute inset-8 rounded-full border border-forest/15" />
              <div className="absolute inset-16 rounded-full border border-forest/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(46,92,62,0.06)_0%,transparent_70%)] rounded-full" />

              <div className="relative z-10 text-center px-4">
                <div className="font-display text-6xl sm:text-8xl italic text-forest mb-2">
                  SW
                </div>
                <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-forest/70 uppercase">SleepWorms™</div>
                <div className="font-body text-[10px] sm:text-xs tracking-[0.2em] text-stone mt-1">60 gummy worms</div>

                <div className="mt-4 accent-border bg-cream/70 px-4 sm:px-6 py-3 sm:py-4 rounded">
                  <div className="font-body text-[10px] tracking-widest text-forest/60 uppercase mb-1">Each Worm</div>
                  <div className="font-display text-xl sm:text-2xl text-ink">200mg</div>
                  <div className="font-body text-[10px] text-stone">Magnesium Glycinate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="order-1 md:order-2">
            <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-forest uppercase mb-3">
              One Product. One Purpose.
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-light leading-tight mb-4">
              Magnesium Glycinate<br />
              <span className="italic text-forest">Gummy Worms</span>
            </h2>

            <p className="font-body text-xs sm:text-sm text-stone leading-relaxed mb-6">
              The highest-bioavailability form of magnesium. Chelated to glycine for deep muscle relaxation and nervous system calming. Your nightly ritual, now in worm form.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl sm:text-4xl text-forest">{fmt(price)}</span>
              <span className="font-body text-xs text-stone tracking-widest">/ 60 worms</span>
            </div>

            {/* Variants */}
            {variants.length > 1 && (
              <div className="mb-5">
                <div className="font-body text-[10px] tracking-widest text-stone uppercase mb-2">Flavor</div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                      className={`font-body text-[10px] sm:text-xs tracking-wider px-3 sm:px-4 py-2 border transition-all duration-200 ${
                        selectedVariant?.id === v.id
                          ? 'border-forest text-forest bg-forest/8'
                          : 'border-ink/15 text-stone hover:border-forest/40'
                      } ${!v.availableForSale ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <div className="font-body text-[10px] tracking-widest text-stone uppercase mb-2">Quantity</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-ink/15">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 text-ink hover:text-forest transition-colors font-body text-lg"
                  >−</button>
                  <span className="w-10 text-center font-body text-sm text-ink">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 text-ink hover:text-forest transition-colors font-body text-lg"
                  >+</button>
                </div>
                {qty > 1 && (
                  <span className="font-body text-xs text-stone tracking-wider">
                    {fmt(String(parseFloat(price) * qty))} total
                  </span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                disabled={loading || !selectedVariant?.availableForSale}
                className="w-full bg-forest text-cream font-body text-xs sm:text-sm tracking-[0.2em] uppercase py-4 hover:bg-fern transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] shadow-sm hover:shadow-md"
              >
                {loading ? 'Loading...' : 'Buy Now — Checkout'}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={loading || !selectedVariant?.availableForSale}
                className="w-full accent-border text-forest font-body text-xs sm:text-sm tracking-[0.2em] uppercase py-4 hover:bg-forest/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
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
                  <div className="font-body text-[9px] sm:text-[10px] tracking-wider text-forest uppercase leading-tight">{t.label}</div>
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
