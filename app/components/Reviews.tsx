'use client'
import { useEffect, useRef } from 'react'

const reviews = [
  { quote: "I've tried everything — melatonin, magnesium citrate, sleep gummies that tasted like chalk. wrms hit different. Week 2, I woke up before my alarm for the first time in years.", author: 'Maya R.', role: 'ER Nurse, Chicago', stars: 5 },
  { quote: "The gummy worm format is kinda genius — I actually look forward to taking my magnesium now. Sleep quality is noticeably better. Deep, dark, no 3am wake-ups.", author: 'James T.', role: 'Software Eng, Austin', stars: 5 },
  { quote: "No grogginess the next morning. That was my main issue with everything else I tried. These just work quietly.", author: 'Priya K.', role: 'Product Manager, NYC', stars: 5 },
  { quote: "Started taking two before reading in bed. Out within 20 minutes consistently now. My wife noticed before I did.", author: 'Derek M.', role: 'High school teacher, Oregon', stars: 5 },
]

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="reviews" ref={ref} className="py-16 sm:py-24 px-5 bg-mist">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="label text-indigo mb-3">What sleepers say</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>
            4.9 stars · 1,247 reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/8 reveal">
          {reviews.map((r, i) => (
            <div key={r.author} className="bg-mist p-6 sm:p-8 hover:bg-cloud transition-colors" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <svg key={j} viewBox="0 0 12 12" className="w-3.5 h-3.5 fill-indigo">
                    <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L0 4h4z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-base text-ink leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</blockquote>
              <div>
                <div className="text-sm font-bold text-ink">{r.author}</div>
                <div className="text-xs text-stone mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <p className="text-base text-stone mb-5">Join 12,000+ better sleepers.</p>
          <a href="#product" className="btn bg-navy text-cloud px-10 py-4 hover:bg-indigo transition-colors inline-block">
            Shop wrms
          </a>
        </div>
      </div>
    </section>
  )
}
