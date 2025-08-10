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
        contactInfo: { phone: '(555) 210-3321', email: 'maria.g@sample.org', address: '1234 Elm St, Smalltown, ST' },
        insuranceInfo: {
            primary: {
                payerName: 'Sunrise Health Plan',
                payerCode: 'SUN-001',
                memberId: 'SHP123456789',
                groupNumber: 'GRP-4455',
                planName: 'PPO Gold',
                relationship: 'self',
                effectiveDate: '2019-01-01',
                terminationDate: null,
                notes: 'In-network cardiology',
            },
        },
    },
    {
        id: 'P002',
        firstName: 'James',
        lastName: 'Carter',
        dob: '1980-02-20',
        mrns: ['JC-001'],
        contactInfo: { phone: '(555) 612-8899', email: 'jim.c@example.net', address: '89 Harbor Rd, Urbanville, ST' },
        insuranceInfo: {
            primary: {
                payerName: 'Evergreen Mutual',
                payerCode: 'EVM-22',
                memberId: 'EVM-987654321',
                groupNumber: 'EV-GRP-88',
                planName: 'PPO Standard',
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
        contactInfo: { phone: '(555) 701-3344', email: 'alex.rivera@example.com', address: '77 Oak Lane, Suburbia, ST' },
        insuranceInfo: {
            primary: {
                payerName: 'HarborCare',
                payerCode: 'HBC-77',
                memberId: 'HBC-332211',
                groupNumber: 'HBG-77',
                planName: 'EPO Silver',
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
        contactInfo: { phone: '(555) 433-2200', email: 'harold.b@example.org', address: '230 Willow Way, Oldtown, ST' },
        insuranceInfo: {
            primary: {
                payerName: 'Medicare Part A/B (CMS FFS)',
                payerCode: 'CMS-FFS',
                memberId: 'MBI-12345',
                planName: 'Medicare FFS',
                effectiveDate: '2010-09-01',
            },
            secondary: {
                payerName: 'SilverSupplement Plan',
                payerCode: 'SS-44',
                memberId: 'SS-889900',
                planName: 'Supplement Plan B',
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
        contactInfo: { phone: '(555) 878-9900', email: 'lin.chen@sample.com', address: '501 River Ave, Metropolis, ST' },
        insuranceInfo: {
            primary: {
                payerName: 'BluePeak Health',
                payerCode: 'BPH-100',
                memberId: 'BPH-554433',
                groupNumber: 'BP-GRP-77',
                planName: 'HMO Platinum',
                relationship: 'self',
                effectiveDate: '2020-02-01',
            },
        },
    },
];

/* Insurance providers (unique by payerCode/payerId) */
export type SeedPayer = {
    id: string;
    name: string;
    payerId?: string;
    contactInfo?: ContactInfo;
    planInfo?: InsuranceInfo;
};

export const insuranceProviders: SeedPayer[] = [
    { id: 'INS-1', name: 'Sunrise Health Plan', payerId: 'SUN-001', contactInfo: { phone: '(800) 111-0001' } },
    { id: 'INS-2', name: 'Evergreen Mutual', payerId: 'EVM-22', contactInfo: { phone: '(800) 222-0002' } },
    { id: 'INS-3', name: 'HarborCare', payerId: 'HBC-77', contactInfo: { phone: '(800) 333-0003' } },
    { id: 'INS-4', name: 'Medicare FFS', payerId: 'CMS-FFS', contactInfo: { phone: '(800) 444-0004' } },
    { id: 'INS-5', name: 'BluePeak Health', payerId: 'BPH-100', contactInfo: { phone: '(800) 555-0005' } },
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
    {
        id: 'D-P001-01',
        patientId: 'P001',
        claimId: 'C-P001-1',
        docType: 'EOB',
        metadata: {
            payer: 'Sunrise Health',
            payerClaimId: 'SHP-EOB-1001',
            dosFrom: '2025-06-03',
            billedAmount: 320,
            paidAmount: 0,
            denialCode: 'CO-150',
            denialText: 'Not medically necessary',
        },
        fileName: 'EOB_Sunrise_2025-06-10.pdf',
        filePath: '/seed_files/EOB_Sunrise_2025-06-10.pdf',
        sha256: 'sha-d-p001-01',
    },
    {
        id: 'D-P001-02',
        patientId: 'P001',
        claimId: 'C-P001-1',
        docType: 'NOTE',
        metadata: { procedure: 'Echocardiogram', additional: { LVEF: 35 } },
        fileName: 'TTE_Report_2025-03-10.pdf',
        filePath: '/seed_files/TTE_Report_2025-03-10.pdf',
        sha256: 'sha-d-p001-02',
    },
    {
        id: 'D-P001-03',
        patientId: 'P001',
        claimId: 'C-P001-3',
        docType: 'NOTE',
        metadata: { dosFrom: '2025-03-30', dosTo: '2025-04-05', additional: { primary_dx: 'Acute CHF' } },
        fileName: 'Hospital_Discharge_2025-04-05.pdf',
        filePath: '/seed_files/Hospital_Discharge_2025-04-05.pdf',
        sha256: 'sha-d-p001-03',
    },
    {
        id: 'D-P001-04',
        patientId: 'P001',
        claimId: 'C-P001-2',
        docType: 'NOTE',
        metadata: { additional: { type: 'MedicationList' } },
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

    {
        id: 'D-P002-01',
        patientId: 'P002',
        claimId: 'C-P002-1',
        docType: 'IMAGE',
        metadata: { additional: { finding: 'L4-L5 disc protrusion' } },
        fileName: 'MRI_Lumbar_2025-05-22.pdf',
        filePath: '/seed_files/MRI_Lumbar_2025-05-22.pdf',
        sha256: 'sha-d-p002-01',
    },
    {
        id: 'D-P002-02',
        patientId: 'P002',
        claimId: 'C-P002-2',
        docType: 'NOTE',
        metadata: { additional: { type: 'PT Progress' } },
        fileName: 'PT_Progress_2025-06-20.pdf',
        filePath: '/seed_files/PT_Progress_2025-06-20.pdf',
        sha256: 'sha-d-p002-02',
    },
    {
        id: 'D-P002-03',
        patientId: 'P002',
        claimId: 'C-P002-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'InjectionRecord' } },
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
        metadata: { payer: 'Evergreen Mutual', payerClaimId: 'EVM-EOB-2001', denialCode: 'CO-197' },
        fileName: 'EOB_Evergreen_2025-07-05.pdf',
        filePath: '/seed_files/EOB_Evergreen_2025-07-05.pdf',
        sha256: 'sha-d-p002-05',
    },

    {
        id: 'D-P003-01',
        patientId: 'P003',
        claimId: 'C-P003-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'Psych Eval' } },
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
        metadata: { additional: { type: 'Prescription' } },
        fileName: 'Prescription_2025-02-15.pdf',
        filePath: '/seed_files/Prescription_2025-02-15.pdf',
        sha256: 'sha-d-p003-03',
    },
    {
        id: 'D-P003-04',
        patientId: 'P003',
        claimId: 'C-P003-1',
        docType: 'EOB',
        metadata: { payer: 'HarborCare' },
        fileName: 'EOB_HarborCare_2025-03-01.pdf',
        filePath: '/seed_files/EOB_HarborCare_2025-03-01.pdf',
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

    {
        id: 'D-P004-01',
        patientId: 'P004',
        claimId: 'C-P004-1',
        docType: 'NOTE',
        metadata: { dosFrom: '2025-01-10', dosTo: '2025-01-14', additional: { primary_dx: 'Pneumonia' } },
        fileName: 'Hosp_Pneumonia_2025-01-12.pdf',
        filePath: '/seed_files/Hosp_Pneumonia_2025-01-12.pdf',
        sha256: 'sha-d-p004-01',
    },
    {
        id: 'D-P004-02',
        patientId: 'P004',
        claimId: 'C-P004-2',
        docType: 'IMAGE',
        metadata: { additional: { type: 'CXR' } },
        fileName: 'CXR_2025-01-12.pdf',
        filePath: '/seed_files/CXR_2025-01-12.pdf',
        sha256: 'sha-d-p004-02',
    },
    {
        id: 'D-P004-03',
        patientId: 'P004',
        claimId: 'C-P004-3',
        docType: 'NOTE',
        metadata: { procedure: 'Colonoscopy' },
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
        metadata: { additional: { type: 'DME' } },
        fileName: 'Home_Oxygen_2025-01-20.pdf',
        filePath: '/seed_files/Home_Oxygen_2025-01-20.pdf',
        sha256: 'sha-d-p004-05',
    },

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
        metadata: { additional: { type: 'PrenatalVisits' } },
        fileName: 'PrenatalVisits_2025-02-01_to_2025-07-01.pdf',
        filePath: '/seed_files/PrenatalVisits_2025-02-01_to_2025-07-01.pdf',
        sha256: 'sha-d-p005-02',
    },
    {
        id: 'D-P005-03',
        patientId: 'P005',
        claimId: 'C-P005-3',
        docType: 'NOTE',
        metadata: { additional: { type: 'GlucoseMonitoring' } },
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
        metadata: { payer: 'BluePeak', denialCode: 'CO-96' },
        fileName: 'EOB_BluePeak_2025-07-01.pdf',
        filePath: '/seed_files/EOB_BluePeak_2025-07-01.pdf',
        sha256: 'sha-d-p005-05',
    },
];

/* Notes */
export type SeedNote = {
    id: string;
    patientId: string;
    claimId?: string | null;
    type: 'soap' | 'meeting' | 'call' | 'internal';
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
        content: 'Cardiology follow-up: worsening dyspnea. Plan: increase diuretic.',
    },
    {
        id: 'N-P001-2',
        patientId: 'P001',
        claimId: null,
        type: 'meeting',
        metadata: {
            participants: [
                { role: 'biller', displayName: 'Denise' },
                { role: 'payer_rep', displayName: 'Sunrise Rep' },
            ],
            channel: 'phone',
        },
        content: 'Call with Sunrise re: denial CO-150. Payer asked if this was inpatient.',
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
                    snippet: 'MRI: Broad-based L4-L5 disc protrusion with moderate canal stenosis',
                },
            ],
        },
        content: 'Spoke with payer about prior auth for injection.',
    },

    {
        id: 'N-P003-1',
        patientId: 'P003',
        claimId: 'C-P003-1',
        type: 'meeting',
        metadata: { channel: 'telehealth', sessionId: 'TH-3001' },
        content: 'Tele-psychiatry med management visit.',
    },
    { id: 'N-P004-1', patientId: 'P004', claimId: 'C-P004-1', type: 'soap', metadata: {}, content: 'Inpatient discharge summary for pneumonia.' },
    { id: 'N-P005-1', patientId: 'P005', claimId: 'C-P005-1', type: 'soap', metadata: {}, content: 'First trimester ultrasound routine note.' },
];

/* Claims (5 per patient) */
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
        insuranceProviderPayerId: 'SUN-001',
        status: 'denied',
        serviceDates: { start: '2025-06-03' },
        billedAmount: 320,
        allowedAmount: 0,
        paidAmount: 0,
        deniedAmount: 320,
        primaryDenialCode: 'CO-150',
        primaryDenialText: 'Not medically necessary',
        claimData: {
            formType: 'CMS1500',
            lines: [
                { lineNumber: 1, cpt: '99214', dxCodes: ['I50.22', 'E11.9'], units: 1, charge: 150 },
                { lineNumber: 2, cpt: '93306', dxCodes: ['I50.22'], units: 1, charge: 170 },
            ],
        },
    },
    {
        id: 'C-P001-2',
        claimNumber: 'CLM-P001-1002',
        patientId: 'P001',
        insuranceProviderPayerId: 'SUN-001',
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
        insuranceProviderPayerId: 'SUN-001',
        status: 'paid',
        serviceDates: { start: '2025-03-31' },
        billedAmount: 4500,
        allowedAmount: 3900,
        paidAmount: 3900,
        claimData: { rawForm: { inpatient: true } },
    },
    {
        id: 'C-P001-4',
        claimNumber: 'CLM-P001-1004',
        patientId: 'P001',
        insuranceProviderPayerId: 'SUN-001',
        status: 'partially_paid',
        serviceDates: { start: '2025-06-03' },
        billedAmount: 180,
        allowedAmount: 120,
        paidAmount: 120,
        deniedAmount: 60,
        primaryDenialCode: 'CO-16',
        primaryDenialText: 'Claim/service lacks documentation',
    },
    {
        id: 'C-P001-5',
        claimNumber: 'CLM-P001-1005',
        patientId: 'P001',
        insuranceProviderPayerId: 'SUN-001',
        status: 'denied',
        serviceDates: { start: '2025-04-15' },
        billedAmount: 340,
        deniedAmount: 340,
        primaryDenialCode: 'CO-96',
        primaryDenialText: 'Non-covered appliance',
    },

    // P002 claims
    {
        id: 'C-P002-1',
        claimNumber: 'CLM-P002-2001',
        patientId: 'P002',
        insuranceProviderPayerId: 'EVM-22',
        status: 'paid',
        serviceDates: { start: '2025-05-22' },
        billedAmount: 1200,
        allowedAmount: 900,
        paidAmount: 900,
        claimData: { lines: [{ cpt: '72148', dxCodes: ['M51.26', 'M54.16'], charge: 1200 }] },
    },
    {
        id: 'C-P002-2',
        claimNumber: 'CLM-P002-2002',
        patientId: 'P002',
        insuranceProviderPayerId: 'EVM-22',
        status: 'partially_paid',
        serviceDates: { start: '2025-05-26', end: '2025-06-30' },
        billedAmount: 1000,
        allowedAmount: 600,
        paidAmount: 600,
        deniedAmount: 400,
        primaryDenialCode: 'PR-150',
    },
    {
        id: 'C-P002-3',
        claimNumber: 'CLM-P002-2003',
        patientId: 'P002',
        insuranceProviderPayerId: 'EVM-22',
        status: 'denied',
        serviceDates: { start: '2025-06-30' },
        billedAmount: 2100,
        deniedAmount: 2100,
        primaryDenialCode: 'CO-197',
        primaryDenialText: 'Preauthorization missing',
        claimData: { lines: [{ cpt: '62323', dxCodes: ['M54.16'], charge: 2100 }] },
    },
    {
        id: 'C-P002-4',
        claimNumber: 'CLM-P002-2004',
        patientId: 'P002',
        insuranceProviderPayerId: 'EVM-22',
        status: 'paid',
        serviceDates: { start: '2025-05-20' },
        billedAmount: 200,
        paidAmount: 150,
    },
    {
        id: 'C-P002-5',
        claimNumber: 'CLM-P002-2005',
        patientId: 'P002',
        insuranceProviderPayerId: 'EVM-22',
        status: 'denied',
        serviceDates: { start: '2025-07-15' },
        billedAmount: 180,
        primaryDenialCode: 'CO-16',
        primaryDenialText: 'Insufficient documentation',
    },

    // P003 claims
    {
        id: 'C-P003-1',
        claimNumber: 'CLM-P003-3001',
        patientId: 'P003',
        insuranceProviderPayerId: 'HBC-77',
        status: 'denied',
        serviceDates: { start: '2025-02-15' },
        billedAmount: 220,
        deniedAmount: 220,
        primaryDenialCode: 'CO-18',
        primaryDenialText: 'Out of network',
    },
    {
        id: 'C-P003-2',
        claimNumber: 'CLM-P003-3002',
        patientId: 'P003',
        insuranceProviderPayerId: 'HBC-77',
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
        insuranceProviderPayerId: 'HBC-77',
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
        insuranceProviderPayerId: 'HBC-77',
        status: 'paid',
        serviceDates: { start: '2025-02-15' },
        billedAmount: 90,
        paidAmount: 20,
    },
    {
        id: 'C-P003-5',
        claimNumber: 'CLM-P003-3005',
        patientId: 'P003',
        insuranceProviderPayerId: 'HBC-77',
        status: 'denied',
        serviceDates: { start: '2025-06-01' },
        billedAmount: 120,
        deniedAmount: 120,
        primaryDenialText: 'Coding mismatch (group vs individual)',
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
        primaryDenialText: 'Bundling',
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
        primaryDenialText: 'Screening vs diagnostic coding dispute',
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
        insuranceProviderPayerId: 'SS-44',
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
        insuranceProviderPayerId: 'BPH-100',
        status: 'paid',
        serviceDates: { start: '2025-02-20' },
        billedAmount: 220,
        paidAmount: 200,
    },
    {
        id: 'C-P005-2',
        claimNumber: 'CLM-P005-5002',
        patientId: 'P005',
        insuranceProviderPayerId: 'BPH-100',
        status: 'paid',
        serviceDates: { start: '2025-05-15' },
        billedAmount: 150,
        paidAmount: 120,
    },
    {
        id: 'C-P005-3',
        claimNumber: 'CLM-P005-5003',
        patientId: 'P005',
        insuranceProviderPayerId: 'BPH-100',
        status: 'denied',
        serviceDates: { start: '2025-05-15' },
        billedAmount: 320,
        deniedAmount: 320,
        primaryDenialCode: 'CO-96',
        primaryDenialText: 'Non-covered',
    },
    {
        id: 'C-P005-4',
        claimNumber: 'CLM-P005-5004',
        patientId: 'P005',
        insuranceProviderPayerId: 'BPH-100',
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
        insuranceProviderPayerId: 'BPH-100',
        status: 'planned',
        serviceDates: { start: '2025-09-20' },
        billedAmount: 0,
    },
];

/* Claim events (submission, eob_received, appeal_drafted, payment) */
export type SeedClaimEvent = {
    id: string;
    claimId: string;
    eventType: string;
    eventData?: EventData;
};

export const claimEvents: SeedClaimEvent[] = [
    // P001 C-P001-1 submission + EOB + appeal draft
    { id: 'E-P001-1-1', claimId: 'C-P001-1', eventType: 'submission', eventData: { notes: 'externalId=SHP-SUB-5001; channel=electronic' } },
    {
        id: 'E-P001-1-2',
        claimId: 'C-P001-1',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Sunrise_2025-06-10.pdf', notes: 'denialCode=CO-150' },
    },
    {
        id: 'E-P001-1-3',
        claimId: 'C-P001-1',
        eventType: 'appeal_drafted',
        eventData: { notes: 'draftId=A-P001-1-D1; See TTE and discharge summary attached' },
    },

    // P001 others
    { id: 'E-P001-2-1', claimId: 'C-P001-2', eventType: 'submission', eventData: {} },
    { id: 'E-P001-2-2', claimId: 'C-P001-2', eventType: 'payment', eventData: { amount: 200 } },

    { id: 'E-P002-1-1', claimId: 'C-P002-1', eventType: 'submission', eventData: {} },
    {
        id: 'E-P002-3-1',
        claimId: 'C-P002-3',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Evergreen_2025-07-05.pdf', notes: 'denialCode=CO-197' },
    },

    { id: 'E-P003-1-1', claimId: 'C-P003-1', eventType: 'submission', eventData: {} },
    {
        id: 'E-P003-1-2',
        claimId: 'C-P003-1',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_HarborCare_2025-03-01.pdf', notes: 'denialCode=CO-18' },
    },

    {
        id: 'E-P004-1-1',
        claimId: 'C-P004-2',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_Medicare_2025-02-02.pdf', notes: 'denialCode=CO-BNDL' },
    },

    {
        id: 'E-P005-1-1',
        claimId: 'C-P005-3',
        eventType: 'eob_received',
        eventData: { relatedDocumentFileName: 'EOB_BluePeak_2025-07-01.pdf', notes: 'denialCode=CO-96' },
    },
];

export default {
    patients,
    insuranceProviders,
    documents,
    notes,
    claims,
    claimEvents,
};
