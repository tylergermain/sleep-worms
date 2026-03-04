'use client'
import { useEffect, useRef } from 'react'

function WormSVG({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wormGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a8ff5a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#6fcc2a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3d7a12" stopOpacity="0.4" />
        </radialGradient>
        <filter id="wormGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((i) => (
        <ellipse
          key={i}
          cx={20 + i * 26}
          cy={60 + Math.sin(i * 0.8) * 18}
          rx={16}
          ry={13}
          fill="url(#wormGrad)"
          filter="url(#wormGlow)"
          opacity={0.85 - i * 0.02}
        />
      ))}
      <ellipse cx={16} cy={60} rx={18} ry={16} fill="#a8ff5a" filter="url(#wormGlow)" opacity={0.95} />
      <circle cx={10} cy={54} r={3} fill="#04060a" />
      <circle cx={22} cy={54} r={3} fill="#04060a" />
      <circle cx={11} cy={53} r={1} fill="#ffffff" opacity={0.8} />
      <circle cx={23} cy={53} r={1} fill="#ffffff" opacity={0.8} />
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    // Only parallax on non-touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 20
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-[#04060a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(168,255,90,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(240,237,232,0.8) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.15,
        }} />
      </div>

      {/* Decorative worms — hidden on mobile to prevent overflow */}
      <WormSVG
        className="worm-bg w-[400px] animate-float hidden md:block"
        style={{ top: '15%', left: '-5%', transform: 'rotate(-20deg)', opacity: 0.06 }}
      />
      <WormSVG
        className="worm-bg w-[350px] animate-float-slow hidden md:block"
        style={{ bottom: '12%', right: '-5%', transform: 'rotate(160deg)', opacity: 0.05, animationDelay: '3s' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-5 pt-20">
        {/* Eyebrow — simplified on mobile */}
        <div className="inline-flex items-center gap-2 mb-6 font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-glow uppercase">
          <div className="w-5 sm:w-8 h-px bg-glow opacity-60 shrink-0" />
          <span className="whitespace-nowrap">Magnesium Glycinate · Gummy Worms</span>
          <div className="w-5 sm:w-8 h-px bg-glow opacity-60 shrink-0" />
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-none mb-6">
          <span className="block text-[clamp(2.8rem,12vw,9rem)] text-lunar tracking-tight">
            The Worm
          </span>
          <span
            className="block text-[clamp(2.8rem,12vw,9rem)] italic glow-text tracking-tight"
            style={{ textShadow: '0 0 40px rgba(168,255,90,0.4), 0 0 100px rgba(168,255,90,0.15)' }}
          >
            that puts
          </span>
          <span className="block text-[clamp(2.8rem,12vw,9rem)] text-lunar tracking-tight">
            you down.
          </span>
        </h1>

        {/* Sub */}
        <p className="font-body text-xs sm:text-sm text-mist max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed tracking-wide px-2">
          400mg magnesium glycinate per serving.
          <br className="hidden sm:block" />
          {' '}No melatonin. No morning fog. Just deep, biological sleep.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#product"
            className="w-full sm:w-auto group relative overflow-hidden bg-glow text-void font-body text-xs sm:text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 hover:shadow-[0_0_40px_rgba(168,255,90,0.6)] transition-all duration-300"
          >
            Shop SleepWorms
          </a>
          <a
            href="#science"
            className="w-full sm:w-auto font-body text-xs sm:text-sm tracking-[0.2em] text-mist uppercase border border-white/10 px-8 sm:px-10 py-3.5 sm:py-4 hover:border-white/30 hover:text-lunar transition-all duration-300 text-center"
          >
            The Science
          </a>
        </div>

        {/* Floating worm product visual */}
        <div className="mt-10 sm:mt-16 relative flex justify-center">
          <div className="relative animate-float w-full max-w-[280px] sm:max-w-[420px]" style={{ animationDuration: '5s' }}>
            <WormSVG style={{
              filter: 'drop-shadow(0 0 30px rgba(168,255,90,0.5)) drop-shadow(0 0 80px rgba(168,255,90,0.2))',
              width: '100%',
            }} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-4 sm:h-6 bg-glow opacity-20 blur-xl rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll hint — hidden on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hidden sm:flex">
        <span className="font-body text-[10px] tracking-[0.3em] text-mist uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-mist to-transparent" />
      </div>
    </section>
  )
}
