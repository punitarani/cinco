import { jsonb, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 120 }),
    lastName: varchar('last_name', { length: 120 }),
    dob: varchar('dob', { length: 10 }),
    contactInfo: jsonb('contact_info'),
    insuranceInfo: jsonb('insurance_info'),
    mrns: jsonb('mrns'),
    createdAt: timestamp('created_at')
        .$defaultFn(() => new Date())
        .notNull(),
});
