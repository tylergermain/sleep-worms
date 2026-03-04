'use client'
import { useEffect, useRef } from 'react'

const benefits = [
  {
    icon: '◐',
    title: 'Deep Sleep Architecture',
    body: 'Magnesium activates GABA receptors — the same pathway benzodiazepines target, without the dependency.',
  },
  {
    icon: '◌',
    title: 'Zero Morning Fog',
    body: 'No synthetic melatonin means no suppressed natural production. Wake sharp, not sedated.',
  },
  {
    icon: '⌁',
    title: 'Muscle Recovery',
    body: 'Glycinate form crosses the blood-brain barrier efficiently, relaxing muscles at a cellular level.',
  },
  {
    icon: '≋',
    title: 'Cortisol Regulation',
    body: '73% of adults are deficient in magnesium — the mineral that literally caps your stress response.',
  },
  {
    icon: '○',
    title: 'Highest Bioavailability',
    body: 'Chelated to glycine for absorption rates 2-3x higher than magnesium oxide or citrate.',
  },
  {
    icon: '∿',
    title: 'Anxiety Reduction',
    body: 'Glycine is an inhibitory neurotransmitter. You\'re feeding your nervous system its own off-switch.',
  },
]

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="benefits" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 px-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(168,255,90,0.03)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 reveal">
          <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-glow/60 uppercase mb-4">
            Why it works
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-lunar font-light">
            Not magic.
            <br />
            <span className="italic text-glow">Biochemistry.</span>
          </h2>
        </div>

        {/* Benefits grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="reveal bg-void p-6 sm:p-8 hover:bg-midnight transition-colors duration-300 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-2xl sm:text-3xl text-glow/40 group-hover:text-glow/80 transition-colors duration-300 mb-4 sm:mb-6">
                {b.icon}
              </div>
              <h3 className="font-body text-xs sm:text-sm tracking-wider text-lunar uppercase mb-2 sm:mb-3">
                {b.title}
              </h3>
              <p className="font-body text-xs text-mist leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
