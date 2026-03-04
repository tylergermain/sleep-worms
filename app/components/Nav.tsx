'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: '#product', label: 'Shop' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#science', label: 'Science' },
    { href: '#reviews', label: 'Reviews' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-[#04060af0] backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-lg tracking-widest text-white shrink-0">
            SLEEP<span className="glow-text">WORMS</span>
            <span className="font-display text-xs text-mist align-top ml-0.5">™</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 font-body text-xs tracking-widest text-mist uppercase">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-glow transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#product"
            className="hidden md:block glow-border bg-transparent text-glow font-body text-xs tracking-widest uppercase px-4 py-2 hover:bg-glow hover:text-void transition-all duration-300"
          >
            Get Worms
          </a>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#product"
              onClick={() => setOpen(false)}
              className="glow-border text-glow font-body text-[10px] tracking-widest uppercase px-3 py-1.5 hover:bg-glow hover:text-void transition-all duration-300"
            >
              Get Worms
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-lunar"
            >
              <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-64' : 'max-h-0'}`}>
          <div className="px-5 pb-6 flex flex-col gap-0 border-t border-white/5">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm tracking-[0.2em] text-mist uppercase py-4 border-b border-white/5 hover:text-glow transition-colors"
                style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
