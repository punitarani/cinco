"use client";
import { claimColumns, type Claim } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function ClaimsPage() {
  const router = useRouter();
  const [data, setData] = React.useState<Claim[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/claims", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setData(json as Claim[]);
      setLoading(false);
    })();
  }, []);

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
              <DropdownMenuItem key={c.id} onClick={() => router.push(`/claims/${c.id}`)}>{c.id}</DropdownMenuItem>
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
            onRowClick={row => router.push(`/claims/${(row as any).id}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
