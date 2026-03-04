import { getProduct } from '@/lib/shopify'
import Nav from '../components/Nav'
import MarqueeBanner from '../components/MarqueeBanner'
import MysteryPopup from '../components/MysteryPopup'
import ProductDetail from '../components/ProductDetail'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'
import StickyCart from '../components/StickyCart'

export const revalidate = 60

const MOCK_VARIANTS = [
  { id: 'gid://shopify/ProductVariant/000000000001', title: 'Natural Berry', price: { amount: '39.00', currencyCode: 'USD' }, availableForSale: true },
  { id: 'gid://shopify/ProductVariant/000000000002', title: 'Watermelon', price: { amount: '39.00', currencyCode: 'USD' }, availableForSale: true },
]

export default async function ProductPage() {
  const product = await getProduct()
  const variants = product?.variants?.edges?.map((e) => e.node) ?? MOCK_VARIANTS
  const price = product?.variants?.edges?.[0]?.node?.price?.amount ?? '39.00'
  const currencyCode = product?.variants?.edges?.[0]?.node?.price?.currencyCode ?? 'USD'

  return (
    <main>
      <MarqueeBanner />
      <Nav />
      <MysteryPopup />
      <ProductDetail variants={variants} price={price} currencyCode={currencyCode} />
      <Reviews />
      <Footer />
      <StickyCart variants={variants} price={price} currencyCode={currencyCode} />
    </main>
  )
}
