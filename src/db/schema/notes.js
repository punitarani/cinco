const { index, integer, jsonb, pgTable, serial, text, timestamp, varchar } = require('drizzle-orm/pg-core');
const { claims } = require('./claims');
const { patients } = require('./patients');

/**
 * Notes table schema
 * Stores clinical notes and meeting transcripts
 */
const notes = pgTable(
    'notes',
    {
        id: serial('id').primaryKey(),
        patientId: integer('patient_id').references(() => patients.id, { onDelete: 'cascade' }),
        claimId: integer('claim_id').references(() => claims.id),
        type: varchar('type', { length: 64, enum: ['soap', 'meeting', 'call', 'internal', 'history'] }),
        metadata: jsonb('metadata'), // NoteMetadata type
        content: text('content'),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [index('idx_notes_patient').on(table.patientId)]
);

module.exports = { notes };
