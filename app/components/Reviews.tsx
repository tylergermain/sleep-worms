'use client'
import { useEffect, useRef } from 'react'

const reviews = [
  {
    quote: "I've tried everything — melatonin, magnesium citrate, sleep gummies that tasted like chalk. SleepWorms hit different. Week 2, I woke up before my alarm for the first time in years.",
    author: 'Maya R.',
    role: 'ER Nurse, Chicago',
    stars: 5,
  },
  {
    quote: "The gummy worm format is kinda genius — I actually look forward to taking my magnesium now. And the sleep quality is noticeably better. Deep, dark, no 3am wake-ups.",
    author: 'James T.',
    role: 'Software Eng, Austin',
    stars: 5,
  },
  {
    quote: "No grogginess the next morning. That was my main issue with everything else I tried. These just... work quietly. Can't explain it. Just sleep.",
    author: 'Priya K.',
    role: 'Product Manager, NYC',
    stars: 5,
  },
  {
    quote: "Started taking two worms before reading in bed. Out within 20 minutes consistently now. My wife noticed before I did.",
    author: 'Derek M.',
    role: 'High school teacher, Oregon',
    stars: 5,
  },
]

export default function Reviews() {
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
    <section id="reviews" ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20 reveal">
          <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-glow/60 uppercase mb-4">
            What sleepers say
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-lunar font-light">
            <span className="italic text-glow">4.9 stars.</span><br />
            1,200+ reviews.
          </h2>
        </div>

        {/* Reviews — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 reveal">
          {reviews.map((r, i) => (
            <div
              key={r.author}
              className="bg-void p-6 sm:p-8 hover:bg-midnight transition-colors duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <div key={j} className="w-2 h-2 sm:w-3 sm:h-3 bg-glow rounded-full opacity-80" />
                ))}
              </div>

              <blockquote className="font-display text-lg sm:text-xl text-lunar/90 leading-relaxed italic mb-4 sm:mb-6">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div>
                <div className="font-body text-xs text-glow/80 tracking-wider">{r.author}</div>
                <div className="font-body text-[10px] text-mist tracking-wider mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 sm:mt-20 reveal">
          <div className="font-display text-2xl sm:text-3xl md:text-4xl text-lunar font-light mb-5 sm:mb-6">
            Join them tonight.
          </div>
          <a
            href="#product"
            className="inline-block bg-glow text-void font-body text-xs sm:text-sm tracking-[0.2em] uppercase px-10 sm:px-12 py-4 hover:shadow-[0_0_50px_rgba(168,255,90,0.6)] transition-all duration-300"
          >
            Shop SleepWorms
          </a>
        </div>
      </div>
    </section>
  )
}
