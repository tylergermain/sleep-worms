'use client'
import { useState, useEffect, useRef } from 'react'

const DISCOUNT_CODE = 'SLEEP15'
const STORAGE_KEY = 'sw_popup_dismissed'

type Phase = 'hidden' | 'teaser' | 'revealed'

export default function MysteryPopup() {
  const [phase, setPhase] = useState<Phase>('hidden')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) return

    // Show after 6 seconds
    timerRef.current = setTimeout(() => setPhase('teaser'), 6000)

    // Exit intent on desktop
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && phase === 'hidden' && !sessionStorage.getItem(STORAGE_KEY)) {
        if (timerRef.current) clearTimeout(timerRef.current)
        setPhase('teaser')
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [phase])

  // Lock body scroll when open
  useEffect(() => {
    if (phase !== 'hidden') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [phase])

  const dismiss = () => {
    setPhase('hidden')
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    // Simulate API call (replace with your email provider integration)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setPhase('revealed')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (phase === 'hidden') return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="pop-in relative w-full sm:max-w-md bg-cream sm:rounded overflow-hidden shadow-2xl">
        {/* Green header strip */}
        <div className="bg-forest px-6 sm:px-8 py-5 sm:py-6 text-center relative">
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 text-cream/60 hover:text-cream text-2xl leading-none transition-colors"
          >
            ×
          </button>

          {phase === 'teaser' ? (
            <>
              <div className="font-body text-[10px] tracking-[0.3em] text-cream/60 uppercase mb-2">
                Wait — before you go
              </div>
              <div className="font-display text-3xl sm:text-4xl text-cream italic font-light leading-tight">
                A mystery offer<br />is waiting for you
              </div>
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-cream/30 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="font-body text-[10px] tracking-[0.3em] text-cream/60 uppercase mb-2">
                Your offer is revealed
              </div>
              <div className="font-display text-4xl sm:text-5xl text-cream font-light">
                15% Off
              </div>
              <div className="font-body text-xs text-cream/70 mt-1 tracking-wider">your first order</div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6 sm:py-8">
          {phase === 'teaser' ? (
            <>
              <p className="font-body text-xs text-stone text-center leading-relaxed mb-6">
                Enter your email to unlock an exclusive offer. Could be 10%. Could be more. Only one way to find out.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-ink/15 bg-cream font-body text-xs text-ink px-4 py-3 focus:outline-none focus:border-forest placeholder:text-stone/50 tracking-wider"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-forest text-cream font-body text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-fern transition-all duration-300 disabled:opacity-60 min-h-[48px]"
                >
                  {submitting ? 'Unlocking...' : 'Reveal My Offer →'}
                </button>
              </form>
              <p className="font-body text-[9px] text-stone/50 text-center mt-4 tracking-wider">
                No spam. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-xs text-stone text-center leading-relaxed mb-6">
                Use this code at checkout. Valid for 48 hours — don&apos;t sleep on it. (Well, do sleep. That&apos;s the whole point.)
              </p>

              {/* Code block */}
              <button
                onClick={copyCode}
                className="w-full flex items-center justify-between border-2 border-dashed border-forest/40 bg-forest/5 px-5 py-4 hover:bg-forest/10 transition-colors group"
              >
                <span className="font-body text-lg sm:text-xl tracking-[0.3em] text-forest font-medium">
                  {DISCOUNT_CODE}
                </span>
                <span className="font-body text-[10px] tracking-widest text-forest/60 uppercase group-hover:text-forest transition-colors">
                  {copied ? '✓ Copied!' : 'Tap to copy'}
                </span>
              </button>

              <a
                href="#product"
                onClick={dismiss}
                className="mt-4 block w-full bg-forest text-cream font-body text-xs tracking-[0.2em] uppercase py-3.5 text-center hover:bg-fern transition-all duration-300 min-h-[48px] leading-[3rem]"
              >
                Shop Now
              </a>

              <p className="font-body text-[9px] text-stone/50 text-center mt-4 tracking-wider">
                Expires in 48 hours · One use per customer
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
