import cors from 'cors'
import express from 'express'
import { products } from './data/products'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/products', (_, response) => {
  response.json(products)
})

app.listen(port, () => {
  console.log(`Express API running on http://localhost:${port}`)
})