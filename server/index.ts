import { serve } from 'bun'
import { count, like, or } from 'drizzle-orm'
import { db } from '../src/db/index.js'
import { products } from '../src/db/schema.js'
import { logger } from './logger.js'

const port = Number(process.env.API_PORT ?? 3001)

function logRequest(request: Request, status: number, startedAt: number, error?: unknown) {
  const { method } = request
  const path = new URL(request.url).pathname
  const responseTimeMs = Number((performance.now() - startedAt).toFixed(2))
  const details = { method, path, status, responseTimeMs }

  if (error) {
    logger.error({ ...details, err: error }, 'API request failed')
  } else if (status >= 500) {
    logger.error(details, 'API request failed')
  } else if (status >= 400) {
    logger.warn(details, 'API request rejected')
  } else {
    logger.info(details, 'API request completed')
  }
}

const server = serve({
  port,
  async fetch(request) {
    const startedAt = performance.now()
    const url = new URL(request.url)

    try {
      let response: Response

      if (url.pathname === '/api/health' && request.method === 'GET') {
        response = Response.json({ status: 'ok' })
      } else if (url.pathname === '/api/products' && request.method === 'GET') {
        const search = url.searchParams.get('q')?.trim()
        const limit = Math.min(Math.max(Number(url.searchParams.get('limit') ?? 50) || 50, 1), 100)

        const rows = db
          .select({
            productId: products.productId,
            name: products.name,
            vendorCode: products.vendorCode,
            barcode: products.barcode,
            price: products.price,
            totalQty: products.totalQty,
            mainImage: products.mainImage,
            isActive: products.isActive,
          })
          .from(products)
          .where(search
            ? or(like(products.name, `%${search}%`), like(products.vendorCode, `%${search}%`), like(products.barcode, `%${search}%`))
            : undefined)
          .limit(limit)
          .all()

        response = Response.json({ data: rows })
      } else if (url.pathname === '/api/products/count' && request.method === 'GET') {
        const [{ value }] = db.select({ value: count() }).from(products).all()
        response = Response.json({ count: value })
      } else {
        response = Response.json({ error: 'Not found' }, { status: 404 })
      }

      logRequest(request, response.status, startedAt)
      return response
    } catch (error) {
      logRequest(request, 500, startedAt, error)
      return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
  },
})

logger.info({ url: server.url }, 'RetailX API listening')
