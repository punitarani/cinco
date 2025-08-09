import { index, integer, jsonb, pgTable, serial, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';
import { patients } from './patients';
import { insuranceProviders } from './insuranceProviders';

export const claims = pgTable(
    'claims',
    {
        id: serial('id').primaryKey(),
        patientId: integer('patient_id').references(() => patients.id, { onDelete: 'cascade' }),
        insuranceProviderId: integer('insurance_provider_id').references(() => insuranceProviders.id, { onDelete: 'set null' }),
        claimNumber: varchar('claim_number', { length: 120 }),
        claimData: jsonb('claim_data'),
        status: text('status', {
            enum: ['draft', 'submitted', 'processed', 'denied', 'partially_paid', 'paid', 'appealed', 'closed', 'planned'],
        }),
        serviceDates: jsonb('service_dates'),
        billedAmount: integer('billed_amount'),
        allowedAmount: integer('allowed_amount'),
        paidAmount: integer('paid_amount'),
        deniedAmount: integer('denied_amount'),
        primaryDenialCode: varchar('primary_denial_code', { length: 80 }),
        primaryDenialText: text('primary_denial_text'),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [
        unique('uq_claims_claim_number').on(table.claimNumber),
        index('idx_claims_patient').on(table.patientId),
        index('idx_claims_status').on(table.status),
        index('idx_claims_insurance').on(table.insuranceProviderId),
    ]
);
