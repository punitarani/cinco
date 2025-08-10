import { sql } from "drizzle-orm";
import { db } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  // /api/patients/[id]/claims -> last segment is 'claims', so id is before that
  const id = decodeURIComponent(parts[parts.length - 2] || "");

  // Fetch patient info and their claims with financials and status
  const [patientRes, claimsRes] = await Promise.all([
    db.execute(sql`select first_name, last_name from patients where cast(id as text) = ${id} limit 1`),
    db.execute(sql`
    select c.id,
           c.claim_number,
           c.status,
           c.service_dates,
           c.billed_amount,
           c.allowed_amount,
           c.paid_amount,
           c.denied_amount,
           c.claim_data
      from claims c
     where cast(c.patient_id as text) = ${id}
     order by c.id desc
     limit 500
    `),
  ]);

  const claims: any[] = (claimsRes as any)?.rows ?? (claimsRes as any);

  const patientRow: any = ((patientRes as any).rows ?? (patientRes as any))[0] ?? {};

  const mapped = claims.map((r: any) => ({
    id: r.claim_number ?? String(r.id),
    status: r.status ?? '',
    dos: r.service_dates?.start ?? '',
    billed: Number(r.billed_amount ?? 0),
    allowed: Number(r.allowed_amount ?? 0),
    paid: Number(r.paid_amount ?? 0),
    denied: Number(r.denied_amount ?? 0),
  }));

  const totals = mapped.reduce(
    (acc, c) => {
      acc.count += 1;
      acc.billed += c.billed;
      acc.allowed += c.allowed;
      acc.paid += c.paid;
      acc.denied += c.denied;
      acc.byStatus[c.status] = (acc.byStatus[c.status] ?? 0) + 1;
      return acc;
    },
    { count: 0, billed: 0, allowed: 0, paid: 0, denied: 0, byStatus: {} as Record<string, number> }
  );

  const balance = Math.max(0, totals.allowed - totals.paid);

  return new Response(
    JSON.stringify({
      patient: { name: [patientRow.first_name, patientRow.last_name].filter(Boolean).join(" ") },
      claims: mapped,
      summary: {
        count: totals.count,
        billed: totals.billed,
        allowed: totals.allowed,
        paid: totals.paid,
        denied: totals.denied,
        balance,
        byStatus: totals.byStatus,
      },
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}


