"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type ClaimDetail = {
  id: string;
  numericId: number;
  patientId: number;
  patient: string;
  dos: string;
  insurance: string;
  status: string;
  billed: number;
  allowed: number;
  paid: number;
  denied: number;
  denial: { code: string; text: string } | null;
  procedures: { cpt: string; units: number; charge: number; dxCodes?: string[] }[];
  events: { id: number; type: string; data: any; createdAt: string }[];
  notes: { id: number; type: string; metadata: any; content: string; createdAt: string }[];
  documents: { id: number; type: string; metadata: any; fileName: string; filePath: string; sha256: string; createdAt: string }[];
};

export function ClaimDetailsClient({ claimId }: { claimId: string }) {
  const [data, setData] = React.useState<ClaimDetail | null>(null);
  const [openPanel, setOpenPanel] = React.useState<null | "procedures" | "events" | "notes" | "documents">(null);

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/claims/${encodeURIComponent(claimId)}`, { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as ClaimDetail;
      setData(json);
    })();
  }, [claimId]);

  if (!data) {
    return <div className="text-sm text-muted-foreground">Loading claim…</div>;
  }

  const cards: { key: typeof openPanel; title: string; content: React.ReactNode }[] = [
    {
      key: "procedures",
      title: "Procedures",
      content: (
        <div>
          <div className="grid grid-cols-12 gap-3 text-sm font-medium px-3 py-2">
            <div className="col-span-2">CPT</div>
            <div>Units</div>
            <div className="col-span-5">Dx Codes</div>
            <div className="text-right">Charge</div>
          </div>
          <div className="divide-y rounded-md border">
            {data.procedures.map((p, idx) => (
              <div key={p.cpt + String(p.units) + String(idx)} className="grid grid-cols-12 gap-3 px-3 py-2 text-sm">
                <div className="col-span-2 font-mono">{p.cpt}</div>
                <div>{p.units}</div>
                <div className="col-span-5 break-words">{(p.dxCodes ?? []).join(", ") || "-"}</div>
                <div className="text-right">${p.charge.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "events",
      title: "Timeline",
      content: (
        <div className="space-y-3">
          {data.events.map(e => (
            <div key={e.id} className="flex items-start justify-between gap-4 border rounded-md p-3">
              <div>
                <div className="font-medium">{e.type}</div>
                <div className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString()}</div>
              </div>
              <pre className="text-xs max-w-[60%] whitespace-pre-wrap break-words">{JSON.stringify(e.data, null, 2)}</pre>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "notes",
      title: "Notes",
      content: (
        <div className="space-y-4">
          {data.notes.map(n => (
            <div key={n.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Badge variant="secondary">{n.type}</Badge><span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</span></div>
              </div>
              <div className="mt-2 text-sm whitespace-pre-wrap">{n.content || JSON.stringify(n.metadata)}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "documents",
      title: "Documents",
      content: (
        <div className="space-y-3">
          {data.documents.map(d => (
            <div key={d.id} className="flex items-center justify-between border rounded-md p-3">
              <div className="space-y-1">
                <div className="font-medium">{d.fileName}</div>
                <div className="text-xs text-muted-foreground">{d.type} · {new Date(d.createdAt).toLocaleString()}</div>
              </div>
              {d.filePath ? (
                <a className="text-sm underline" href={d.filePath} target="_blank" rel="noreferrer">Open</a>
              ) : (
                <span className="text-xs text-muted-foreground">No file</span>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Claim #{data.id}</h1>
          <div className="text-sm text-muted-foreground">{data.patient} · {data.insurance} · DOS {data.dos || '-'}</div>
        </div>
        <div className="flex items-center gap-3">
          <Badge>{data.status || 'unknown'}</Badge>
          {data.denial && <Badge variant="destructive">Denial {data.denial.code}</Badge>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Financials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-muted-foreground">Billed</div>
              <div className="text-right">${data.billed.toFixed(2)}</div>
              <div className="text-muted-foreground">Allowed</div>
              <div className="text-right">${data.allowed.toFixed(2)}</div>
              <div className="text-muted-foreground">Paid</div>
              <div className="text-right">${data.paid.toFixed(2)}</div>
              <div className="text-muted-foreground">Denied</div>
              <div className="text-right">${data.denied.toFixed(2)}</div>
            </div>
            {data.denial && (
              <div className="mt-3 text-xs">
                <div className="font-medium">Primary Denial</div>
                <div className="text-muted-foreground">{data.denial.code}: {data.denial.text}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {cards.map(card => (
          <Card key={card.key} className="hover:ring-1 hover:ring-border cursor-pointer" onClick={() => setOpenPanel(card.key)}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm">View {card.title}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={openPanel !== null} onOpenChange={(o) => !o && setOpenPanel(null)}>
        {openPanel && (
          <SheetContent side="right" className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>
                {cards.find(c => c.key === openPanel)?.title}
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              {cards.find(c => c.key === openPanel)?.content}
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}


