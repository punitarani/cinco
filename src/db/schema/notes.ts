import { index, integer, jsonb, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { NoteMetadata } from '../types';
import { claims } from './claims';
import { patients } from './patients';

export const notes = pgTable(
    'notes',
    {
        id: serial('id').primaryKey(),
        patientId: integer('patient_id').references(() => patients.id, { onDelete: 'cascade' }),
        claimId: integer('claim_id').references(() => claims.id),
        type: varchar('type', { length: 64, enum: ['soap', 'meeting', 'call', 'internal', 'history'] }),
        metadata: jsonb('metadata').$type<NoteMetadata>(),
        content: text('content'),
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [index('idx_notes_patient').on(table.patientId)]
);
