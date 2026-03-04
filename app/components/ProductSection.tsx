'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { createCart, type ProductVariant } from '@/lib/shopify'

interface Props {
  variants: ProductVariant[]
  price: string
  currencyCode: string
}

// Each flavor has its own image set
const flavorImages: Record<string, { src: string; alt: string }[]> = {
  'Natural Berry': [
    { src: '/flavor-berry.png', alt: 'sWrms Natural Berry gummy worm' },
    { src: '/product-closeup.jpg', alt: 'sWrms gummy worm held up close' },
    { src: '/product-bag.jpg', alt: 'sWrms Natural Berry — bag front' },
    { src: '/product-lifestyle.jpg', alt: 'sWrms lifestyle — bedtime ritual' },
  ],
  'Watermelon': [
    { src: '/flavor-watermelon.png', alt: 'sWrms Watermelon gummy worm' },
    { src: '/product-closeup.jpg', alt: 'sWrms gummy worm held up close' },
    { src: '/product-bag.jpg', alt: 'sWrms bag' },
    { src: '/product-lifestyle.jpg', alt: 'sWrms lifestyle' },
  ],
}
const defaultImages = flavorImages['Natural Berry']

const SUBSCRIBE_DISCOUNT = 0.20

export default function ProductSection({ variants, price, currencyCode }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [purchaseType, setPurchaseType] = useState<'subscribe' | 'onetime'>('subscribe')
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = flavorImages[selectedVariant?.title ?? ''] ?? defaultImages

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) { setCurrentSlide(slider.track.details.rel) },
  })

  const fmt = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode || 'USD' }).format(amount)

  const basePrice = parseFloat(price)
  const subscribePrice = basePrice * (1 - SUBSCRIBE_DISCOUNT)
  const displayPrice = purchaseType === 'subscribe' ? subscribePrice : basePrice

  const handleCheckout = async () => {
    if (!selectedVariant) return
    setLoading(true)
    try {
      const cart = await createCart(selectedVariant.id, qty)
      window.location.href = cart.checkoutUrl
    } catch { alert('Something went wrong.') }
    finally { setLoading(false) }
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setLoading(true)
    try {
      await createCart(selectedVariant.id, qty)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch { alert('Something went wrong.') }
    finally { setLoading(false) }
  }

  const selectFlavor = useCallback((v: ProductVariant) => {
    setSelectedVariant(v)
    setCurrentSlide(0)
    instanceRef.current?.moveToIdx(0)
  }, [instanceRef])

  return (
    <section id="product" className="relative py-12 sm:py-20 px-5 bg-mist">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[55%_45%] gap-8 lg:gap-12 items-start">

          {/* ── LEFT: image gallery ── */}
          <div className="space-y-3">
            {/* Keen Slider */}
            <div className="relative aspect-square overflow-hidden bg-cloud">
              <div ref={sliderRef} className="keen-slider h-full">
                {images.map((img, i) => (
                  <div key={i} className="keen-slider__slide">
                    <button
                      onClick={() => setFullscreenImg(img.src)}
                      className="w-full h-full block relative"
                    >
                      <Image
                        src={img.src} alt={img.alt}
                        fill className="object-cover"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority={i === 0}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => instanceRef.current?.prev()}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-cloud/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-cloud transition-colors z-10"
                    aria-label="Previous"
                  >
                    <svg viewBox="0 0 8 14" className="w-3 h-3 fill-none stroke-ink stroke-2">
                      <path d="M7 1L1 7l6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => instanceRef.current?.next()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-cloud/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-cloud transition-colors z-10"
                    aria-label="Next"
                  >
                    <svg viewBox="0 0 8 14" className="w-3 h-3 fill-none stroke-ink stroke-2">
                      <path d="M1 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}

              {/* Fullscreen button */}
              <button
                onClick={() => setFullscreenImg(images[currentSlide]?.src)}
                className="absolute bottom-3 right-3 w-8 h-8 bg-cloud/80 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-cloud transition-colors"
                aria-label="Fullscreen"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-ink stroke-1.5">
                  <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" strokeLinecap="round" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button key={i} onClick={() => instanceRef.current?.moveToIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === i ? 'bg-navy w-4' : 'bg-navy/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { instanceRef.current?.moveToIdx(i); setCurrentSlide(i) }}
                  className={`aspect-square overflow-hidden border-2 transition-all ${
                    currentSlide === i ? 'border-navy' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img.src} alt={img.alt} width={100} height={100} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: purchase UI ── */}
          <div className="md:sticky md:top-28 space-y-5">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5 fill-indigo">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>
              <a href="#reviews" className="text-sm text-stone hover:text-navy">4.9 · 1,247 reviews</a>
            </div>

            {/* Title */}
            <div>
              <div className="label text-indigo mb-1">sWrms. Magnesium Glycinate</div>
              <h2 className="text-2xl font-bold text-ink leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Gummy Worms for Deep Sleep
              </h2>
            </div>

            {/* ── PURCHASE TYPE (trycreate style) ── */}
            <div className="space-y-2">
              {/* Subscribe & Save — default/highlighted */}
              <button
                onClick={() => setPurchaseType('subscribe')}
                className={`w-full flex items-center justify-between p-4 rounded transition-all ${
                  purchaseType === 'subscribe' ? 'autoship-selected' : 'autoship-default bg-cloud'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    purchaseType === 'subscribe' ? 'border-navy' : 'border-stone/40'
                  }`}>
                    {purchaseType === 'subscribe' && <div className="w-2 h-2 rounded-full bg-navy" />}
                  </div>
                  <div className="text-left">
                    <div className="label text-navy">Subscribe &amp; Save 20%</div>
                    <div className="text-xs text-stone mt-0.5">Delivered monthly · Cancel anytime</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>{fmt(subscribePrice)}</div>
                  <div className="label text-teal">SAVE 20%</div>
                </div>
              </button>

              {/* One-time */}
              <button
                onClick={() => setPurchaseType('onetime')}
                className={`w-full flex items-center justify-between p-4 rounded transition-all ${
                  purchaseType === 'onetime' ? 'autoship-selected' : 'autoship-default bg-cloud'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    purchaseType === 'onetime' ? 'border-navy' : 'border-stone/40'
                  }`}>
                    {purchaseType === 'onetime' && <div className="w-2 h-2 rounded-full bg-navy" />}
                  </div>
                  <div className="label text-stone">One-Time Purchase</div>
                </div>
                <div className="text-xl font-bold text-stone" style={{ letterSpacing: '-0.02em' }}>{fmt(basePrice)}</div>
              </button>
            </div>

            {/* Flavor — with image previews */}
            <div>
              <div className="label text-stone mb-2">
                FLAVOR: <span className="text-ink">{selectedVariant?.title}</span>
              </div>
              <div className="flex gap-2">
                {variants.map((v) => {
                  const flavorImgs = flavorImages[v.title] ?? defaultImages
                  return (
                    <button
                      key={v.id}
                      onClick={() => selectFlavor(v)}
                      disabled={!v.availableForSale}
                      className={`relative flex-1 aspect-[4/3] overflow-hidden border-2 transition-all ${
                        selectedVariant?.id === v.id ? 'border-navy' : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <Image src={flavorImgs[0].src} alt={v.title} fill className="object-cover" sizes="150px" />
                      <div className="absolute inset-0 bg-navy/30 flex items-end p-2">
                        <span className="label text-cloud text-[9px]">{v.title}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4">
              <div className="label text-stone">QTY</div>
              <div className="flex items-center border border-ink/15">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 text-xl text-ink hover:text-navy transition-colors">−</button>
                <span className="w-10 text-center font-bold text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 text-xl text-ink hover:text-navy transition-colors">+</button>
              </div>
              {qty > 1 && <span className="text-sm text-stone">{fmt(displayPrice * qty)}</span>}
            </div>

            {/* Scarcity */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="text-stone"><strong className="text-ink">47 units</strong> left · Ships in 24h</span>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <button onClick={handleCheckout} disabled={loading}
                className="btn w-full bg-navy text-cloud py-4 hover:bg-indigo transition-colors disabled:opacity-50 min-h-[52px]">
                {loading ? 'Loading...' : `Buy Now — ${fmt(displayPrice * qty)}`}
              </button>
              <button onClick={handleAddToCart} disabled={loading}
                className="btn w-full border-2 border-navy text-navy py-4 hover:bg-navy hover:text-cloud transition-all disabled:opacity-50 min-h-[52px]">
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-ink/8 text-center">
              {[
                { icon: '🚚', t: 'Free Shipping', s: 'Orders $50+' },
                { icon: '↩', t: '30-Day Returns', s: 'No questions' },
                { icon: '🔬', t: 'Lab Tested', s: '3rd party' },
              ].map((item) => (
                <div key={item.t}>
                  <div className="text-lg mb-0.5">{item.icon}</div>
                  <div className="label text-navy leading-tight">{item.t}</div>
                  <div className="text-xs text-stone">{item.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-[90] bg-ink/90 flex items-center justify-center p-4 fade-in"
          onClick={() => setFullscreenImg(null)}
        >
          <button onClick={() => setFullscreenImg(null)}
            className="absolute top-4 right-4 text-cloud/70 hover:text-cloud text-3xl font-light z-10">×</button>
          <div className="relative w-full max-w-2xl aspect-square" onClick={e => e.stopPropagation()}>
            <Image src={fullscreenImg} alt="Product" fill className="object-contain" sizes="800px" />
          </div>
        </div>
      )}
    </section>
  )
}
