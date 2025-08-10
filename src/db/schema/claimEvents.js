const { index, integer, jsonb, pgTable, serial, timestamp, varchar } = require('drizzle-orm/pg-core');
const { claims } = require('./claims');

/**
 * Claim events table schema
 * Stores events and activities related to insurance claims
 */
const claimEvents = pgTable(
    'claim_events',
    {
        id: serial('id').primaryKey(),
        claimId: integer('claim_id').references(() => claims.id, { onDelete: 'cascade' }),
        eventType: varchar('event_type', {
            length: 64,
            enum: ['submission', 'eob_received', 'appeal_drafted', 'payment', 'note', 'adjustment', 'other'],
        }),
        eventData: jsonb('event_data'), // EventData type
        createdAt: timestamp('created_at')
            .$defaultFn(() => new Date())
            .notNull(),
    },
    table => [index('idx_claim_events_claim').on(table.claimId)]
);

module.exports = { claimEvents };
