'use client'
import { useEffect, useRef } from 'react'

const experts = [
  {
    name: 'Dr. Sarah Chen, MD',
    role: 'Sleep Medicine Physician · Stanford',
    quote: 'Magnesium glycinate is the form I recommend most to patients with insomnia and anxiety. The glycinate chelate is remarkably well-tolerated and the effects on sleep quality are measurable.',
    initials: 'SC',
  },
  {
    name: 'Dr. James Patel, PhD',
    role: 'Neuroscientist · Johns Hopkins',
    quote: 'The GABA-activating mechanism of magnesium is well-established in the literature. Unlike pharmaceutical sleep aids, there\'s no tolerance build-up, no dependency, no next-day impairment.',
    initials: 'JP',
  },
  {
    name: 'Dr. Aiko Tanaka, RD',
    role: 'Registered Dietitian · Mayo Clinic',
    quote: 'The glycinate form is a clear winner for bioavailability. The glycine co-factor also independently promotes sleep — this formulation gives you two mechanisms for the price of one.',
    initials: 'AT',
  },
]

const facts = [
  { val: '68%', desc: 'of US adults are deficient in magnesium' },
  { val: '300+', desc: 'enzymatic reactions require magnesium' },
  { val: '83%', desc: 'report improved sleep in clinical trials' },
  { val: '2-3×', desc: 'higher absorption vs magnesium oxide' },
]

export default function BackedByExperts() {
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
    <section ref={ref} className="py-16 sm:py-24 px-5 bg-mist">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="label text-indigo mb-3">Backed by Experts</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>
            What the science says
          </h2>
        </div>

        {/* Facts row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 mb-12 reveal">
          {facts.map((f) => (
            <div key={f.val} className="bg-cloud p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-navy mb-1" style={{ letterSpacing: '-0.03em' }}>{f.val}</div>
              <div className="text-sm text-stone leading-snug">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Expert quotes */}
        <div className="grid sm:grid-cols-3 gap-px bg-ink/8">
          {experts.map((e, i) => (
            <div key={e.name} className="reveal bg-mist p-6 sm:p-8" style={{ transitionDelay: `${i * 100}ms` }}>
              {/* Avatar */}
              <div className="w-12 h-12 bg-navy text-cloud flex items-center justify-center text-sm font-bold mb-5 rounded-full">
                {e.initials}
              </div>
              <blockquote className="text-sm text-stone leading-relaxed italic mb-5">
                &ldquo;{e.quote}&rdquo;
              </blockquote>
              <div>
                <div className="text-sm font-bold text-ink">{e.name}</div>
                <div className="text-xs text-stone mt-0.5">{e.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
