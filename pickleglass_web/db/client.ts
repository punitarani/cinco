import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../../src/db/schema';

export const db = drizzle('postgres://postgres:postgres@localhost:5432/cinco', {
  schema,
});

export type Db = typeof db;

export type Transaction = Parameters<typeof db.transaction>[0] extends (
  tx: infer T
) => unknown
  ? T
  : never;
