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
    <nav className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || open ? 'bg-cloud/95 backdrop-blur-md shadow-[0_1px_0_rgba(15,16,35,0.08)]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo — comfrt style: bold, clean, tight */}
        <a href="#" className="font-sans font-800 text-xl tracking-tight text-navy shrink-0 leading-none" style={{ fontWeight: 800 }}>
          wrms.
        </a>

        {/* Desktop links — comfrt: uppercase, tight, bold */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-stone hover:text-navy transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#product"
          className="hidden md:block btn bg-navy text-cloud px-5 py-2.5 hover:bg-indigo transition-colors duration-200"
        >
          Shop Now
        </a>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <a href="#product" onClick={() => setOpen(false)} className="btn bg-navy text-cloud px-4 py-2 hover:bg-indigo transition-colors text-[11px]">
            Shop
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-ink">
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${open ? 'max-h-72' : 'max-h-0'}`}>
        <div className="px-5 pb-5 flex flex-col bg-cloud shadow-[0_4px_12px_rgba(15,16,35,0.06)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="nav-link text-stone py-3.5 border-b border-ink/5 hover:text-navy transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#product" onClick={() => setOpen(false)}
            className="btn bg-navy text-cloud text-center py-3 mt-4 hover:bg-indigo transition-colors">
            Shop wrms
          </a>
        </div>
      </div>
    </nav>
  )
}
