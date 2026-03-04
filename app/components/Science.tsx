'use client'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '400mg', label: 'per serving', note: 'Clinically effective dose' },
  { value: '83%', label: 'better sleep', note: 'In a 6-week trial' },
  { value: '2–3×', label: 'higher absorption', note: 'vs. magnesium oxide' },
  { value: '30min', label: 'onset time', note: 'Take before bed' },
]

export default function Science() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="science" ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-glow/20 to-transparent top-0" />

      <div className="max-w-6xl mx-auto">
        {/* Stacks on mobile, asymmetric 2-col on desktop */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 sm:gap-16 items-start mb-16 sm:mb-24">
          {/* Left label */}
          <div className="reveal">
            <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-glow/60 uppercase mb-3 sm:mb-4">
              The research
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-lunar font-light leading-tight">
              Backed by<br />
              <span className="italic text-glow">decades</span><br />
              of sleep<br />
              science.
            </h2>
          </div>

          {/* Right body */}
          <div className="reveal space-y-5">
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              Magnesium glycinate is the form of magnesium most extensively studied for sleep and anxiety. Unlike oxide or citrate, the glycinate chelate resists degradation in the GI tract and passes the blood-brain barrier with high efficiency.
            </p>
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              Clinical research published in the <em className="text-lunar">Journal of Research in Medical Sciences</em> demonstrated that 500mg/day for 8 weeks significantly improved sleep quality, sleep onset latency, and early morning awakening in elderly patients.
            </p>
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              The glycine component independently promotes sleep via NMDA receptor modulation and core body temperature reduction — a key signal your brain uses to transition into deep sleep stages.
            </p>

            {/* Pill badges — wrap naturally on mobile */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['No Melatonin', 'No Fillers', 'Vegan Gummies', 'Gluten Free', '3rd-Party Tested', 'cGMP Certified'].map((tag) => (
                <span key={tag} className="font-body text-[9px] sm:text-[10px] tracking-wider border border-glow/20 text-glow/70 px-2.5 sm:px-3 py-1 sm:py-1.5 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — 2 col on mobile, 4 col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 reveal">
          {stats.map((s) => (
            <div key={s.label} className="bg-void p-6 sm:p-8 text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl text-glow mb-1 sm:mb-2" style={{
                textShadow: '0 0 30px rgba(168,255,90,0.4)',
              }}>
                {s.value}
              </div>
              <div className="font-body text-[9px] sm:text-xs text-lunar tracking-wider uppercase mb-1">{s.label}</div>
              <div className="font-body text-[9px] sm:text-[10px] text-mist">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-glow/20 to-transparent bottom-0" />
    </section>
  )
}
