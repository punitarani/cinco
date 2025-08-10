import { notFound } from "next/navigation";
import Link from "next/link";
import { PatientClaimsTableClient } from "./PatientClaimsTableClient";

async function fetchPatientClaims(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${base}/api/patients/${id}/claims`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PatientClaimsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();
  const data = await fetchPatientClaims(id);
  if (!data) return notFound();

  const { patient, summary, claims } = data as {
    patient: { name?: string },
    summary: { count: number; billed: number; allowed: number; paid: number; denied: number; balance: number; byStatus: Record<string, number> };
    claims: { id: string; status: string; dos: string; billed: number; allowed: number; paid: number; denied: number }[];
  };

  return (
    <div className="w-full py-8 px-4 lg:px-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Patient Claims — </h1>
        <div className="text-sm text-muted-foreground">Patient ID: {id}{patient?.name ? ` — ${patient.name}` : ""}</div>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Total Claims</div>
          <div className="text-2xl font-semibold">{summary.count}</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Billed</div>
          <div className="text-2xl font-semibold">${summary.billed.toFixed(2)}</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Paid</div>
          <div className="text-2xl font-semibold">${summary.paid.toFixed(2)}</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Balance</div>
          <div className="text-2xl font-semibold">${summary.balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Object.entries(summary.byStatus).map(([status, count]) => (
          <div key={status} className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground">{status || 'unknown'}</div>
            <div className="text-xl font-medium">{count}</div>
          </div>
        ))}
      </div>

      <PatientClaimsTableClient data={claims} />
    </div>
  );
}
