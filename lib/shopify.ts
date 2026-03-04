// Shopify Storefront API client
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com'
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN || 'your-storefront-access-token'
const PRODUCT_HANDLE = process.env.NEXT_PUBLIC_PRODUCT_HANDLE || 'magnesium-glycinate-gummy-worms'

const SHOPIFY_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export interface ProductVariant {
  id: string
  title: string
  price: { amount: string; currencyCode: string }
  availableForSale: boolean
}

export interface Product {
  id: string
  title: string
  description: string
  descriptionHtml: string
  images: { edges: { node: { url: string; altText: string } }[] }
  variants: { edges: { node: ProductVariant }[] }
}

export async function getProduct(): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ productByHandle: Product }>(`
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          descriptionHtml
          images(first: 5) {
            edges { node { url altText } }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
              }
            }
          }
        }
      }
    `, { handle: PRODUCT_HANDLE })
    return data.productByHandle
  } catch {
    return null
  }
}

export async function createCart(variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(`
    mutation CartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ merchandiseId: $variantId, quantity: $quantity }]
      }) {
        cart { id checkoutUrl }
      }
    }
  `, { variantId, quantity })
  return data.cartCreate.cart
}
