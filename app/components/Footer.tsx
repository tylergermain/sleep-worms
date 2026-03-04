export default function Footer() {
  return (
    <footer className="relative bg-midnight border-t border-white/5 py-12 sm:py-16 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Grid — 2 col on mobile (brand full width, then 2 link cols), 4 col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-2">
            <div className="font-display text-xl sm:text-2xl tracking-widest text-white mb-3 sm:mb-4">
              SLEEP<span className="glow-text">WORMS</span><span className="text-xs sm:text-sm align-top">™</span>
            </div>
            <p className="font-body text-xs text-mist leading-relaxed max-w-xs">
              The last thing you put in your mouth before you sleep. Magnesium glycinate. Nothing else. Sleep like your life depends on it.
            </p>
          </div>

          {/* Link columns */}
          <div>
            <div className="font-body text-[10px] tracking-[0.3em] text-glow/60 uppercase mb-3 sm:mb-4">Shop</div>
            <div className="space-y-2 sm:space-y-3">
              {['SleepWorms (60ct)', 'SleepWorms (120ct)', 'Bundles', 'Subscribe & Save'].map((l) => (
                <div key={l}>
                  <a href="#product" className="font-body text-xs text-mist hover:text-glow transition-colors">
                    {l}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-body text-[10px] tracking-[0.3em] text-glow/60 uppercase mb-3 sm:mb-4">Company</div>
            <div className="space-y-2 sm:space-y-3">
              {['Our Story', 'The Science', 'FAQ', 'Contact'].map((l) => (
                <div key={l}>
                  <a href="#" className="font-body text-xs text-mist hover:text-glow transition-colors">
                    {l}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar — stacks on mobile */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="font-body text-[9px] sm:text-[10px] text-mist/50 tracking-wider leading-relaxed">
            © 2024 SleepWorms™. These statements have not been evaluated by the FDA.<br className="sm:hidden" /> Not intended to diagnose, treat, cure, or prevent any disease.
          </div>
          <div className="flex gap-4 sm:gap-6">
            {['Privacy', 'Terms', 'Refunds'].map((l) => (
              <a key={l} href="#" className="font-body text-[9px] sm:text-[10px] text-mist/50 hover:text-glow/60 transition-colors tracking-wider uppercase">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
