const express = require('express');
const { db } = require('../../db');
const { claims } = require('../../../src/db/schema');
const { patients } = require('../../../src/db/schema');
const { insuranceProviders } = require('../../../src/db/schema');
const { eq } = require('drizzle-orm');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db
      .select({
        id: claims.id,
        claimNumber: claims.claimNumber,
        status: claims.status,
        serviceDates: claims.serviceDates,
        billedAmount: claims.billedAmount,
        allowedAmount: claims.allowedAmount,
        paidAmount: claims.paidAmount,
        deniedAmount: claims.deniedAmount,
        claimData: claims.claimData,
        firstName: patients.firstName,
        lastName: patients.lastName,
        insuranceName: insuranceProviders.name,
      })
      .from(claims)
      .leftJoin(patients, eq(claims.patientId, patients.id))
      .leftJoin(insuranceProviders, eq(claims.insuranceProviderId, insuranceProviders.id))
      .orderBy(claims.id)
      .limit(200);

    const data = result.map((r) => {
      const lines = Array.isArray(r.claimData?.lines) ? r.claimData.lines : [];
      return {
        id: r.claimNumber ?? String(r.id),
        patient: [r.firstName, r.lastName].filter(Boolean).join(' '),
        dos: r.serviceDates?.start ?? '',
        insurance: r.insuranceName ?? '',
        status: r.status ?? '',
        billed: Number(r.billedAmount ?? 0) / 100, // Convert from cents
        allowed: Number(r.allowedAmount ?? 0) / 100,
        paid: Number(r.paidAmount ?? 0) / 100,
        denied: Number(r.deniedAmount ?? 0) / 100,
        procedures: lines.map((l) => ({
          cpt: String(l.cpt ?? ''),
          units: Number(l.units ?? 0),
          charge: Number(l.charge ?? 0) / 100, // Convert from cents
          dxCodes: Array.isArray(l.dxCodes) ? l.dxCodes.map(String) : [],
        })),
      };
    });

    res.json(data);
  } catch (error) {
    console.error('Failed to fetch claims:', error);
    res.status(500).json({ error: 'Failed to retrieve claims' });
  }
});

module.exports = router;
