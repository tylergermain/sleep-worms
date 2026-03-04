'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const stats = [
  { value: '300mg', label: 'per serving', note: 'Clinically effective dose' },
  { value: '83%', label: 'better sleep', note: 'In a 6-week trial' },
  { value: '2–3×', label: 'higher absorption', note: 'vs. magnesium oxide' },
  { value: '30min', label: 'onset time', note: 'Take before bed' },
]

export default function Science() {
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
    <section id="science" ref={ref} className="py-16 sm:py-24 px-5 bg-mist">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center mb-12 sm:mb-16">
          <div className="reveal">
            <div className="label text-indigo mb-3">The Research</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-5" style={{ letterSpacing: '-0.02em' }}>
              Backed by decades of sleep science.
            </h2>
            <div className="space-y-4 text-sm text-stone leading-relaxed">
              <p>Magnesium glycinate is the most studied form for sleep and anxiety. The glycinate chelate resists GI degradation and passes the blood-brain barrier with high efficiency.</p>
              <p>Clinical research in the <em className="text-ink">Journal of Research in Medical Sciences</em> showed 500mg/day for 8 weeks significantly improved sleep quality and onset time.</p>
              <p>The glycine component independently promotes sleep via NMDA receptor modulation — your brain&apos;s natural signal to enter deep sleep stages.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {['No Melatonin', 'No Fillers', 'Vegan', 'Gluten Free', '3rd-Party Tested', 'cGMP Certified'].map(tag => (
                <span key={tag} className="label border border-navy/20 text-navy/70 px-3 py-1">{tag}</span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="aspect-square overflow-hidden relative">
              <Image src="/product-detail.jpg" alt="300mg Magnesium Glycinate" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 reveal">
          {stats.map(s => (
            <div key={s.label} className="bg-cloud p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-navy mb-1" style={{ letterSpacing: '-0.03em' }}>{s.value}</div>
              <div className="label text-ink mb-1">{s.label}</div>
              <div className="text-xs text-stone">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
