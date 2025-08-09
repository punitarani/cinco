import { jsonb, pgTable, serial, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const insuranceProviders = pgTable(
    'insurance_providers',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 255 }),
        payerId: varchar('payer_id', { length: 80 }),
        contactInfo: jsonb('contact_info'),
        planInfo: jsonb('plan_info'),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [unique().on(table.payerId)]
);
