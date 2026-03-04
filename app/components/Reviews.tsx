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
    <section id="reviews" ref={ref} className="relative py-16 sm:py-24 lg:py-32 px-5 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20 reveal">
          <div className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-forest/70 uppercase mb-4">
            What sleepers say
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-ink font-light">
            <span className="italic text-forest">4.9 stars.</span><br />
            1,200+ reviews.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/8 reveal">
          {reviews.map((r, i) => (
            <div
              key={r.author}
              className="bg-parchment p-6 sm:p-8 hover:bg-cream transition-colors duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-4 sm:mb-6">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <svg key={j} viewBox="0 0 12 12" className="w-3 h-3 fill-forest">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-display text-lg sm:text-xl text-ink leading-relaxed italic mb-4 sm:mb-6">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div>
                <div className="font-body text-xs text-forest tracking-wider">{r.author}</div>
                <div className="font-body text-[10px] text-stone tracking-wider mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 sm:mt-20 reveal">
          <div className="font-display text-2xl sm:text-3xl md:text-4xl text-ink font-light mb-5 sm:mb-6">
            Join them tonight.
          </div>
          <a
            href="#product"
            className="inline-block bg-forest text-cream font-body text-xs sm:text-sm tracking-[0.2em] uppercase px-10 sm:px-12 py-4 hover:bg-fern transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Shop SleepWorms
          </a>
        </div>
      </div>
    </section>
  )
}
