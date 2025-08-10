"use client";
import { claimColumns, type Claim } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function ClaimsPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Claim[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/claims", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setData(json as Claim[]);
    })();
  }, []);

  const selected = data.find(c => c.id === selectedId) ?? undefined;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select claim no.</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {data.map(c => (
              <DropdownMenuItem key={c.id} onClick={() => setSelectedId(c.id)}>{c.id}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input type="date" className="w-44" />
        <Input type="date" className="w-44" />
      </div>

      {/* Claims list */}
      <Card>
        <CardHeader>
          <CardTitle>Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            className="text-[0.95rem]"
            columns={claimColumns}
            data={data}
            onRowClick={row => setSelectedId((row as any).id)}
            rowClassName={row => (selectedId && (row as any).id === selectedId ? 'bg-muted/60 ring-1 ring-border' : '')}
          />
        </CardContent>
      </Card>

      {/* Procedure detail (shown only when a claim is selected) */}
      {selectedId && selected && (
      <Card>
        <CardHeader>
          <CardTitle>Per Procedure — Claim #{selected.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-3 text-sm font-medium px-3 py-2">
            <div className="col-span-2">CPT</div>
            <div>Units</div>
            <div className="col-span-5">Dx Codes</div>
            <div className="text-right">Charge</div>
          </div>
          <div className="divide-y rounded-md border">
            {selected.procedures.map((p) => (
              <div key={p.cpt+String(p.units)} className="grid grid-cols-12 gap-3 px-3 py-2 text-sm">
                <div className="col-span-2 font-mono">{p.cpt}</div>
                <div>{p.units}</div>
                <div className="col-span-5 break-words">{(p.dxCodes ?? []).join(', ') || '-'}</div>
                <div className="text-right">${p.charge.toFixed(2)}</div>
              </div>
            ))}
          </div></CardContent>
      </Card>
      )}
    </div>
  );
}
