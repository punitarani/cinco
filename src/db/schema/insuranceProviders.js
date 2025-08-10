const { jsonb, pgTable, serial, timestamp, unique, varchar } = require('drizzle-orm/pg-core');

/**
 * Insurance providers table schema
 * Stores insurance company information and contact details
 */
const insuranceProviders = pgTable(
    'insurance_providers',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 255 }),
        payerId: varchar('payer_id', { length: 80 }),
        contactInfo: jsonb('contact_info'), // ContactInfo type
        planInfo: jsonb('plan_info'), // InsuranceInfo type
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [unique().on(table.payerId)]
);

module.exports = { insuranceProviders };
