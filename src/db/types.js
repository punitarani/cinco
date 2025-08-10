const { z } = require('zod');

/**
 * Contact information schema
 * @typedef {Object} ContactInfo
 * @property {string} [phone] - Phone number
 * @property {string} [email] - Email address
 * @property {string} [address] - Physical address
 */
const zContactInfo = z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
});

/**
 * Insurance information schema
 * @typedef {Object} InsuranceInfo
 * @property {Object} primary - Primary insurance details
 * @property {string} primary.payerName - Insurance payer name
 * @property {string} [primary.payerCode] - Insurance payer code
 * @property {string} [primary.memberId] - Member ID
 * @property {string} [primary.groupNumber] - Group number
 * @property {string} [primary.planName] - Plan name
 * @property {string} [primary.relationship] - Relationship to insured
 * @property {string} [primary.effectiveDate] - Effective date
 * @property {string|null} [primary.terminationDate] - Termination date
 * @property {string} [primary.notes] - Additional notes
 * @property {Object} [secondary] - Secondary insurance details
 */
const zInsuranceInfo = z.object({
    primary: z.object({
        payerName: z.string(),
        payerCode: z.string().optional(),
        memberId: z.string().optional(),
        groupNumber: z.string().optional(),
        planName: z.string().optional(),
        relationship: z.string().optional(),
        effectiveDate: z.string().optional(),
        terminationDate: z.string().nullable().optional(),
        notes: z.string().optional(),
    }),
    secondary: z
        .object({
            payerName: z.string(),
            payerCode: z.string().optional(),
            memberId: z.string().optional(),
            groupNumber: z.string().optional(),
            planName: z.string().optional(),
            relationship: z.string().optional(),
            effectiveDate: z.string().optional(),
        })
        .optional(),
});

/**
 * Claim data schema
 * @typedef {Object} ClaimData
 * @property {string} [formType] - Type of claim form
 * @property {Array} [lines] - Claim line items
 * @property {Object} [rawForm] - Raw form data
 */
const zClaimData = z.object({
    formType: z.string().optional(),
    lines: z
        .array(
            z.object({
                lineNumber: z.number().optional(),
                cpt: z.string().optional(),
                modifiers: z.array(z.string()).optional(),
                units: z.number().optional(),
                charge: z.number().optional(),
                dxCodes: z.array(z.string()).optional(),
                serviceFrom: z.string().optional(),
                serviceTo: z.string().optional(),
                notes: z.string().optional(),
            })
        )
        .optional(),
    rawForm: z.record(z.any()).optional(),
});

/**
 * Service dates schema
 * @typedef {Object} ServiceDates
 * @property {string} [start] - Service start date
 * @property {string} [end] - Service end date
 */
const zServiceDates = z.object({
    start: z.string().optional(),
    end: z.string().optional(),
});

/**
 * Event data schema
 * @typedef {Object} EventData
 * @property {string} [reason] - Event reason
 * @property {number} [amount] - Event amount
 * @property {string} [notes] - Event notes
 * @property {string} [relatedDocumentFileName] - Related document file name
 */
const zEventData = z.object({
    reason: z.string().optional(),
    amount: z.number().optional(),
    notes: z.string().optional(),
    relatedDocumentFileName: z.string().optional(),
});

/**
 * Note metadata schema
 * @typedef {Object} NoteMetadata
 * @property {Array} [participants] - Meeting participants
 * @property {string} [channel] - Communication channel
 * @property {string} [sessionId] - Session identifier
 * @property {Array} [consentEvents] - Consent events
 */
const zNoteMetadata = z.object({
    participants: z
        .array(
            z.object({
                role: z.string().optional(),
                displayName: z.string().optional(),
                id: z.string().optional(),
            })
        )
        .optional(),
    channel: z.string().optional(),
    sessionId: z.string().optional(),
    consentEvents: z
        .array(
            z.object({
                actorId: z.string().optional(),
                actorRole: z.string().optional(),
                timestamp: z.string().optional(),
                action: z.string().optional(),
                docFileName: z.string().optional(),
                snippet: z.string().optional(),
            })
        )
        .optional(),
});

/**
 * Document metadata schema
 * @typedef {Object} DocumentMetadata
 * @property {string} [documentRole] - Document role
 * @property {string} [payer] - Payer name
 * @property {string} [payerClaimId] - Payer claim ID
 * @property {string} [dosFrom] - Date of service from
 * @property {string} [dosTo] - Date of service to
 * @property {number} [billedAmount] - Billed amount
 * @property {number} [paidAmount] - Paid amount
 * @property {number} [deniedAmount] - Denied amount
 * @property {string} [denialCode] - Denial code
 * @property {string} [denialText] - Denial text
 * @property {string} [procedure] - Procedure
 * @property {Object} [additional] - Additional metadata
 */
const zDocumentMetadata = z.object({
    documentRole: z.string().optional(),
    payer: z.string().optional(),
    payerClaimId: z.string().optional(),
    dosFrom: z.string().optional(),
    dosTo: z.string().optional(),
    billedAmount: z.number().optional(),
    paidAmount: z.number().optional(),
    deniedAmount: z.number().optional(),
    denialCode: z.string().optional(),
    denialText: z.string().optional(),
    procedure: z.string().optional(),
    additional: z.record(z.any()).optional(),
});

module.exports = {
    zContactInfo,
    zInsuranceInfo,
    zClaimData,
    zServiceDates,
    zEventData,
    zNoteMetadata,
    zDocumentMetadata,
};
