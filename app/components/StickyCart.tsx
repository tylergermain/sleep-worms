'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createCart, type ProductVariant } from '@/lib/shopify'

interface Props {
  variants: ProductVariant[]
  price: string
  currencyCode: string
}

export default function StickyCart({ variants, price, currencyCode }: Props) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const fmt = (amount: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode || 'USD' }).format(parseFloat(amount))

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCheckout = async () => {
    const v = variants[0]
    if (!v) return
    setLoading(true)
    try {
      const cart = await createCart(v.id, 1)
      window.location.href = cart.checkoutUrl
    } catch { alert('Something went wrong.') }
    finally { setLoading(false) }
  }

  if (!visible) return null

  return (
    <div className="slide-up fixed bottom-0 left-0 right-0 z-50 bg-cloud border-t border-ink/10 shadow-[0_-4px_20px_rgba(15,16,35,0.08)]">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 overflow-hidden relative">
            <Image src="/product-bag.jpg" alt="wrms" fill className="object-cover" sizes="40px" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-ink uppercase tracking-wide truncate">wrms. · 60 Gummies</div>
            <div className="text-sm font-bold text-navy" style={{ letterSpacing: '-0.01em' }}>{fmt(price)}</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-indigo">
              <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
            </svg>
          ))}
          <span className="text-xs text-stone ml-1.5">4.9</span>
        </div>
        <button onClick={handleCheckout} disabled={loading}
          className="btn shrink-0 bg-navy text-cloud px-6 sm:px-8 py-3 hover:bg-indigo transition-colors disabled:opacity-50 min-h-[44px]">
          {loading ? '...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
