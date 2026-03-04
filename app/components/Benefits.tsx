'use client'
import { useEffect, useRef } from 'react'

const benefits = [
  { icon: '◐', title: 'Deep Sleep Architecture', body: 'Magnesium activates GABA receptors — the same pathway benzodiazepines target, without the dependency.' },
  { icon: '◌', title: 'Zero Morning Fog', body: 'No synthetic melatonin means no suppressed natural production. Wake sharp, not sedated.' },
  { icon: '⌁', title: 'Muscle Recovery', body: 'Glycinate form crosses the blood-brain barrier efficiently, relaxing muscles at a cellular level.' },
  { icon: '≋', title: 'Cortisol Regulation', body: '73% of adults are deficient in magnesium — the mineral that literally caps your stress response.' },
  { icon: '○', title: 'Highest Bioavailability', body: 'Chelated to glycine for absorption 2-3× higher than magnesium oxide or citrate.' },
  { icon: '∿', title: 'Anxiety Reduction', body: 'Glycine is an inhibitory neurotransmitter. You\'re feeding your nervous system its own off-switch.' },
]

export default function Benefits() {
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
    <section id="benefits" ref={ref} className="py-16 sm:py-24 px-5 bg-cloud">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="label text-indigo mb-3">Why it works</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>
            Not magic. Biochemistry.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8">
          {benefits.map((b, i) => (
            <div key={b.title} className="reveal bg-cloud p-6 sm:p-8 hover:bg-mist transition-colors group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-2xl text-indigo/30 group-hover:text-indigo/70 transition-colors mb-4">{b.icon}</div>
              <h3 className="text-sm font-bold text-ink uppercase tracking-wide mb-2">{b.title}</h3>
              <p className="text-sm text-stone leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
