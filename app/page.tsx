import { getProduct } from '@/lib/shopify'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import Benefits from './components/Benefits'
import Science from './components/Science'
import Ritual from './components/Ritual'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

export const revalidate = 60 // ISR — revalidate product data every 60s

// Fallback mock product for development (before Shopify is connected)
const MOCK_PRODUCT = {
  id: 'mock',
  variants: [
    {
      id: 'gid://shopify/ProductVariant/000000000001',
      title: 'Natural Berry',
      price: { amount: '39.00', currencyCode: 'USD' },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/000000000002',
      title: 'Watermelon',
      price: { amount: '39.00', currencyCode: 'USD' },
      availableForSale: true,
    },
  ],
  price: '39.00',
  currencyCode: 'USD',
}

export default async function Home() {
  // Fetch real product from Shopify; fall back to mock if not configured
  const product = await getProduct()

  const variants = product?.variants?.edges?.map((e) => e.node) ?? MOCK_PRODUCT.variants
  const price = product?.variants?.edges?.[0]?.node?.price?.amount ?? MOCK_PRODUCT.price
  const currencyCode = product?.variants?.edges?.[0]?.node?.price?.currencyCode ?? MOCK_PRODUCT.currencyCode

  return (
    <main>
      <Nav />
      <Hero />
      <ProductSection variants={variants} price={price} currencyCode={currencyCode} />
      <Benefits />
      <Science />
      <Ritual />
      <Reviews />
      <Footer />
    </main>
  )
}
