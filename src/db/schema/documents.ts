import { index, integer, jsonb, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { DocumentMetadata } from '../types';
import { claims } from './claims';
import { patients } from './patients';

export const documents = pgTable(
    'documents',
    {
        id: serial('id').primaryKey(),
        patientId: integer('patient_id').references(() => patients.id, { onDelete: 'cascade' }),
        claimId: integer('claim_id').references(() => claims.id),
        docType: varchar('doc_type', {
            length: 64,
            enum: ['EOB', 'CMS1500', 'NOTE', 'TRANSCRIPT', 'AUDIO', 'IMAGE', 'APPEAL', 'OTHER'],
        }),
        metadata: jsonb('metadata').$type<DocumentMetadata>(),
        fileName: varchar('file_name', { length: 255 }),
        filePath: text('file_path'),
        sha256: varchar('sha256', { length: 128 }),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [index('idx_documents_patient').on(table.patientId), index('idx_documents_claim').on(table.claimId)]
);
