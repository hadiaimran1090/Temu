# Temu

A React + TypeScript + Vite storefront backed by an Express API.

## Structure

- `frontend/` contains only the Vite React application and calls the API through `src/services/productService.ts`.
- `backend/` contains the Express server, routes, controllers, and product data.
- `shared/types/product.ts` defines the `Product` contract used by both applications.

Product data is served from `backend/src/data/products.ts` through `GET /api/products`.

## Development

Install dependencies once from the repository root, then start both applications:

```bash
npm install
npm run dev
```

The Vite frontend runs at `http://localhost:5173`; the Express API runs at `http://localhost:3001`.

```bash
npm run typecheck
npm run build
```
