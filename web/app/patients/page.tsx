import { type Patient } from "./columns";
import { PatientsClient } from "./PatientsClient";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/cinco";
// Reuse a single pool during dev hot reloads
declare global { var __pgPool__: Pool | undefined }
function getPool(): Pool {
  if (!globalThis.__pgPool__) {
    globalThis.__pgPool__ = new Pool({ connectionString });
  }
  return globalThis.__pgPool__;
}

async function fetchPatients(): Promise<Patient[]> {
  const pool = getPool();
  const { rows } = await pool.query(
    "select id, first_name, last_name, dob, contact_info, insurance_info from patients order by id limit 50"
  );
  return rows.map((r: any) => {
    const name = [r.first_name, r.last_name].filter(Boolean).join(" ");
    const contact = r.contact_info || {};
    const primary = r.insurance_info?.primary || {};
    const p: Patient = {
      id: String(r.id),
      name,
      dob: r.dob ?? "",
      phone: contact.phone ?? "",
      email: contact.email ?? "",
      primaryInsurance: primary.payerName ?? primary.planName ?? "",
      policyNumber: primary.memberId ?? "",
      balance: 0,
      paid: 0,
      credits: 0,
      refunds: 0,
      allergies: "None",
      chronicConditions: "None",
      lastVisit: "",
      nextAppointment: "",
      pcp: "",
      referringProvider: "",
    };
    return p;
  });
}

export default async function PatientsPage() {
  const patients = await fetchPatients();
  return <PatientsClient patients={patients} />;
}
