'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const steps = [
  { num: '01', title: 'Dim the lights', body: 'One hour before bed, enter night mode. Blue light off. Screen brightness down.' },
  { num: '02', title: 'Eat your worms', body: 'Two gummy worms. 300mg magnesium glycinate. Chew slowly. Savor the mixed berry flavor.' },
  { num: '03', title: 'Let go', body: 'The magnesium is already working — GABA receptors activating, cortisol dropping, muscles softening.' },
]

export default function Ritual() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5 bg-cloud">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Steps */}
          <div>
            <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-indigo/70 uppercase mb-4 reveal">The nightly ritual</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink font-light mb-10 reveal">
              Simple.<br /><span className="italic text-navy">Repeatable.</span><br />Effective.
            </h2>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={step.num} className="reveal flex gap-5 items-start" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="font-display text-4xl text-indigo/20 leading-none shrink-0 w-12">{step.num}</div>
                  <div>
                    <h3 className="font-body text-xs sm:text-sm tracking-wider text-ink uppercase mb-2">{step.title}</h3>
                    <p className="font-body text-xs text-stone leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle image */}
          <div className="reveal relative">
            <div className="relative aspect-square overflow-hidden">
              <Image src="/product-lifestyle.jpg" alt="sWrms nightly ritual" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            {/* Floating detail card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-cloud border border-ink/8 p-4 shadow-lg">
              <div className="font-body text-[10px] text-indigo tracking-widest uppercase mb-1">Best taken</div>
              <div className="font-display text-xl text-navy">30 min</div>
              <div className="font-body text-[10px] text-stone">before bedtime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
