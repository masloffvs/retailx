import { defineConfig } from 'drizzle-kit'

const databasePath = process.env.DATABASE_PATH

if (!databasePath) {
  throw new Error('DATABASE_PATH is not set. Copy .env.example to .env and set the path to your SQLite database.')
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: databasePath,
  },
})
