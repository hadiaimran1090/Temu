import { Router } from 'express'
import { getProducts } from '../controllers/productController'

const productRoutes = Router()

productRoutes.get('/products', getProducts)

export default productRoutes