'use client'
import { useEffect, useRef } from 'react'

const steps = [
  { num: 1, time: '8:00 PM', title: 'Dim everything', body: 'An hour before bed, lower the lights. Switch your phone to night mode. Give your brain the signal that the day is done.' },
  { num: 2, time: '9:30 PM', title: 'Take two worms', body: 'Eat 2 sWrms (300mg magnesium glycinate). Chew slowly. Mixed berry hits different at night.' },
  { num: 3, time: '9:45 PM', title: 'Wind down', body: 'Read. Stretch. Breathe. The magnesium is activating your parasympathetic nervous system as you do this.' },
  { num: 4, time: '10:00 PM', title: 'Sleep', body: 'Your GABA receptors are firing. Your cortisol is dropping. Your muscles are softening. Close your eyes.' },
]

export default function Directions() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 sm:py-24 px-5 bg-cloud">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="label text-indigo mb-3">Directions</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>
            How to use sWrms
          </h2>
          <p className="text-base text-stone mt-3 max-w-md mx-auto">
            Simple. Just 2 gummies (1 serving) 30-60 minutes before bed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8">
          {steps.map((s, i) => (
            <div key={s.num} className="reveal bg-cloud p-6 sm:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="label text-indigo mb-4">{s.time}</div>
              <div className="text-4xl font-bold text-ink/10 mb-2 leading-none" style={{ letterSpacing: '-0.03em' }}>
                {String(s.num).padStart(2, '0')}
              </div>
              <h3 className="text-base font-bold text-ink uppercase mb-2 tracking-wide">{s.title}</h3>
              <p className="text-sm text-stone leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Dosage callout */}
        <div className="mt-6 p-5 bg-mist border border-ink/8 flex flex-col sm:flex-row items-start sm:items-center gap-4 reveal">
          <div className="text-2xl shrink-0">📋</div>
          <div>
            <div className="label text-navy mb-1">Serving size</div>
            <p className="text-sm text-stone">
              2 gummy worms (1 serving) = 300mg elemental magnesium glycinate. 
              Start with 1 worm if you&apos;re new to magnesium. 
              Take 30-60 min before bed. <strong className="text-ink">Do not exceed 2 per day.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
