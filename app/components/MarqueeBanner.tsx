'use client'
import { useState } from 'react'

const items = [
  '✦ Free shipping on orders over $50',
  '✦ Subscribe & save 15%',
  '✦ 300mg magnesium glycinate per serving',
  '✦ 30-day no-questions return policy',
  '✦ Lab tested · Third-party verified',
  '✦ Join 12,000+ better sleepers',
  '✦ No melatonin. No morning fog.',
  '✦ Vegan · Gluten-free · cGMP certified',
  '✦ Calming mixed berry flavor',
]

const track = [...items, ...items]

export default function MarqueeBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-navy text-cloud overflow-hidden" style={{ height: '36px' }}>
      <div className="flex items-center h-full">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span key={i} className="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap px-6 sm:px-10 opacity-85">
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cloud/60 hover:text-cloud transition-colors text-xl leading-none"
      >
        ×
      </button>
    </div>
  )
}
