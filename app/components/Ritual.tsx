'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const steps = [
  { num: '01', title: 'Dim the lights', body: 'One hour before bed, enter night mode. Blue light off. Screen brightness down.' },
  { num: '02', title: 'Eat your worms', body: 'Two gummies = 300mg magnesium glycinate. Chew slowly. Calming mixed berry.' },
  { num: '03', title: 'Let go', body: 'GABA receptors activating. Cortisol dropping. Muscles softening. Close your eyes.' },
]

export default function Ritual() {
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="label text-indigo mb-3 reveal">The nightly ritual</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-8 reveal" style={{ letterSpacing: '-0.02em' }}>
              Simple. Repeatable. Effective.
            </h2>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={s.num} className="reveal flex gap-5 items-start" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="text-3xl font-bold text-ink/10 leading-none shrink-0 w-10" style={{ letterSpacing: '-0.03em' }}>{s.num}</div>
                  <div>
                    <h3 className="text-sm font-bold text-ink uppercase tracking-wide mb-1">{s.title}</h3>
                    <p className="text-sm text-stone leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal relative">
            <div className="aspect-square overflow-hidden relative">
              <Image src="/product-lifestyle.jpg" alt="sWrms nightly ritual" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-cloud border border-ink/8 p-4 shadow-lg">
              <div className="label text-indigo mb-0.5">Best taken</div>
              <div className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>30 min</div>
              <div className="text-xs text-stone">before bedtime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
