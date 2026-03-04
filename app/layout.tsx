import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SleepWorms™ — Magnesium Glycinate Gummies for Sleep',
  description: 'Drift into deep, restorative sleep with our physician-formulated magnesium glycinate gummy worms. No melatonin. No morning fog. Just sleep.',
  openGraph: {
    title: 'SleepWorms™',
    description: 'The last thing you put in your mouth before you sleep.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
