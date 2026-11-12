import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema.js'

const configuredPath = process.env.DATABASE_PATH

if (!configuredPath) {
  throw new Error('DATABASE_PATH is not set. Copy .env.example to .env and set the path to your SQLite database.')
}

export const databasePath = resolve(configuredPath)

if (!existsSync(databasePath)) {
  throw new Error(`SQLite database not found at ${databasePath}. Set DATABASE_PATH in .env to the existing database file.`)
}

const sqlite = new Database(databasePath)
sqlite.exec('PRAGMA foreign_keys = ON')

export const db = drizzle({ client: sqlite, schema })
