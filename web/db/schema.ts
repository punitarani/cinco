import { pgTable, text, varchar, date, integer, numeric } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  dob: date('dob'),
  phone: varchar('phone', { length: 64 }),
  email: varchar('email', { length: 256 }),
  primaryInsurance: varchar('primary_insurance', { length: 128 }),
  policyNumber: varchar('policy_number', { length: 128 }),
  balance: numeric('balance'),
  paid: numeric('paid'),
  credits: numeric('credits'),
  refunds: numeric('refunds'),
  allergies: text('allergies'),
  chronicConditions: text('chronic_conditions'),
  lastVisit: date('last_visit'),
  nextAppointment: date('next_appointment'),
  pcp: varchar('pcp', { length: 128 }),
  referringProvider: varchar('referring_provider', { length: 128 }),
});

export const claims = pgTable('claims', {
  id: text('id').primaryKey(),
  patientId: text('patient_id').notNull(),
  provider: varchar('provider', { length: 128 }),
  dos: date('dos'),
  insurance: varchar('insurance', { length: 128 }),
  status: varchar('status', { length: 64 }),
  stage: varchar('stage', { length: 128 }),
  insuranceCharges: numeric('insurance_charges'),
  paidAmount: numeric('paid_amount'),
  pr: numeric('pr'),
  adjusted: numeric('adjusted'),
  balance: numeric('balance'),
});

export const claimProcedures = pgTable('claim_procedures', {
  id: text('id').primaryKey(),
  claimId: text('claim_id').notNull(),
  cpt: varchar('cpt', { length: 32 }).notNull(),
  units: integer('units').default(1),
  modifiers: varchar('modifiers', { length: 32 }),
  charge: numeric('charge'),
  paid: numeric('paid'),
  adjusted: numeric('adjusted'),
  prAmount: numeric('pr_amount'),
  balance: numeric('balance'),
});


