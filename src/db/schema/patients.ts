import { jsonb, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { ContactInfo, InsuranceInfo } from '../types';

export const patients = pgTable('patients', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 120 }),
    lastName: varchar('last_name', { length: 120 }),
    dob: varchar('dob', { length: 10 }),
    contactInfo: jsonb('contact_info').$type<ContactInfo>(),
    insuranceInfo: jsonb('insurance_info').$type<InsuranceInfo>(),
    mrns: jsonb('mrns').$type<string[]>(),
    createdAt: timestamp('created_at')
        .$defaultFn(() => new Date())
        .notNull(),
});
