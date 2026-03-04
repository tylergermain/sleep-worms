'use client'
import { useState } from 'react'

const items = [
  '✦ Free shipping on orders over $50',
  '✦ Subscribe & save 15%',
  '✦ 30-day no-questions return policy',
  '✦ 400mg magnesium glycinate per serving',
  '✦ Lab tested · Third-party verified',
  '✦ Join 12,000+ better sleepers',
  '✦ No melatonin. No morning fog.',
  '✦ Vegan · Gluten-free · cGMP certified',
]

// Duplicate so it loops seamlessly
const track = [...items, ...items]

export default function MarqueeBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-forest text-cream overflow-hidden" style={{ height: '36px' }}>
      {/* Marquee */}
      <div className="flex items-center h-full">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span
              key={i}
              className="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap px-6 sm:px-10 opacity-90"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}
