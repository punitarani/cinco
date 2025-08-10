import { and, eq } from 'drizzle-orm';
import { db } from '../src/db/client';
import { claimEvents, claims, documents, insuranceProviders, notes, patients } from '../src/db/schema';
import seedData from './data';

async function run(clear = false) {
    if (clear) {
        await db.delete(claimEvents);
        await db.delete(documents);
        await db.delete(notes);
        await db.delete(claims);
        await db.delete(patients);
        await db.delete(insuranceProviders);
    }

    // Insurance providers
    for (const p of seedData.insuranceProviders) {
        try {
            await db.insert(insuranceProviders).values({
                name: p.name,
                payerId: p.payerId ?? null,
                contactInfo: p.contactInfo ?? {},
                planInfo: p.planInfo ?? null,
            });
        } catch {
            // ignore conflicts
        }
    }

    // Build payer map (payerId -> db id)
    const payerMap: Record<string, number> = {};
    for (const p of seedData.insuranceProviders) {
        if (!p.payerId) continue;
        const row = await db.select({ id: insuranceProviders.id }).from(insuranceProviders).where(eq(insuranceProviders.payerId, p.payerId)).limit(1);
        if (row[0]) payerMap[p.payerId] = row[0].id;
    }

    // Patients (avoid duplicates by keying on first/last/dob)
    const patientMap: Record<string, number> = {};
    for (const pt of seedData.patients) {
        const existing = await db
            .select({ id: patients.id })
            .from(patients)
            .where(and(eq(patients.firstName, pt.firstName), eq(patients.lastName, pt.lastName), eq(patients.dob, pt.dob)))
            .limit(1);
        if (existing[0]) {
            patientMap[pt.id] = existing[0].id;
            continue;
        }
        const inserted = await db
            .insert(patients)
            .values({
                firstName: pt.firstName,
                lastName: pt.lastName,
                dob: pt.dob,
                contactInfo: pt.contactInfo ?? {},
                insuranceInfo: pt.insuranceInfo ?? null,
                mrns: pt.mrns ?? [],
            })
            .returning({ id: patients.id });
        patientMap[pt.id] = inserted[0].id;
    }

    // Claims
    const claimMap: Record<string, number> = {};
    for (const cl of seedData.claims) {
        const insuranceProviderId = cl.insuranceProviderPayerId ? (payerMap[cl.insuranceProviderPayerId] ?? null) : null;
        const patientId = patientMap[cl.patientId];
        try {
            const inserted = await db
                .insert(claims)
                .values({
                    patientId,
                    insuranceProviderId,
                    claimNumber: cl.claimNumber,
                    claimData: cl.claimData ?? {},
                    status: cl.status as typeof claims.$inferInsert.status,
                    serviceDates: cl.serviceDates ?? {},
                    billedAmount: cl.billedAmount ?? 0,
                    allowedAmount: cl.allowedAmount ?? 0,
                    paidAmount: cl.paidAmount ?? 0,
                    deniedAmount: cl.deniedAmount ?? 0,
                    primaryDenialCode: cl.primaryDenialCode ?? null,
                    primaryDenialText: cl.primaryDenialText ?? null,
                })
                .returning({ id: claims.id });
            claimMap[cl.id] = inserted[0].id;
        } catch {
            const existing = await db.select({ id: claims.id }).from(claims).where(eq(claims.claimNumber, cl.claimNumber)).limit(1);
            if (existing[0]) claimMap[cl.id] = existing[0].id;
        }
    }

    // Documents
    for (const doc of seedData.documents) {
        const patientId = patientMap[doc.patientId];
        const claimId = doc.claimId ? (claimMap[doc.claimId] ?? null) : null;
        if (doc.sha256) {
            const existing = await db.select({ id: documents.id }).from(documents).where(eq(documents.sha256, doc.sha256)).limit(1);
            if (existing[0]) continue;
        }
        try {
            await db.insert(documents).values({
                patientId,
                claimId,
                docType: doc.docType as typeof documents.$inferInsert.docType,
                metadata: doc.metadata ?? {},
                fileName: doc.fileName,
                filePath: doc.filePath ?? null,
                sha256: doc.sha256 ?? null,
            });
        } catch {
            // ignore
        }
    }

    // Claim events
    for (const ev of seedData.claimEvents) {
        const claimId = claimMap[ev.claimId];
        if (!claimId) continue;
        try {
            await db.insert(claimEvents).values({
                claimId,
                eventType: ev.eventType as typeof claimEvents.$inferInsert.eventType,
                eventData: ev.eventData ?? {},
            });
        } catch {
            // ignore
        }
    }

    // Notes
    for (const n of seedData.notes) {
        const patientId = patientMap[n.patientId];
        const claimId = n.claimId ? (claimMap[n.claimId] ?? null) : null;
        try {
            await db.insert(notes).values({ patientId, claimId, type: n.type, metadata: n.metadata ?? {}, content: n.content ?? '' });
        } catch {
            // ignore
        }
    }

    console.log('Seeding completed.');
    process.exit(0);
}

const CLEAR_DB = false;
await run(CLEAR_DB);
