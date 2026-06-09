import { readFileSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const connectionString = "postgresql://postgres:rootBet365@@db.mhaedzsjmcxamzroaede.supabase.co:5432/postgres"

if (!connectionString) {
  console.error('Error: define DATABASE_URL en tu archivo .env')
  process.exit(1)
}

const migrationsDir = join(__dirname, '../supabase/migrations')
const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort()

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()

  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), 'utf-8')
    await client.query(sql)
    console.log(`✓ ${file}`)
  }

  console.log('Migraciones ejecutadas correctamente.')
} catch (err) {
  console.error('Error al ejecutar la migración:', err.message)
  process.exit(1)
} finally {
  await client.end()
}
