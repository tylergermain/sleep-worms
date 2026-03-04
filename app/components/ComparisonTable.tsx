'use client'
import { useEffect, useRef } from 'react'

const rows = [
  { feature: 'No morning grogginess',   wrms: true,  melatonin: false, oxide: false },
  { feature: 'No dependency/tolerance', wrms: true,  melatonin: false, oxide: true  },
  { feature: 'High bioavailability',    wrms: true,  melatonin: true,  oxide: false },
  { feature: 'Muscle relaxation',       wrms: true,  melatonin: false, oxide: true  },
  { feature: 'Cortisol regulation',     wrms: true,  melatonin: false, oxide: true  },
  { feature: 'Anxiety reduction',       wrms: true,  melatonin: false, oxide: false },
  { feature: 'No hormonal disruption',  wrms: true,  melatonin: false, oxide: true  },
  { feature: 'Delicious gummy form',    wrms: true,  melatonin: false, oxide: false },
]

const Check = () => <span className="check">✓</span>
const Cross = () => <span className="cross text-sm font-bold">✗</span>

export default function ComparisonTable() {
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
    <section ref={ref} className="py-16 sm:py-24 px-5 bg-cloud">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="label text-indigo mb-3">How We Stack Up</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>
            wrms vs. the alternatives
          </h2>
        </div>

        <div className="overflow-x-auto reveal">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-navy text-cloud">
                <th className="text-left p-4 text-sm font-bold" style={{ letterSpacing: '-0.01em', width: '40%' }}>Feature</th>
                <th className="p-4 text-center">
                  <div className="text-sm font-bold">wrms.</div>
                  <div className="text-xs opacity-70">Mag. Glycinate</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-sm font-bold">Melatonin</div>
                  <div className="text-xs opacity-70">Other gummies</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-sm font-bold">Mag. Oxide</div>
                  <div className="text-xs opacity-70">Generic pills</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={`border-b border-ink/8 ${i % 2 === 0 ? 'bg-cloud' : 'bg-mist'}`}>
                  <td className="p-4 text-sm text-ink font-medium">{row.feature}</td>
                  <td className="p-4 text-center bg-navy/5">
                    {row.wrms ? <Check /> : <Cross />}
                  </td>
                  <td className="p-4 text-center">{row.melatonin ? <Check /> : <Cross />}</td>
                  <td className="p-4 text-center">{row.oxide ? <Check /> : <Cross />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center reveal">
          <a href="#product" className="btn bg-navy text-cloud px-10 py-4 hover:bg-indigo transition-colors inline-block">
            Choose wrms
          </a>
        </div>
      </div>
    </section>
  )
}
