import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./drizzle",
  dbCredentials: { url: "postgres://postgres:postgres@localhost:5432/cinco" },
  verbose: true,
  strict: true,
})
