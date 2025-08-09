import { z } from 'zod';

export const zContactInfo = z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
});

export type ContactInfo = z.infer<typeof zContactInfo>;

export const zInsuranceInfo = z.object({
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

export type InsuranceInfo = z.infer<typeof zInsuranceInfo>;

export const zClaimData = z.object({
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

export type ClaimData = z.infer<typeof zClaimData>;

export const zServiceDates = z.object({
    start: z.string().optional(),
    end: z.string().optional(),
});

export type ServiceDates = z.infer<typeof zServiceDates>;

export const zEventData = z.object({
    reason: z.string().optional(),
    amount: z.number().optional(),
    notes: z.string().optional(),
    relatedDocumentFileName: z.string().optional(),
});

export type EventData = z.infer<typeof zEventData>;

export const zNoteMetadata = z.object({
    participants: z.array(z.object({ role: z.string().optional(), displayName: z.string().optional(), id: z.string().optional() })).optional(),
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

export type NoteMetadata = z.infer<typeof zNoteMetadata>;

export const zDocumentMetadata = z.object({
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

export type DocumentMetadata = z.infer<typeof zDocumentMetadata>;
