'use client'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-cloud">
      {/* Dreamy bg tints */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(91,86,181,0.10)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_80%_70%,rgba(61,184,176,0.07)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-28 sm:pt-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100svh-8rem)]">
          {/* Left — copy */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Eyebrow label — comfrt style */}
            <div className="label text-indigo mb-5">
              Magnesium Glycinate · Sleep Support
            </div>

            {/* Headline — comfrt style: extrabold, large, tight */}
            <h1 className="font-sans leading-none tracking-tight mb-5" style={{
              fontSize: 'var(--size-jumbo)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}>
              Sleep like<br />
              <span className="text-navy">you used to.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base text-stone mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed">
              300mg magnesium glycinate. Calming mixed berry flavor. No melatonin, no morning fog — just the deep, restorative sleep your body craves.
            </p>

            {/* Social proof — comfrt style inline */}
            <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5 fill-indigo">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-stone"><strong className="text-ink">4.9</strong> · 1,247 happy sleepers</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#product"
                className="btn bg-navy text-cloud px-8 py-4 hover:bg-indigo transition-colors duration-200 text-center shadow-sm">
                Shop sWrms — $39
              </a>
              <a href="#science"
                className="btn text-stone border border-ink/15 px-8 py-4 hover:border-navy hover:text-navy transition-colors duration-200 text-center">
                The Science
              </a>
            </div>
          </div>

          {/* Right — product image */}
          <div className="relative flex items-center justify-center order-first md:order-last">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(91,86,181,0.12)_0%,rgba(61,184,176,0.06)_50%,transparent_70%)] rounded-full scale-110" />
            <div className="relative animate-float w-full max-w-[280px] sm:max-w-[380px] md:max-w-[440px]">
              <Image
                src="/product-bag.jpg"
                alt="sWrms Magnesium Glycinate Gummy Worms"
                width={440} height={520}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
