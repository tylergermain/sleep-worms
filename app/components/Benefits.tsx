'use client'
import { useEffect, useRef } from 'react'

const benefits = [
  { icon: '◐', title: 'Deep Sleep Architecture', body: 'Magnesium activates GABA receptors — the same pathway benzodiazepines target, without the dependency.' },
  { icon: '◌', title: 'Zero Morning Fog', body: 'No synthetic melatonin means no suppressed natural production. Wake sharp, not sedated.' },
  { icon: '⌁', title: 'Muscle Recovery', body: 'Glycinate form crosses the blood-brain barrier efficiently, relaxing muscles at a cellular level.' },
  { icon: '≋', title: 'Cortisol Regulation', body: '73% of adults are deficient in magnesium — the mineral that literally caps your stress response.' },
  { icon: '○', title: 'Highest Bioavailability', body: 'Chelated to glycine for absorption rates 2-3× higher than magnesium oxide or citrate.' },
  { icon: '∿', title: 'Anxiety Reduction', body: 'Glycine is an inhibitory neurotransmitter. You\'re feeding your nervous system its own off-switch.' },
]

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="benefits" ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5 bg-cloud overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(91,86,181,0.05)_0%,transparent_70%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20 reveal">
          <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-indigo/70 uppercase mb-4">Why it works</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-ink font-light">
            Not magic.<br /><span className="italic text-navy">Biochemistry.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8">
          {benefits.map((b, i) => (
            <div key={b.title} className="reveal bg-cloud p-6 sm:p-8 hover:bg-mist transition-colors duration-300 group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-display text-2xl sm:text-3xl text-indigo/30 group-hover:text-indigo/70 transition-colors duration-300 mb-4 sm:mb-6">{b.icon}</div>
              <h3 className="font-body text-xs sm:text-sm tracking-wider text-ink uppercase mb-2 sm:mb-3">{b.title}</h3>
              <p className="font-body text-xs text-stone leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
