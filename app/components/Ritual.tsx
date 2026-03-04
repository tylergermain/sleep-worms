'use client'
import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Dim the lights',
    body: 'One hour before bed, enter night mode. Blue light off. Screen brightness down.',
  },
  {
    num: '02',
    title: 'Eat your worms',
    body: 'Two gummy worms. 400mg magnesium glycinate. Chew slowly. Savor it.',
  },
  {
    num: '03',
    title: 'Let go',
    body: 'The magnesium is already working — GABA receptors activating, cortisol dropping, muscles softening.',
  },
]

export default function Ritual() {
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
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20 reveal">
          <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-forest/70 uppercase mb-4">
            The nightly ritual
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-ink font-light">
            Simple.<br />
            <span className="italic text-forest">Repeatable.</span><br />
            Effective.
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8 items-center sm:py-12 border-b border-ink/8 last:border-0"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={i % 2 === 1 ? 'sm:order-2' : 'sm:order-1'}>
                <div className="font-display text-[5rem] sm:text-[7rem] leading-none text-forest/10 mb-1 select-none">
                  {step.num}
                </div>
                <h3 className="font-body text-base sm:text-lg tracking-wider text-ink uppercase mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-stone leading-relaxed max-w-sm">
                  {step.body}
                </p>
              </div>

              <div className={`flex ${i % 2 === 1 ? 'sm:order-1 sm:justify-start' : 'sm:order-2 sm:justify-end'} justify-start`}>
                <div className="w-20 h-20 sm:w-32 sm:h-32 accent-border flex items-center justify-center rounded-full shrink-0">
                  <span className="font-display text-3xl sm:text-5xl italic text-forest/50">{step.num}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
