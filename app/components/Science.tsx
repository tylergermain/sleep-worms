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
    const obs = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="science" ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5 bg-mist">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo/15 to-transparent top-0" />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center mb-16 sm:mb-24">
          {/* Left copy */}
          <div className="reveal">
            <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-indigo/70 uppercase mb-3 sm:mb-4">The research</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink font-light leading-tight mb-6">
              Backed by<br /><span className="italic text-navy">decades</span><br />of sleep science.
            </h2>
            <div className="space-y-4">
              <p className="font-body text-xs sm:text-sm text-stone leading-relaxed">
                Magnesium glycinate is the form of magnesium most extensively studied for sleep and anxiety. Unlike oxide or citrate, the glycinate chelate resists degradation in the GI tract and passes the blood-brain barrier with high efficiency.
              </p>
              <p className="font-body text-xs sm:text-sm text-stone leading-relaxed">
                The glycine component independently promotes sleep via NMDA receptor modulation and core body temperature reduction — your brain&apos;s natural signal to enter deep sleep.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {['No Melatonin', 'No Fillers', 'Vegan', 'Gluten Free', '3rd-Party Tested', 'cGMP Certified'].map((tag) => (
                <span key={tag} className="font-body text-[9px] sm:text-[10px] tracking-wider border border-navy/20 text-navy/70 px-2.5 sm:px-3 py-1 sm:py-1.5 uppercase">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="reveal">
            <div className="relative aspect-square overflow-hidden">
              <Image src="/product-detail.jpg" alt="sWrms 300mg Magnesium Glycinate" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 reveal">
          {stats.map((s) => (
            <div key={s.label} className="bg-cloud p-6 sm:p-8 text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl text-navy mb-1 sm:mb-2">{s.value}</div>
              <div className="font-body text-[9px] sm:text-xs text-ink tracking-wider uppercase mb-1">{s.label}</div>
              <div className="font-body text-[9px] sm:text-[10px] text-stone">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo/15 to-transparent bottom-0" />
    </section>
  )
}
