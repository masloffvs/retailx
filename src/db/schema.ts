import {
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  categoryId: integer('category_id').primaryKey(),
  code: text('code'),
  name: text('name'),
  parentId: integer('parent_id'),
})

export const metadata = sqliteTable('metadata', {
  key: text('key').primaryKey(),
  value: text('value'),
})

export const products = sqliteTable('products', {
  productId: integer('product_id').primaryKey(),
  id: integer('id'),
  name: text('name'),
  vendorCode: text('vendor_code'),
  barcode: text('barcode'),
  price: real('price'),
  cost: real('cost'),
  totalQty: integer('total_qty'),
  mainImage: text('main_image'),
  code: text('code'),
  isActive: integer('is_active', { mode: 'boolean' }),
  brandId: integer('brand_id'),
  description: text('description'),
  type: integer('type'),
  weight: real('weight'),
  weightGross: real('weight_gross'),
  length: real('length'),
  height: real('height'),
  width: real('width'),
  isAdult: integer('is_adult', { mode: 'boolean' }),
  isFavorite: integer('is_favorite', { mode: 'boolean' }),
  infoPrice: text('info_price'),
  gluingName: text('gluing_name'),
  gluingIsMain: integer('gluing_is_main', { mode: 'boolean' }),
  gluingIsActive: integer('gluing_is_active', { mode: 'boolean' }),
  uom: text('uom'),
  alternativeUom: text('alternative_uom'),
  rawJson: text('raw_json').notNull(),
}, (table) => [
  index('idx_products_barcode').on(table.barcode),
  index('idx_products_code').on(table.code),
  index('idx_products_name').on(table.name),
  index('idx_products_vendor_code').on(table.vendorCode),
])

export const productAttributes = sqliteTable('product_attributes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.productId),
  name: text('name'),
  code: text('code'),
  type: text('type'),
  rawJson: text('raw_json').notNull(),
}, (table) => [index('idx_product_attributes_code').on(table.code)])

export const productAttributeValues = sqliteTable('product_attribute_values', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  attributeId: integer('attribute_id').notNull().references(() => productAttributes.id),
  name: text('name'),
  value: text('value'),
  rawJson: text('raw_json').notNull(),
})

export const productCategories = sqliteTable('product_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => products.productId),
  categoryId: integer('category_id').references(() => categories.categoryId),
  code: text('code'),
  name: text('name'),
  position: integer('position'),
  parentId: integer('parent_id'),
}, (table) => [
  index('idx_product_categories_category').on(table.categoryId),
  // Existing database has UNIQUE(product_id, category_id) ON CONFLICT REPLACE.
  unique().on(table.productId, table.categoryId),
])

export const productCategoriesPath = sqliteTable('product_categories_path', {
  productId: integer('product_id').notNull().references(() => products.productId),
  position: integer('position').notNull(),
  categoryId: integer('category_id'),
  code: text('code'),
  name: text('name'),
}, (table) => [
  primaryKey({ columns: [table.productId, table.position] }),
])

export const productCategoryIds = sqliteTable('product_category_ids', {
  productId: integer('product_id').notNull().references(() => products.productId),
  categoryId: integer('category_id').notNull(),
  position: integer('position').notNull(),
}, (table) => [
  primaryKey({ columns: [table.productId, table.categoryId] }),
])

export const productImages = sqliteTable('product_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sourceImageId: integer('source_image_id'),
  productId: integer('product_id').notNull().references(() => products.productId),
  sort: integer('sort'),
  name: text('name'),
  url: text('url'),
  rawJson: text('raw_json').notNull(),
}, (table) => [index('idx_product_images_product').on(table.productId, table.sort)])

export const productSourceRecords = sqliteTable('product_source_records', {
  recordNo: integer('record_no').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.productId),
  rawJson: text('raw_json').notNull(),
})

export const productWeightOptions = sqliteTable('product_weight_options', {
  productId: integer('product_id').notNull().references(() => products.productId),
  optionKey: text('option_key').notNull(),
  optionValue: text('option_value'),
}, (table) => [
  primaryKey({ columns: [table.productId, table.optionKey] }),
])

export const storeOffers = sqliteTable('store_offers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => products.productId),
  storeId: integer('store_id'),
  stockQty: integer('stock_qty'),
  price: real('price'),
  cost: real('cost'),
  isAvailable: integer('is_available', { mode: 'boolean' }),
}, (table) => [
  index('idx_store_offers_store').on(table.storeId),
  // Existing database has UNIQUE(product_id, store_id) ON CONFLICT REPLACE.
  unique().on(table.productId, table.storeId),
])
