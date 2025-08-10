const express = require('express');
const { db } = require('../../db');
const { patients } = require('../../../src/db/schema');
const { eq } = require('drizzle-orm');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db
      .select({
        id: patients.id,
        firstName: patients.firstName,
        lastName: patients.lastName,
        dob: patients.dob,
        contactInfo: patients.contactInfo,
        insuranceInfo: patients.insuranceInfo,
        mrns: patients.mrns,
        createdAt: patients.createdAt,
      })
      .from(patients)
      .orderBy(patients.id)
      .limit(50);

    const data = result.map((r) => {
      const name = [r.firstName, r.lastName].filter(Boolean).join(' ');
      const contact = r.contactInfo || {};
      const primary = r.insuranceInfo?.primary || {};
      
      return {
        id: String(r.id),
        name,
        dob: r.dob ?? '',
        phone: contact.phone ?? '',
        email: contact.email ?? '',
        primaryInsurance: primary.payerName ?? primary.planName ?? '',
        policyNumber: primary.memberId ?? '',
        balance: 0, // Would be calculated from claims/payments in a real system
        lastVisit: '', // Would come from appointments/visits table
      };
    });

    res.json(data);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const patientId = parseInt(req.params.id);
    if (isNaN(patientId)) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    }

    const result = await db
      .select()
      .from(patients)
      .where(eq(patients.id, patientId))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const r = result[0];
    const name = [r.firstName, r.lastName].filter(Boolean).join(' ');
    const contact = r.contactInfo || {};
    const primary = r.insuranceInfo?.primary || {};
    
    const patient = {
      id: String(r.id),
      name,
      dob: r.dob ?? '',
      phone: contact.phone ?? '',
      email: contact.email ?? '',
      primaryInsurance: primary.payerName ?? primary.planName ?? '',
      policyNumber: primary.memberId ?? '',
      balance: 0, // Would be calculated from claims/payments in a real system
      lastVisit: '', // Would come from appointments/visits table
    };

    res.json(patient);
  } catch (error) {
    console.error('Failed to fetch patient:', error);
    res.status(500).json({ error: 'Failed to retrieve patient' });
  }
});

module.exports = router;
