const { jsonb, pgTable, serial, timestamp, varchar } = require('drizzle-orm/pg-core');

/**
 * Patients table schema
 * Stores patient demographic and contact information
 */
const patients = pgTable('patients', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 120 }),
    lastName: varchar('last_name', { length: 120 }),
    dob: varchar('dob', { length: 10 }),
    contactInfo: jsonb('contact_info'), // ContactInfo type
    insuranceInfo: jsonb('insurance_info'), // InsuranceInfo type
    mrns: jsonb('mrns'), // string[] type
    createdAt: timestamp('created_at')
        .$defaultFn(() => new Date())
        .notNull(),
});

module.exports = { patients };
