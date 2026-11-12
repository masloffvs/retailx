import { serve } from 'bun'
import { count, like, or } from 'drizzle-orm'
import { db } from '../src/db/index.js'
import { products } from '../src/db/schema.js'

const port = Number(process.env.API_PORT ?? 3001)

const server = serve({
  port,
  fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return Response.json({ status: 'ok' })
    }

    if (url.pathname === '/api/products' && request.method === 'GET') {
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

      return Response.json({ data: rows })
    }

    if (url.pathname === '/api/products/count' && request.method === 'GET') {
      const [{ value }] = db.select({ value: count() }).from(products).all()
      return Response.json({ count: value })
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  },
})

console.log(`RetailX API listening on ${server.url}`)
