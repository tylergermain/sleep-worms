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
    <nav className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || open
        ? 'bg-cloud/95 backdrop-blur-md border-b border-ink/8'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl tracking-wide text-navy shrink-0 leading-none">
          <span className="italic">s</span>Wrms<span className="text-indigo">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-body text-xs tracking-widest text-stone uppercase">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-navy transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#product"
          className="hidden md:block border border-navy/30 text-navy font-body text-xs tracking-widest uppercase px-4 py-2 hover:bg-navy hover:text-cloud transition-all duration-300"
        >
          Shop Now
        </a>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#product"
            onClick={() => setOpen(false)}
            className="border border-navy/30 text-navy font-body text-[10px] tracking-widest uppercase px-3 py-1.5 hover:bg-navy hover:text-cloud transition-all duration-300"
          >
            Shop Now
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-ink"
          >
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <div className="px-5 pb-6 flex flex-col border-t border-ink/8 bg-cloud/95">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm tracking-[0.2em] text-stone uppercase py-4 border-b border-ink/5 hover:text-navy transition-colors"
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
