import { getProduct } from '@/lib/shopify'
import Nav from './components/Nav'
import MarqueeBanner from './components/MarqueeBanner'
import MysteryPopup from './components/MysteryPopup'
import StickyCart from './components/StickyCart'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import Directions from './components/Directions'
import Benefits from './components/Benefits'
import Science from './components/Science'
import BackedByExperts from './components/BackedByExperts'
import ComparisonTable from './components/ComparisonTable'
import Ritual from './components/Ritual'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

export const revalidate = 60

const MOCK_VARIANTS = [
  { id: 'gid://shopify/ProductVariant/000000000001', title: 'Natural Berry', price: { amount: '39.00', currencyCode: 'USD' }, availableForSale: true },
  { id: 'gid://shopify/ProductVariant/000000000002', title: 'Watermelon', price: { amount: '39.00', currencyCode: 'USD' }, availableForSale: true },
]

export default async function Home() {
  const product = await getProduct()
  const variants = product?.variants?.edges?.map((e) => e.node) ?? MOCK_VARIANTS
  const price = product?.variants?.edges?.[0]?.node?.price?.amount ?? '39.00'
  const currencyCode = product?.variants?.edges?.[0]?.node?.price?.currencyCode ?? 'USD'

  return (
    <main>
      <MarqueeBanner />
      <Nav />
      <MysteryPopup />
      <Hero />
      <ProductSection variants={variants} price={price} currencyCode={currencyCode} />
      <Directions />
      <Benefits />
      <Science />
      <BackedByExperts />
      <ComparisonTable />
      <Ritual />
      <Reviews />
      <Footer />
      <StickyCart variants={variants} price={price} currencyCode={currencyCode} />
    </main>
  )
}
