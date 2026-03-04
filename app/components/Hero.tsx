'use client'
import { useEffect, useRef } from 'react'

function WormSVG({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wormGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a8c60" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#2e5c3e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1d3d28" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="wormGradHead" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5da370" stopOpacity="1" />
          <stop offset="100%" stopColor="#2e5c3e" stopOpacity="1" />
        </radialGradient>
        <filter id="wormShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1d3d28" floodOpacity="0.25" />
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
          filter="url(#wormShadow)"
          opacity={0.9 - i * 0.01}
        />
      ))}
      {/* Segment lines */}
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((i) => (
        <ellipse
          key={`line-${i}`}
          cx={20 + i * 26 - 13}
          cy={60 + Math.sin(i * 0.8) * 18}
          rx={1.5}
          ry={9}
          fill="#1d3d28"
          opacity={0.2}
        />
      ))}
      {/* Head */}
      <ellipse cx={16} cy={60} rx={18} ry={16} fill="url(#wormGradHead)" filter="url(#wormShadow)" />
      {/* Eyes */}
      <circle cx={10} cy={54} r={3.5} fill="#f9f5ef" />
      <circle cx={22} cy={54} r={3.5} fill="#f9f5ef" />
      <circle cx={10} cy={55} r={2} fill="#1a1612" />
      <circle cx={22} cy={55} r={2} fill="#1a1612" />
      <circle cx={9} cy={54} r={0.8} fill="#ffffff" opacity={0.8} />
      <circle cx={21} cy={54} r={0.8} fill="#ffffff" opacity={0.8} />
      {/* Smile */}
      <path d="M 10 63 Q 13 67 18 63" stroke="#1d3d28" strokeWidth="1.5" fill="none" opacity={0.5} strokeLinecap="round" />
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-cream"
      style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
    >
      {/* Warm radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(46,92,62,0.05)_0%,transparent_70%)]" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(26,22,18,0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: 0.4,
      }} />

      {/* Decorative worms — desktop only */}
      <WormSVG
        className="worm-bg w-[400px] animate-float hidden md:block"
        style={{ top: '18%', left: '-4%', transform: 'rotate(-18deg)', opacity: 0.07 }}
      />
      <WormSVG
        className="worm-bg w-[350px] animate-float-slow hidden md:block"
        style={{ bottom: '14%', right: '-4%', transform: 'rotate(165deg)', opacity: 0.06, animationDelay: '3s' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-5 pt-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-forest uppercase">
          <div className="w-5 sm:w-8 h-px bg-forest opacity-50 shrink-0" />
          <span className="whitespace-nowrap">Magnesium Glycinate · Gummy Worms</span>
          <div className="w-5 sm:w-8 h-px bg-forest opacity-50 shrink-0" />
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-none mb-6">
          <span className="block text-[clamp(2.8rem,12vw,9rem)] text-ink tracking-tight">
            The Worm
          </span>
          <span className="block text-[clamp(2.8rem,12vw,9rem)] italic text-forest tracking-tight">
            that puts
          </span>
          <span className="block text-[clamp(2.8rem,12vw,9rem)] text-ink tracking-tight">
            you down.
          </span>
        </h1>

        {/* Sub */}
        <p className="font-body text-xs sm:text-sm text-stone max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed tracking-wide px-2">
          400mg magnesium glycinate per serving.
          <br className="hidden sm:block" />
          {' '}No melatonin. No morning fog. Just deep, biological sleep.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#product"
            className="w-full sm:w-auto bg-forest text-cream font-body text-xs sm:text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-fern transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Shop SleepWorms
          </a>
          <a
            href="#science"
            className="w-full sm:w-auto font-body text-xs sm:text-sm tracking-[0.2em] text-stone uppercase border border-ink/15 px-8 sm:px-10 py-3.5 sm:py-4 hover:border-forest hover:text-forest transition-all duration-300 text-center"
          >
            The Science
          </a>
        </div>

        {/* Floating worm visual */}
        <div className="mt-10 sm:mt-16 relative flex justify-center">
          <div className="relative animate-float w-full max-w-[260px] sm:max-w-[400px]" style={{ animationDuration: '5s' }}>
            <WormSVG style={{ width: '100%', filter: 'drop-shadow(0 8px 24px rgba(46,92,62,0.2))' }} />
            {/* Ground shadow */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-3 bg-forest/10 blur-xl rounded-full" />
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
