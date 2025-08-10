const { index, integer, jsonb, pgTable, serial, text, timestamp, varchar } = require('drizzle-orm/pg-core');
const { claims } = require('./claims');
const { patients } = require('./patients');

/**
 * Documents table schema
 * Stores file information and metadata for patient documents
 */
const documents = pgTable(
    'documents',
    {
        id: serial('id').primaryKey(),
        patientId: integer('patient_id').references(() => patients.id, { onDelete: 'cascade' }),
        claimId: integer('claim_id').references(() => claims.id),
        docType: varchar('doc_type', {
            length: 64,
            enum: ['EOB', 'CMS1500', 'NOTE', 'TRANSCRIPT', 'AUDIO', 'IMAGE', 'APPEAL', 'OTHER'],
        }),
        metadata: jsonb('metadata'), // DocumentMetadata type
        fileName: varchar('file_name', { length: 255 }),
        filePath: text('file_path'),
        sha256: varchar('sha256', { length: 128 }),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [index('idx_documents_patient').on(table.patientId), index('idx_documents_claim').on(table.claimId)]
);

module.exports = { documents };
