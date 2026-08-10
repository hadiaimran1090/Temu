import type { Product } from '../../../shared/types/product'

interface ProductRequestOptions {
  signal?: AbortSignal
  search?: string
}

async function requestProducts(category?: string, { signal, search }: ProductRequestOptions = {}): Promise<Product[]> {
  const params = new URLSearchParams()

  if (category && category !== 'All') params.set('category', category)
  if (search?.trim()) params.set('search', search.trim())

  const query = params.size ? `?${params.toString()}` : ''
  const response = await fetch(`/api/products${query}`, { signal })

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return (await response.json()) as Product[]
}

export function getProducts(options?: ProductRequestOptions): Promise<Product[]> {
  return requestProducts(undefined, options)
}

export function getProductsByCategory(category: string, options?: ProductRequestOptions): Promise<Product[]> {
  return requestProducts(category, options)
}
