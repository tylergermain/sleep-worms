'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-cloud"
      style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
    >
      {/* Dreamy background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(91,86,181,0.12)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_80%_70%,rgba(61,184,176,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-28 sm:pt-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100svh-8rem)]">
          {/* Left — copy */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Logo wordmark */}
            <div className="font-display text-4xl sm:text-5xl tracking-wide text-navy mb-6 leading-none">
              <span className="italic">s</span>Wrms<span className="text-indigo">.</span>
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 font-body text-[10px] sm:text-xs tracking-[0.25em] text-indigo uppercase">
              <div className="w-6 h-px bg-indigo/50 shrink-0 hidden md:block" />
              Magnesium Glycinate · Gummy Worms · Sleep Support
            </div>

            {/* Headline */}
            <h1 className="font-display font-light leading-none mb-5">
              <span className="block text-[clamp(2.6rem,9vw,7rem)] text-ink tracking-tight">
                Sleep like
              </span>
              <span className="block text-[clamp(2.6rem,9vw,7rem)] italic text-navy tracking-tight">
                you used to.
              </span>
            </h1>

            <p className="font-body text-xs sm:text-sm text-stone max-w-sm mx-auto md:mx-0 mb-8 leading-relaxed">
              300mg magnesium glycinate per serving. Calming mixed berry flavor. No melatonin, no morning fog — just the deep, restorative sleep your body craves.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
              <a
                href="#product"
                className="w-full sm:w-auto bg-navy text-cloud font-body text-xs sm:text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-indigo transition-all duration-300 shadow-sm hover:shadow-md text-center"
              >
                Shop sWrms
              </a>
              <a
                href="#science"
                className="w-full sm:w-auto font-body text-xs sm:text-sm tracking-[0.2em] text-stone uppercase border border-ink/15 px-8 sm:px-10 py-3.5 sm:py-4 hover:border-navy hover:text-navy transition-all duration-300 text-center"
              >
                The Science
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-indigo">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-xs text-stone tracking-wider">4.9 · 1,247 happy sleepers</span>
            </div>
          </div>

          {/* Right — product image */}
          <div className="relative flex items-center justify-center md:justify-end order-first md:order-last">
            {/* Dreamy glow behind product */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(91,86,181,0.15)_0%,rgba(61,184,176,0.08)_50%,transparent_70%)] rounded-full scale-110" />

            <div className="relative animate-float w-full max-w-[280px] sm:max-w-[380px] md:max-w-[440px]" style={{ animationDuration: '5s' }}>
              <Image
                src="/product-bag.jpg"
                alt="sWrms Magnesium Glycinate Gummy Worms"
                width={440}
                height={520}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
              {/* Shadow beneath */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-navy/15 blur-2xl rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-30 hidden sm:flex">
        <span className="font-body text-[10px] tracking-[0.3em] text-stone uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone to-transparent" />
      </div>
    </section>
  )
}
