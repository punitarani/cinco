// Using the standard Request type to satisfy Next.js route handler signature
import { sql } from "drizzle-orm";
import { db } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const id = decodeURIComponent(parts[parts.length - 1] || "");

  // Fetch primary claim details by claim_number (falling back to id)
  const claimResult = await db.execute(sql`
    select c.id,
           c.claim_number,
           c.status,
           c.service_dates,
           c.billed_amount,
           c.allowed_amount,
           c.paid_amount,
           c.denied_amount,
           c.claim_data,
           c.primary_denial_code,
           c.primary_denial_text,
           p.id as patient_id,
           p.first_name,
           p.last_name,
           ip.name as insurance_name
      from claims c
      join patients p on p.id = c.patient_id
      left join insurance_providers ip on ip.id = c.insurance_provider_id
     where c.claim_number = ${id} or cast(c.id as text) = ${id}
     limit 1
  `);

  const rows: any[] = (claimResult as any)?.rows ?? (claimResult as any);
  const claimRow = rows[0];
  if (!claimRow) {
    return new Response("Not found", { status: 404 });
  }

  const claimIdNumeric = Number(claimRow.id);

  // Parallel fetch related data
  const [eventsRes, notesRes, docsRes] = await Promise.all([
    db.execute(sql`select id, event_type, event_data, created_at from claim_events where claim_id = ${claimIdNumeric} order by created_at desc`),
    db.execute(sql`select id, type, metadata, content, created_at from notes where claim_id = ${claimIdNumeric} order by created_at desc`),
    db.execute(sql`select id, doc_type, metadata, file_name, file_path, sha256, created_at from documents where claim_id = ${claimIdNumeric} order by created_at desc`),
  ]);

  const lines = Array.isArray(claimRow.claim_data?.lines) ? claimRow.claim_data.lines : [];

  const payload = {
    id: claimRow.claim_number ?? String(claimRow.id),
    numericId: claimIdNumeric,
    patientId: Number(claimRow.patient_id),
    patient: [claimRow.first_name, claimRow.last_name].filter(Boolean).join(" "),
    dos: claimRow.service_dates?.start ?? "",
    insurance: claimRow.insurance_name ?? "",
    status: claimRow.status ?? "",
    billed: Number(claimRow.billed_amount ?? 0),
    allowed: Number(claimRow.allowed_amount ?? 0),
    paid: Number(claimRow.paid_amount ?? 0),
    denied: Number(claimRow.denied_amount ?? 0),
    denial: claimRow.primary_denial_code
      ? { code: claimRow.primary_denial_code as string, text: (claimRow.primary_denial_text as string) ?? "" }
      : null,
    procedures: lines.map((l: any) => ({
      cpt: String(l.cpt ?? ''),
      units: Number(l.units ?? 0),
      charge: Number(l.charge ?? 0),
      dxCodes: Array.isArray(l.dxCodes) ? l.dxCodes.map(String) : [],
    })),
    events: ((eventsRes as any).rows ?? (eventsRes as any)).map((e: any) => ({
      id: Number(e.id),
      type: e.event_type as string,
      data: e.event_data as any,
      createdAt: e.created_at as string,
    })),
    notes: ((notesRes as any).rows ?? (notesRes as any)).map((n: any) => ({
      id: Number(n.id),
      type: n.type as string,
      metadata: n.metadata as any,
      content: (n.content as string) ?? "",
      createdAt: n.created_at as string,
    })),
    documents: ((docsRes as any).rows ?? (docsRes as any)).map((d: any) => ({
      id: Number(d.id),
      type: d.doc_type as string,
      metadata: d.metadata as any,
      fileName: d.file_name as string,
      filePath: d.file_path as string,
      sha256: d.sha256 as string,
      createdAt: d.created_at as string,
    })),
  };

  return new Response(JSON.stringify(payload), { headers: { "Content-Type": "application/json" } });
}


