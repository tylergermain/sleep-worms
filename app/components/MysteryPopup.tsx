'use client'
import { useState, useEffect, useRef } from 'react'

const DISCOUNT_CODE = 'WRMS15'
const STORAGE_KEY = 'wrms_quiz_done'

const questions = [
  {
    q: "What's your biggest sleep struggle?",
    opts: ['Falling asleep', 'Staying asleep', 'Waking up groggy', "Can't relax at night"],
  },
  {
    q: 'How long have you dealt with this?',
    opts: ['Just started', '1–6 months', '6 months – 1 year', 'Years'],
  },
  {
    q: 'Have you tried magnesium before?',
    opts: ['No, first time', "Yes — didn't work", 'Yes — it helped a bit', 'Tried pills, hated them'],
  },
]

type Phase = 'hidden' | 'quiz' | 'result'

export default function MysteryPopup() {
  const [phase, setPhase] = useState<Phase>('hidden')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    timerRef.current = setTimeout(() => setPhase('quiz'), 7000)
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && phase === 'hidden' && !sessionStorage.getItem(STORAGE_KEY)) {
        if (timerRef.current) clearTimeout(timerRef.current)
        setPhase('quiz')
      }
    }
    document.addEventListener('mouseleave', onLeave)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [phase])

  useEffect(() => {
    document.body.style.overflow = phase !== 'hidden' ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [phase])

  const dismiss = () => {
    setPhase('hidden')
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  const selectAnswer = (ans: string) => {
    const next = [...answers, ans]
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setPhase('result')
      sessionStorage.setItem(STORAGE_KEY, '1')
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (phase === 'hidden') return null

  const progress = phase === 'quiz' ? ((step) / questions.length) * 100 : 100
  const current = questions[step]

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={dismiss} />

      <div className="pop-in relative w-full sm:max-w-lg bg-cloud sm:rounded overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Progress bar */}
        <div className="h-1 bg-haze">
          <div
            className="h-full bg-indigo transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8">
          {phase === 'quiz' ? (
            <div>
              <div className="label text-indigo">Sleep Quiz</div>
              <div className="text-xs text-stone mt-0.5">Question {step + 1} of {questions.length}</div>
            </div>
          ) : (
            <div className="label text-indigo">Your Results</div>
          )}
          <button onClick={dismiss} className="text-stone hover:text-ink text-xl leading-none transition-colors">×</button>
        </div>

        <div className="p-6 sm:p-8">
          {phase === 'quiz' ? (
            <>
              <h3 className="text-xl font-bold text-ink mb-5" style={{ letterSpacing: '-0.01em' }}>
                {current.q}
              </h3>
              <div className="space-y-2.5">
                {current.opts.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectAnswer(opt)}
                    className="w-full text-left p-4 border border-ink/12 hover:border-navy hover:bg-mist transition-all duration-150 text-sm font-medium text-ink group flex items-center justify-between"
                  >
                    {opt}
                    <span className="text-stone/40 group-hover:text-navy transition-colors text-lg">→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Result */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>
                  wrms is your match
                </h3>
                <p className="text-sm text-stone leading-relaxed">
                  Based on your answers, magnesium glycinate is exactly what your sleep needs.
                  No melatonin. No dependency. Just better sleep — starting tonight.
                </p>
              </div>

              {/* Offer */}
              <div className="bg-mist p-5 mb-5">
                <div className="label text-indigo mb-3">Your exclusive offer</div>
                <div className="text-3xl font-bold text-navy mb-1" style={{ letterSpacing: '-0.03em' }}>15% Off</div>
                <div className="text-sm text-stone mb-4">your first order · valid 48 hours</div>

                <button
                  onClick={copyCode}
                  className="w-full flex items-center justify-between border-2 border-dashed border-navy/30 px-5 py-3 hover:bg-haze transition-colors group"
                >
                  <span className="text-xl font-bold tracking-widest text-navy">{DISCOUNT_CODE}</span>
                  <span className="label text-navy/50 group-hover:text-navy transition-colors">
                    {copied ? '✓ COPIED' : 'TAP TO COPY'}
                  </span>
                </button>
              </div>

              <a href="#product" onClick={dismiss}
                className="btn w-full bg-navy text-cloud py-4 hover:bg-indigo transition-colors block text-center">
                Shop wrms Now →
              </a>
              <p className="text-xs text-stone/50 text-center mt-3">One use per customer · Expires in 48 hours</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
