'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const DISCOUNT_CODE = 'WRMS15'
const STORAGE_KEY = 'wrms_popup_dismissed'

type Phase = 'hidden' | 'teaser' | 'revealed'

export default function MysteryPopup() {
  const [phase, setPhase] = useState<Phase>('hidden')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    timerRef.current = setTimeout(() => setPhase('teaser'), 6000)
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

  useEffect(() => {
    document.body.style.overflow = phase !== 'hidden' ? 'hidden' : ''
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={dismiss} />

      <div className="pop-in relative w-full sm:max-w-md bg-cloud sm:rounded overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden">
          {/* Product image bg */}
          <div className="absolute inset-0">
            <Image src="/product-lineup.jpg" alt="" fill className="object-cover opacity-40" sizes="448px" />
            <div className="absolute inset-0 bg-navy/70" />
          </div>

          <div className="relative z-10 px-6 sm:px-8 py-6 sm:py-8 text-center">
            <button onClick={dismiss} className="absolute right-4 top-4 text-cloud/60 hover:text-cloud text-2xl leading-none transition-colors">×</button>

            {phase === 'teaser' ? (
              <>
                <div className="font-body text-[10px] tracking-[0.3em] text-teal uppercase mb-2">Wait — before you go</div>
                <div className="font-display text-3xl sm:text-4xl text-cloud italic font-light leading-tight">
                  A mystery offer<br />is waiting for you
                </div>
                <div className="mt-3 flex justify-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-cloud/30 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="font-body text-[10px] tracking-[0.3em] text-teal uppercase mb-2">Your offer is revealed</div>
                <div className="font-display text-5xl sm:text-6xl text-cloud font-light">15% Off</div>
                <div className="font-body text-xs text-cloud/60 mt-1 tracking-wider">your first order</div>
              </>
            )}
          </div>
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
                  className="w-full border border-ink/15 bg-cloud font-body text-xs text-ink px-4 py-3 focus:outline-none focus:border-navy placeholder:text-stone/40 tracking-wider"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-navy text-cloud font-body text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-indigo transition-all duration-300 disabled:opacity-60 min-h-[48px]"
                >
                  {submitting ? 'Unlocking...' : 'Reveal My Offer →'}
                </button>
              </form>
              <p className="font-body text-[9px] text-stone/50 text-center mt-4 tracking-wider">No spam. Unsubscribe anytime.</p>
            </>
          ) : (
            <>
              <p className="font-body text-xs text-stone text-center leading-relaxed mb-6">
                Use this code at checkout. Valid for 48 hours — don&apos;t sleep on it. (Well, do sleep. That&apos;s the whole point.)
              </p>
              <button
                onClick={copyCode}
                className="w-full flex items-center justify-between border-2 border-dashed border-navy/30 bg-mist px-5 py-4 hover:bg-haze transition-colors group"
              >
                <span className="font-body text-lg sm:text-xl tracking-[0.3em] text-navy font-medium">{DISCOUNT_CODE}</span>
                <span className="font-body text-[10px] tracking-widest text-navy/50 uppercase group-hover:text-navy transition-colors">
                  {copied ? '✓ Copied!' : 'Tap to copy'}
                </span>
              </button>
              <a
                href="#product"
                onClick={dismiss}
                className="mt-3 block w-full bg-navy text-cloud font-body text-xs tracking-[0.2em] uppercase py-3.5 text-center hover:bg-indigo transition-all duration-300 min-h-[48px] leading-[3rem]"
              >
                Shop Now
              </a>
              <p className="font-body text-[9px] text-stone/50 text-center mt-4 tracking-wider">Expires in 48 hours · One use per customer</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
