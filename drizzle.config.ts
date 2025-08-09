import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema',
    out: './migrations',
    dbCredentials: { url: 'postgres://postgres:postgres@localhost:5432/cinco' },
    verbose: true,
    strict: true,
});
