import { NextRequest } from "next/server";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/cinco";
// Reuse a single pool in dev
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _pool: any;
function getPool() {
  if (!_pool) _pool = new Pool({ connectionString });
  return _pool as Pool;
}

export async function GET(_req: NextRequest) {
  const pool = getPool();
  const { rows } = await pool.query(
    `select c.id, c.claim_number, c.status, c.service_dates, c.billed_amount, c.allowed_amount, c.paid_amount, c.denied_amount, c.claim_data,
            p.first_name, p.last_name, ip.name as insurance_name
       from claims c
       join patients p on p.id = c.patient_id
       left join insurance_providers ip on ip.id = c.insurance_provider_id
       order by c.id limit 200`
  );

  const data = rows.map((r: any) => {
    const lines = Array.isArray(r.claim_data?.lines) ? r.claim_data.lines : [];
    return {
      id: r.claim_number ?? String(r.id),
      patient: [r.first_name, r.last_name].filter(Boolean).join(" "),
      dos: r.service_dates?.start ?? "",
      insurance: r.insurance_name ?? "",
      status: r.status ?? "",
      billed: Number(r.billed_amount ?? 0),
      allowed: Number(r.allowed_amount ?? 0),
      paid: Number(r.paid_amount ?? 0),
      denied: Number(r.denied_amount ?? 0),
      procedures: lines.map((l: any) => ({
        cpt: String(l.cpt ?? ''),
        units: Number(l.units ?? 0),
        charge: Number(l.charge ?? 0),
        dxCodes: Array.isArray(l.dxCodes) ? l.dxCodes.map(String) : [],
      })),
    };
  });

  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
}
