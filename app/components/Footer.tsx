export default function Footer() {
  return (
    <footer className="bg-navy py-12 sm:py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10">
          <div className="col-span-2 md:col-span-2">
            <div className="text-xl font-extrabold text-cloud mb-3" style={{ letterSpacing: '-0.01em' }}>
              sWrms.
            </div>
            <p className="text-sm text-cloud/50 leading-relaxed max-w-xs">
              Magnesium glycinate gummy worms for deep sleep & relaxation. No melatonin. No morning fog. Just sleep.
            </p>
          </div>
          <div>
            <div className="label text-teal mb-3">Shop</div>
            <div className="space-y-2">
              {['sWrms (60ct)', 'sWrms (120ct)', 'Bundles', 'Subscribe & Save'].map(l => (
                <div key={l}><a href="#product" className="text-sm text-cloud/50 hover:text-cloud transition-colors">{l}</a></div>
              ))}
            </div>
          </div>
          <div>
            <div className="label text-teal mb-3">Company</div>
            <div className="space-y-2">
              {['Our Story', 'The Science', 'FAQ', 'Contact'].map(l => (
                <div key={l}><a href="#" className="text-sm text-cloud/50 hover:text-cloud transition-colors">{l}</a></div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-cloud/8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-cloud/30">
            © 2024 sWrms. These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Refunds'].map(l => (
              <a key={l} href="#" className="text-xs text-cloud/30 hover:text-cloud transition-colors uppercase tracking-wider">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
