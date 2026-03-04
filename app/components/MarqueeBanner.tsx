'use client'
import { useState } from 'react'

const items = [
  '✦  FREE SHIPPING OVER $50',
  '✦  SUBSCRIBE & SAVE 20%',
  '✦  300MG MAGNESIUM GLYCINATE',
  '✦  30-DAY RETURNS',
  '✦  LAB TESTED · THIRD-PARTY VERIFIED',
  '✦  JOIN 12,000+ BETTER SLEEPERS',
  '✦  NO MELATONIN · NO MORNING FOG',
  '✦  VEGAN · GLUTEN-FREE · cGMP CERTIFIED',
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
            <span key={i} className="label whitespace-nowrap px-8 opacity-90 text-cloud">
              {item}
            </span>
          ))}
        </div>
      </div>
      <button onClick={() => setDismissed(true)} aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cloud/60 hover:text-cloud transition-colors text-xl leading-none font-light">
        ×
      </button>
    </div>
  )
}
