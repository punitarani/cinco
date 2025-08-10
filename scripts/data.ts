// data.ts
import type { ClaimData, ContactInfo, DocumentMetadata, EventData, InsuranceInfo, NoteMetadata } from '../src/db/types';

export type SeedPatient = {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    mrns: string[];
    contactInfo: ContactInfo;
    insuranceInfo: InsuranceInfo;
};

export const patients: SeedPatient[] = [
    {
        id: 'P001',
        firstName: 'Maria',
        lastName: 'Gonzalez',
        dob: '1957-11-12',
        mrns: ['MG-001-CLINIC'],
        contactInfo: { phone: '(555) 210-3321', email: 'maria.g@sample.org', address: '1234 Elm St, Smalltown, CA 90001' },
        insuranceInfo: {
            primary: {
                payerName: 'Anthem Blue Cross',
                payerCode: 'ANTH-CA',
                memberId: 'ANT-1234567',
                groupNumber: 'GRP-4455',
                planName: 'Anthem Blue Cross PPO Gold',
                relationship: 'self',
                effectiveDate: '2019-01-01',
                terminationDate: null,
                notes: 'In-network cardiology OK',
            },
        },
    },
    {
        id: 'P002',
        firstName: 'James',
        lastName: 'Carter',
        dob: '1980-02-20',
        mrns: ['JC-001'],
        contactInfo: { phone: '(555) 612-8899', email: 'jim.c@example.net', address: '89 Harbor Rd, Urbanville, CA 90005' },
        insuranceInfo: {
            primary: {
                payerName: 'UnitedHealthcare',
                payerCode: 'UHC-001',
                memberId: 'UHC-987654321',
                groupNumber: 'UHC-GRP-88',
                planName: 'UHC Choice PPO',
                relationship: 'self',
                effectiveDate: '2022-01-01',
            },
        },
    },
    {
        id: 'P003',
        firstName: 'Alex',
        lastName: 'Rivera',
        dob: '1996-04-02',
        mrns: ['AR-001'],
        contactInfo: { phone: '(555) 701-3344', email: 'alex.rivera@example.com', address: '77 Oak Lane, Suburbia, CA 90010' },
        insuranceInfo: {
            primary: {
                payerName: 'Kaiser Permanente',
                payerCode: 'KP-CA',
                memberId: 'KP-332211',
                groupNumber: 'KP-GRP-77',
                planName: 'Kaiser Permanente HMO',
                relationship: 'self',
                effectiveDate: '2023-05-01',
            },
        },
    },
    {
        id: 'P004',
        firstName: 'Harold',
        lastName: 'Bennett',
        dob: '1942-10-30',
        mrns: ['HB-001-MED'],
        contactInfo: { phone: '(555) 433-2200', email: 'harold.b@example.org', address: '230 Willow Way, Oldtown, CA 90020' },
        insuranceInfo: {
            primary: {
                payerName: 'Medicare (CMS FFS)',
                payerCode: 'CMS-FFS',
                memberId: 'MBI-12345',
                planName: 'Medicare Part A/B (FFS)',
                relationship: 'self',
                effectiveDate: '2010-09-01',
            },
            secondary: {
                payerName: 'AARP Medicare Supplement (UnitedHealthcare)',
                payerCode: 'UHC-SUPP',
                memberId: 'SS-889900',
                planName: 'AARP Medicare Supplement Plan G',
                effectiveDate: '2018-06-01',
            },
        },
    },
    {
        id: 'P005',
        firstName: 'Lin',
        lastName: 'Chen',
        dob: '1989-03-18',
        mrns: ['LC-001'],
        contactInfo: { phone: '(555) 878-9900', email: 'lin.chen@sample.com', address: '501 River Ave, Metropolis, CA 90030' },
        insuranceInfo: {
            primary: {
                payerName: 'Blue Shield of California',
                payerCode: 'BSC-CA',
                memberId: 'BSC-554433',
                groupNumber: 'BSC-GRP-77',
                planName: 'Blue Shield HMO Platinum',
                relationship: 'self',
                effectiveDate: '2020-02-01',
            },
        },
    },
];

export type SeedPayer = {
    id: string;
    name: string;
    payerId?: string;
    contactInfo?: ContactInfo;
    planInfo?: InsuranceInfo;
};

export const insuranceProviders: SeedPayer[] = [
    { id: 'INS-1', name: 'Anthem Blue Cross', payerId: 'ANTH-CA', contactInfo: { phone: '(800) 555-1111' } },
    { id: 'INS-2', name: 'UnitedHealthcare', payerId: 'UHC-001', contactInfo: { phone: '(800) 555-2222' } },
    { id: 'INS-3', name: 'Kaiser Permanente', payerId: 'KP-CA', contactInfo: { phone: '(800) 555-3333' } },
    { id: 'INS-4', name: 'Medicare (CMS)', payerId: 'CMS-FFS', contactInfo: { phone: '(800) 333-0000' } },
    { id: 'INS-5', name: 'Blue Shield of California', payerId: 'BSC-CA', contactInfo: { phone: '(800) 555-4444' } },
];

/* Documents */
export type SeedDocument = {
    id: string;
    patientId: string;
    claimId?: string | null;
    docType: string;
    metadata: DocumentMetadata;
    fileName: string;
    filePath?: string | null;
    sha256?: string | null;
};

export const documents: SeedDocument[] = [
    // P001 documents
    {
        id: 'D-P001-01',
        patientId: 'P001',
        claimId: 'C-P001-1',
        docType: 'EOB',
        metadata: {
            payer: 'Anthem Blue Cross',
            payerClaimId: 'ANTH-EOB-1001',
            dosFrom: '2025-06-03',
            billedAmount: 320,
            paidAmount: 0,
            deniedAmount: 320,
            denialCode: 'CO-150',
            denialText: 'Not medically necessary per local cardiology coverage',
        },
        fileName: 'EOB_Anthem_2025-06-10.pdf',
        filePath: '/seed_files/EOB_Anthem_2025-06-10.pdf',
        sha256: 'sha-d-p001-01',
    },
    {
        id: 'D-P001-02',
        patientId: 'P001',
        claimId: 'C-P001-1',
        docType: 'NOTE',
        metadata: { procedure: 'Transthoracic Echocardiogram', additional: { LVEF: 35, reportDate: '2025-03-10' } },
        fileName: 'TTE_Report_2025-03-10.pdf',
        filePath: '/seed_files/TTE_Report_2025-03-10.pdf',
        sha256: 'sha-d-p001-02',
    },
    {
        id: 'D-P001-03',
        patientId: 'P001',
        claimId: 'C-P001-3',
        docType: 'NOTE',
        metadata: { dosFrom: '2025-03-30', dosTo: '2025-04-05', additional: { primary_dx: 'Acute congestive heart failure exacerbation' } },
        fileName: 'Hospital_Discharge_2025-04-05.pdf',
        filePath: '/seed_files/Hospital_Discharge_2025-04-05.pdf',
        sha256: 'sha-d-p001-03',
    },
    {
        id: 'D-P001-04',
        patientId: 'P001',
        claimId: 'C-P001-2',
        docType: 'NOTE',
        metadata: { additional: { type: 'MedicationList', meds: ['Lisinopril', 'Metformin', 'Furosemide', 'Atorvastatin'] } },
        fileName: 'MedicationList_2025-05-01.pdf',
        filePath: '/seed_files/MedicationList_2025-05-01.pdf',
        sha256: 'sha-d-p001-04',
    },
    {
        id: 'D-P001-05',
        patientId: 'P001',
        claimId: 'C-P001-1',
        docType: 'CMS1500',
        metadata: { additional: { cpt: [99214, 93306], claimNumber: 'CLM-P001-1001' } },
        fileName: 'CMS1500_Cardiology_2025-06-03.pdf',
        filePath: '/seed_files/CMS1500_Cardiology_2025-06-03.pdf',
        sha256: 'sha-d-p001-05',
    },

    // P002 documents
    {
        id: 'D-P002-01',
        patientId: 'P002',
        claimId: 'C-P002-1',
        docType: 'IMAGE',
        metadata: { additional: { finding: 'L4-L5 broad-based disc protrusion causing moderate canal stenosis' } },
        fileName: 'MRI_Lumbar_2025-05-22.pdf',
        filePath: '/seed_files/MRI_Lumbar_2025-05-22.pdf',
        sha256: 'sha-d-p002-01',
    },
    {
        id: 'D-P002-02',
        patientId: 'P002',
        claimId: 'C-P002-2',
        docType: 'NOTE',
        metadata: { additional: { type: 'PT Progress', sessions: 8 } },
        fileName: 'PT_Progress_2025-06-20.pdf',
        filePath: '/seed_files/PT_Progress_2025-06-20.pdf',
        sha256: 'sha-d-p002-02',
    },
    {
        id: 'D-P002-03',
        patientId: 'P002',
        claimId: 'C-P002-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'Epidural Injection Record', performer: 'Dr. K. Patel' } },
        fileName: 'Injection_Record_2025-06-30.pdf',
        filePath: '/seed_files/Injection_Record_2025-06-30.pdf',
        sha256: 'sha-d-p002-03',
    },
    {
        id: 'D-P002-04',
        patientId: 'P002',
        claimId: 'C-P002-1',
        docType: 'CMS1500',
        metadata: { additional: { claimNumber: 'CLM-P002-2001' } },
        fileName: 'CMS1500_Spine_2025-05-22.pdf',
        filePath: '/seed_files/CMS1500_Spine_2025-05-22.pdf',
        sha256: 'sha-d-p002-04',
    },
    {
        id: 'D-P002-05',
        patientId: 'P002',
        claimId: 'C-P002-3',
        docType: 'EOB',
        metadata: { payer: 'UnitedHealthcare', payerClaimId: 'UHC-EOB-2001', denialCode: 'CO-197', denialText: 'Preauthorization missing' },
        fileName: 'EOB_UHC_2025-07-05.pdf',
        filePath: '/seed_files/EOB_UHC_2025-07-05.pdf',
        sha256: 'sha-d-p002-05',
    },

    // P003 documents
    {
        id: 'D-P003-01',
        patientId: 'P003',
        claimId: 'C-P003-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'Psych Eval', reportDate: '2024-11-20' } },
        fileName: 'Psych_Eval_2024-11-20.pdf',
        filePath: '/seed_files/Psych_Eval_2024-11-20.pdf',
        sha256: 'sha-d-p003-01',
    },
    {
        id: 'D-P003-02',
        patientId: 'P003',
        claimId: 'C-P003-1',
        docType: 'TRANSCRIPT',
        metadata: { additional: { platform: 'telehealth', sessionId: 'TH-3001' } },
        fileName: 'Telehealth_Visit_2025-02-15.pdf',
        filePath: '/seed_files/Telehealth_Visit_2025-02-15.pdf',
        sha256: 'sha-d-p003-02',
    },
    {
        id: 'D-P003-03',
        patientId: 'P003',
        claimId: 'C-P003-4',
        docType: 'NOTE',
        metadata: { additional: { type: 'Prescription', drug: 'Methylphenidate ER 54mg' } },
        fileName: 'Prescription_2025-02-15.pdf',
        filePath: '/seed_files/Prescription_2025-02-15.pdf',
        sha256: 'sha-d-p003-03',
    },
    {
        id: 'D-P003-04',
        patientId: 'P003',
        claimId: 'C-P003-1',
        docType: 'EOB',
        metadata: { payer: 'Kaiser Permanente' },
        fileName: 'EOB_Kaiser_2025-03-01.pdf',
        filePath: '/seed_files/EOB_Kaiser_2025-03-01.pdf',
        sha256: 'sha-d-p003-04',
    },
    {
        id: 'D-P003-05',
        patientId: 'P003',
        claimId: 'C-P003-1',
        docType: 'CMS1500',
        metadata: { additional: { claimNumber: 'CLM-P003-3001' } },
        fileName: 'CMS1500_BH_2025-02-15.pdf',
        filePath: '/seed_files/CMS1500_BH_2025-02-15.pdf',
        sha256: 'sha-d-p003-05',
    },

    // P004 documents
    {
        id: 'D-P004-01',
        patientId: 'P004',
        claimId: 'C-P004-1',
        docType: 'NOTE',
        metadata: {
            dosFrom: '2025-01-10',
            dosTo: '2025-01-14',
            additional: { primary_dx: 'Community-acquired pneumonia', dischargeSummaryDate: '2025-01-14' },
        },
        fileName: 'Hosp_Pneumonia_2025-01-12.pdf',
        filePath: '/seed_files/Hosp_Pneumonia_2025-01-12.pdf',
        sha256: 'sha-d-p004-01',
    },
    {
        id: 'D-P004-02',
        patientId: 'P004',
        claimId: 'C-P004-2',
        docType: 'IMAGE',
        metadata: { additional: { type: 'Chest X-Ray (CXR)', reportDate: '2025-01-12' } },
        fileName: 'CXR_2025-01-12.pdf',
        filePath: '/seed_files/CXR_2025-01-12.pdf',
        sha256: 'sha-d-p004-02',
    },
    {
        id: 'D-P004-03',
        patientId: 'P004',
        claimId: 'C-P004-3',
        docType: 'NOTE',
        metadata: { procedure: 'Colonoscopy (diagnostic vs screening debate)' },
        fileName: 'Colonoscopy_2024-10-05.pdf',
        filePath: '/seed_files/Colonoscopy_2024-10-05.pdf',
        sha256: 'sha-d-p004-03',
    },
    {
        id: 'D-P004-04',
        patientId: 'P004',
        claimId: 'C-P004-1',
        docType: 'EOB',
        metadata: { payer: 'Medicare' },
        fileName: 'EOB_Medicare_2025-02-02.pdf',
        filePath: '/seed_files/EOB_Medicare_2025-02-02.pdf',
        sha256: 'sha-d-p004-04',
    },
    {
        id: 'D-P004-05',
        patientId: 'P004',
        claimId: 'C-P004-5',
        docType: 'NOTE',
        metadata: { additional: { type: 'Durable Medical Equipment (DME)' } },
        fileName: 'Home_Oxygen_2025-01-20.pdf',
        filePath: '/seed_files/Home_Oxygen_2025-01-20.pdf',
        sha256: 'sha-d-p004-05',
    },

    // P005 documents
    {
        id: 'D-P005-01',
        patientId: 'P005',
        claimId: 'C-P005-1',
        docType: 'IMAGE',
        metadata: { procedure: 'Ultrasound' },
        fileName: 'US_AOB_2025-02-20.pdf',
        filePath: '/seed_files/US_AOB_2025-02-20.pdf',
        sha256: 'sha-d-p005-01',
    },
    {
        id: 'D-P005-02',
        patientId: 'P005',
        claimId: 'C-P005-4',
        docType: 'NOTE',
        metadata: { additional: { type: 'Prenatal visits summary', visits: 6 } },
        fileName: 'PrenatalVisits_2025-02-01_to_2025-07-01.pdf',
        filePath: '/seed_files/PrenatalVisits_2025-02-01_to_2025-07-01.pdf',
        sha256: 'sha-d-p005-02',
    },
    {
        id: 'D-P005-03',
        patientId: 'P005',
        claimId: 'C-P005-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'Glucose logs', range: '2025-05-15 to 2025-07-01' } },
        fileName: 'GlucoseMonitoring_2025-05-15_to_2025-07-01.pdf',
        filePath: '/seed_files/GlucoseMonitoring_2025-05-15_to_2025-07-01.pdf',
        sha256: 'sha-d-p005-03',
    },
    {
        id: 'D-P005-04',
        patientId: 'P005',
        claimId: 'C-P005-1',
        docType: 'CMS1500',
        metadata: { additional: { claimNumber: 'CLM-P005-5001' } },
        fileName: 'CMS1500_OB_2025-06-12.pdf',
        filePath: '/seed_files/CMS1500_OB_2025-06-12.pdf',
        sha256: 'sha-d-p005-04',
    },
    {
        id: 'D-P005-05',
        patientId: 'P005',
        claimId: 'C-P005-3',
        docType: 'EOB',
        metadata: { payer: 'Blue Shield of California', denialCode: 'CO-96', denialText: 'Non-covered DME without prior authorization' },
        fileName: 'EOB_BlueShield_2025-07-01.pdf',
        filePath: '/seed_files/EOB_BlueShield_2025-07-01.pdf',
        sha256: 'sha-d-p005-05',
    },
];

export type SeedNote = {
    id: string;
    patientId: string;
    claimId?: string | null;
    type: 'soap' | 'meeting' | 'call' | 'internal' | 'history';
    metadata?: NoteMetadata;
    content?: string;
};

export const notes: SeedNote[] = [
    {
        id: 'N-P001-1',
        patientId: 'P001',
        claimId: 'C-P001-1',
        type: 'soap',
        metadata: {},
        content:
            'S: 67yo F with progressive dyspnea on exertion x 2 weeks. O: peripheral edema + bibasilar crackles. Vitals: BP 132/78, HR 86. A: CHF, likely exacerbation; LVEF 35% on echo. P: increase furosemide to 40 mg BID, arrange TTE (done 03/10/2025), schedule close follow-up. Clinician: Dr. Elena Ruiz (Cardiology).',
    },
    {
        id: 'N-P001-2',
        patientId: 'P001',
        claimId: null,
        type: 'meeting',
        metadata: {
            participants: [
                { role: 'biller', displayName: 'Denise (Billing)' },
                { role: 'payer_rep', displayName: 'Anthem Rep - John' },
                { role: 'patient', displayName: 'Maria Gonzalez' },
            ],
            channel: 'phone',
        },
        content:
            'Phone call with payer about denial CO-150; payer questioned outpatient/ inpatient status. Biller to upload discharge summary and echo report for appeal.',
    },
    {
        id: 'N-P002-1',
        patientId: 'P002',
        claimId: 'C-P002-3',
        type: 'meeting',
        metadata: {
            participants: [{ role: 'biller', displayName: 'Biller-1' }],
            channel: 'phone',
            consentEvents: [
                {
                    actorId: 'BILLER-1',
                    actorRole: 'biller',
                    timestamp: '2025-07-01T14:02:00Z',
                    action: 'share_snippet',
                    docFileName: 'MRI_Lumbar_2025-05-22.pdf',
                    snippet: 'MRI: L4-L5 broad-based disc protrusion with moderate canal stenosis.',
                },
            ],
        },
        content:
            'Call with UnitedHealthcare rep; discussed missing prior auth for T-epi steroid injection. Biller requested instructions for retroactive authorization appeal.',
    },
    {
        id: 'N-P003-1',
        patientId: 'P003',
        claimId: 'C-P003-1',
        type: 'meeting',
        metadata: { channel: 'telehealth', sessionId: 'TH-3001' },
        content:
            'Tele-psychiatry visit with Dr. Lin (behavioral health). HPI: increased anxiety and ADHD symptoms. Treatment: adjust methylphenidate dose and start CBT. Clinician documented necessity for continuing telehealth visits.',
    },
    {
        id: 'N-P004-1',
        patientId: 'P004',
        claimId: 'C-P004-1',
        type: 'soap',
        metadata: {},
        content:
            'S: 82yo M admitted with cough, fever. O: CXR infiltrate right lower lobe. A: community-acquired pneumonia. P: IV antibiotics, O2 support; discharge 2025-01-14 with follow-up. Attending: Dr. S. Patel.',
    },
    {
        id: 'N-P005-1',
        patientId: 'P005',
        claimId: 'C-P005-1',
        type: 'soap',
        metadata: {},
        content:
            'OB visit: 20 weeks gestation. Screening glucose abnormal; initiated diet and glucose logs. Plan: remote glucose monitoring, nutrition counseling, follow-up in 2 weeks. Provider: Dr. Mei Huang (Ob/Gyn).',
    },
];

export type SeedClaim = {
    id: string;
    claimNumber: string;
    patientId: string;
    insuranceProviderPayerId?: string;
    status: string;
    serviceDates?: { start?: string; end?: string };
    billedAmount?: number;
    allowedAmount?: number;
    paidAmount?: number;
    deniedAmount?: number;
    primaryDenialCode?: string;
    primaryDenialText?: string;
    claimData?: ClaimData;
};

export const claims: SeedClaim[] = [
    // P001 claims
    {
        id: 'C-P001-1',
        claimNumber: 'CLM-P001-1001',
        patientId: 'P001',
        insuranceProviderPayerId: 'ANTH-CA',
        status: 'denied',
        serviceDates: { start: '2025-06-03' },
        billedAmount: 420, // office + echo combined (realistic range)
        allowedAmount: 0,
        paidAmount: 0,
        deniedAmount: 420,
        primaryDenialCode: 'CO-150',
        primaryDenialText: 'Determined not medically necessary per plan coverage rules',
        claimData: {
            formType: 'CMS1500',
            lines: [
                { lineNumber: 1, cpt: '99214', dxCodes: ['I50.22', 'E11.9'], units: 1, charge: 180 },
                { lineNumber: 2, cpt: '93306', dxCodes: ['I50.22'], units: 1, charge: 240 },
            ],
        },
    },
    {
        id: 'C-P001-2',
        claimNumber: 'CLM-P001-1002',
        patientId: 'P001',
        insuranceProviderPayerId: 'ANTH-CA',
        status: 'paid',
        serviceDates: { start: '2025-05-05' },
        billedAmount: 220,
        allowedAmount: 200,
        paidAmount: 200,
        deniedAmount: 20,
        claimData: { lines: [{ lineNumber: 1, cpt: 'E0154', charge: 220 }] },
    },
    {
        id: 'C-P001-3',
        claimNumber: 'CLM-P001-1003',
        patientId: 'P001',
        insuranceProviderPayerId: 'ANTH-CA',
        status: 'paid',
        serviceDates: { start: '2025-03-31' },
        billedAmount: 4500,
        allowedAmount: 3900,
        paidAmount: 3900,
        claimData: { rawForm: { inpatient: true, admitDate: '2025-03-30', dischargeDate: '2025-04-05' } },
    },
    {
        id: 'C-P001-4',
        claimNumber: 'CLM-P001-1004',
        patientId: 'P001',
        insuranceProviderPayerId: 'ANTH-CA',
        status: 'partially_paid',
        serviceDates: { start: '2025-06-03' },
        billedAmount: 180,
        allowedAmount: 120,
        paidAmount: 120,
        deniedAmount: 60,
        primaryDenialCode: 'CO-16',
        primaryDenialText: 'Documentation requested for lab panel',
    },
    {
        id: 'C-P001-5',
        claimNumber: 'CLM-P001-1005',
        patientId: 'P001',
        insuranceProviderPayerId: 'ANTH-CA',
        status: 'denied',
        serviceDates: { start: '2025-04-15' },
        billedAmount: 340,
        deniedAmount: 340,
        primaryDenialCode: 'CO-96',
        primaryDenialText: 'Durable medical equipment requires prior authorization',
    },

    // P002 claims
    {
        id: 'C-P002-1',
        claimNumber: 'CLM-P002-2001',
        patientId: 'P002',
        insuranceProviderPayerId: 'UHC-001',
        status: 'paid',
        serviceDates: { start: '2025-05-22' },
        billedAmount: 1250,
        allowedAmount: 900,
        paidAmount: 900,
        claimData: { lines: [{ lineNumber: 1, cpt: '72148', dxCodes: ['M51.26', 'M54.16'], charge: 1250 }] },
    },
    {
        id: 'C-P002-2',
        claimNumber: 'CLM-P002-2002',
        patientId: 'P002',
        insuranceProviderPayerId: 'UHC-001',
        status: 'partially_paid',
        serviceDates: { start: '2025-05-26', end: '2025-06-30' },
        billedAmount: 1000,
        allowedAmount: 600,
        paidAmount: 600,
        deniedAmount: 400,
        primaryDenialCode: 'PR-150',
        primaryDenialText: 'Services reduced for out-of-network PT visits',
    },
    {
        id: 'C-P002-3',
        claimNumber: 'CLM-P002-2003',
        patientId: 'P002',
        insuranceProviderPayerId: 'UHC-001',
        status: 'denied',
        serviceDates: { start: '2025-06-30' },
        billedAmount: 2100,
        deniedAmount: 2100,
        primaryDenialCode: 'CO-197',
        primaryDenialText: 'Preauthorization missing for epidural steroid injection',
        claimData: { lines: [{ lineNumber: 1, cpt: '62323', dxCodes: ['M54.16'], charge: 2100 }] },
    },
    {
        id: 'C-P002-4',
        claimNumber: 'CLM-P002-2004',
        patientId: 'P002',
        insuranceProviderPayerId: 'UHC-001',
        status: 'paid',
        serviceDates: { start: '2025-05-20' },
        billedAmount: 200,
        paidAmount: 150,
    },
    {
        id: 'C-P002-5',
        claimNumber: 'CLM-P002-2005',
        patientId: 'P002',
        insuranceProviderPayerId: 'UHC-001',
        status: 'denied',
        serviceDates: { start: '2025-07-15' },
        billedAmount: 180,
        primaryDenialCode: 'CO-16',
        primaryDenialText: 'Insufficient documentation for billed visit',
    },

    // P003 claims
    {
        id: 'C-P003-1',
        claimNumber: 'CLM-P003-3001',
        patientId: 'P003',
        insuranceProviderPayerId: 'KP-CA',
        status: 'denied',
        serviceDates: { start: '2025-02-15' },
        billedAmount: 220,
        deniedAmount: 220,
        primaryDenialCode: 'CO-18',
        primaryDenialText: 'Out of network telehealth code — plan excludes out-of-network telebehavioral visits',
    },
    {
        id: 'C-P003-2',
        claimNumber: 'CLM-P003-3002',
        patientId: 'P003',
        insuranceProviderPayerId: 'KP-CA',
        status: 'partially_paid',
        serviceDates: { start: '2025-02-20', end: '2025-04-10' },
        billedAmount: 1200,
        allowedAmount: 700,
        paidAmount: 700,
    },
    {
        id: 'C-P003-3',
        claimNumber: 'CLM-P003-3003',
        patientId: 'P003',
        insuranceProviderPayerId: 'KP-CA',
        status: 'paid',
        serviceDates: { start: '2024-11-20' },
        billedAmount: 600,
        allowedAmount: 500,
        paidAmount: 500,
    },
    {
        id: 'C-P003-4',
        claimNumber: 'CLM-P003-3004',
        patientId: 'P003',
        insuranceProviderPayerId: 'KP-CA',
        status: 'paid',
        serviceDates: { start: '2025-02-15' },
        billedAmount: 90,
        paidAmount: 20,
    },
    {
        id: 'C-P003-5',
        claimNumber: 'CLM-P003-3005',
        patientId: 'P003',
        insuranceProviderPayerId: 'KP-CA',
        status: 'denied',
        serviceDates: { start: '2025-06-01' },
        billedAmount: 120,
        deniedAmount: 120,
        primaryDenialText: 'Coding mismatch — billed as individual psychotherapy while session was group therapy',
    },

    // P004 claims
    {
        id: 'C-P004-1',
        claimNumber: 'CLM-P004-4001',
        patientId: 'P004',
        insuranceProviderPayerId: 'CMS-FFS',
        status: 'paid',
        serviceDates: { start: '2025-01-10', end: '2025-01-14' },
        billedAmount: 15000,
        allowedAmount: 15000,
        paidAmount: 15000,
    },
    {
        id: 'C-P004-2',
        claimNumber: 'CLM-P004-4002',
        patientId: 'P004',
        insuranceProviderPayerId: 'CMS-FFS',
        status: 'denied',
        serviceDates: { start: '2025-01-12' },
        billedAmount: 180,
        deniedAmount: 180,
        primaryDenialCode: 'CO-BNDL',
        primaryDenialText: 'Bundling; technical and professional components require modifier evaluation',
    },
    {
        id: 'C-P004-3',
        claimNumber: 'CLM-P004-4003',
        patientId: 'P004',
        insuranceProviderPayerId: 'CMS-FFS',
        status: 'denied',
        serviceDates: { start: '2024-10-05' },
        billedAmount: 1200,
        deniedAmount: 1200,
        primaryDenialText: 'Screening/diagnostic code conflict; payer considers procedure screening = patient liable',
    },
    {
        id: 'C-P004-4',
        claimNumber: 'CLM-P004-4004',
        patientId: 'P004',
        insuranceProviderPayerId: 'CMS-FFS',
        status: 'paid',
        serviceDates: { start: '2025-02-01' },
        billedAmount: 120,
        paidAmount: 100,
    },
    {
        id: 'C-P004-5',
        claimNumber: 'CLM-P004-4005',
        patientId: 'P004',
        insuranceProviderPayerId: 'UHC-SUPP',
        status: 'paid',
        serviceDates: { start: '2025-01-20' },
        billedAmount: 450,
        paidAmount: 400,
    },

    // P005 claims
    {
        id: 'C-P005-1',
        claimNumber: 'CLM-P005-5001',
        patientId: 'P005',
        insuranceProviderPayerId: 'BSC-CA',
        status: 'paid',
        serviceDates: { start: '2025-02-20' },
        billedAmount: 220,
        allowedAmount: 200,
        paidAmount: 200,
    },
    {
        id: 'C-P005-2',
        claimNumber: 'CLM-P005-5002',
        patientId: 'P005',
        insuranceProviderPayerId: 'BSC-CA',
        status: 'paid',
        serviceDates: { start: '2025-05-15' },
        billedAmount: 150,
        paidAmount: 120,
    },
    {
        id: 'C-P005-3',
        claimNumber: 'CLM-P005-5003',
        patientId: 'P005',
        insuranceProviderPayerId: 'BSC-CA',
        status: 'denied',
        serviceDates: { start: '2025-05-15' },
        billedAmount: 320,
        deniedAmount: 320,
        primaryDenialCode: 'CO-96',
        primaryDenialText: 'DME (continuous glucose monitor supplies) non-covered without prior authorization',
    },
    {
        id: 'C-P005-4',
        claimNumber: 'CLM-P005-5004',
        patientId: 'P005',
        insuranceProviderPayerId: 'BSC-CA',
        status: 'partially_paid',
        serviceDates: { start: '2025-06-12' },
        billedAmount: 300,
        paidAmount: 200,
        deniedAmount: 100,
    },
    {
        id: 'C-P005-5',
        claimNumber: 'CLM-P005-5005',
        patientId: 'P005',
        insuranceProviderPayerId: 'BSC-CA',
        status: 'planned',
        serviceDates: { start: '2025-09-20' },
        billedAmount: 0,
    },
];

export type SeedClaimEvent = {
    id: string;
    claimId: string;
    eventType: string;
    eventData?: EventData;
};

export const claimEvents: SeedClaimEvent[] = [
    {
        id: 'E-P001-1-1',
        claimId: 'C-P001-1',
        eventType: 'submission',
        eventData: { notes: 'Submitted electronically via clearinghouse REF: SUB-ANTH-5001' },
    },
    {
        id: 'E-P001-1-2',
        claimId: 'C-P001-1',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Anthem_2025-06-10.pdf', notes: 'denialCode=CO-150; review required' },
    },
    {
        id: 'E-P001-1-3',
        claimId: 'C-P001-1',
        eventType: 'appeal_drafted',
        eventData: { notes: 'Draft appeal prepared 2025-07-01; awaiting cardiologist signature; source docs: TTE, discharge summary' },
    },

    { id: 'E-P001-2-1', claimId: 'C-P001-2', eventType: 'submission', eventData: {} },
    { id: 'E-P001-2-2', claimId: 'C-P001-2', eventType: 'payment', eventData: { amount: 200 } },

    { id: 'E-P002-1-1', claimId: 'C-P002-1', eventType: 'submission', eventData: {} },
    {
        id: 'E-P002-3-1',
        claimId: 'C-P002-3',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_UHC_2025-07-05.pdf', notes: 'denialCode=CO-197 - no prior auth' },
    },

    { id: 'E-P003-1-1', claimId: 'C-P003-1', eventType: 'submission', eventData: {} },
    {
        id: 'E-P003-1-2',
        claimId: 'C-P003-1',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Kaiser_2025-03-01.pdf', notes: 'denialCode=CO-18 - out-of-network telehealth' },
    },

    {
        id: 'E-P004-1-1',
        claimId: 'C-P004-2',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Medicare_2025-02-02.pdf', notes: 'denialCode=CO-BNDL - check modifier 26/TC' },
    },

    {
        id: 'E-P005-1-1',
        claimId: 'C-P005-3',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_BlueShield_2025-07-01.pdf', notes: 'denialCode=CO-96 - DME not authorized' },
    },
];

export default { patients, insuranceProviders, documents, notes, claims, claimEvents };
