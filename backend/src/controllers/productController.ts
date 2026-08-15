import type { Request, Response } from 'express'
import { products } from '../data/products'

export function getProducts(request: Request, response: Response) {
  const category = typeof request.query.category === 'string' ? request.query.category.trim() : ''
  const search = typeof request.query.search === 'string' ? request.query.search.trim().toLocaleLowerCase() : ''

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || category === 'All' || product.category === category
    const matchesSearch = !search || product.title.toLocaleLowerCase().includes(search)

    return matchesCategory && matchesSearch
  })

  response.json(filteredProducts)
}

export function getProduct(request: Request, response: Response) {
  const product = products.find((item) => item.id === Number(request.params.id))
  if (!product) return response.status(404).json({ message: 'Product not found' })
  response.json(product)
}
