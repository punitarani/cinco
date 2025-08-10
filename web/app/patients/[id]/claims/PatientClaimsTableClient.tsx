"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type PatientClaimRow = {
  id: string;
  dos: string;
  status: string;
  billed: number;
  allowed: number;
  paid: number;
  denied: number;
};

const columns: ColumnDef<PatientClaimRow>[] = [
  {
    accessorKey: "id",
    header: "Claim #",
    cell: ({ row }) => (
      <Link href={`/claims/${encodeURIComponent(row.getValue("id") as string)}`} className="underline underline-offset-2 hover:text-primary">
        {row.getValue("id") as string}
      </Link>
    ),
  },
  { accessorKey: "dos", header: "DOS" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "billed",
    header: () => <div className="text-right">Billed</div>,
    cell: ({ row }) => <div className="text-right">${Number(row.getValue("billed")).toFixed(2)}</div>,
  },
  {
    accessorKey: "allowed",
    header: () => <div className="text-right">Allowed</div>,
    cell: ({ row }) => <div className="text-right">${Number(row.getValue("allowed")).toFixed(2)}</div>,
  },
  {
    accessorKey: "paid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => <div className="text-right">${Number(row.getValue("paid")).toFixed(2)}</div>,
  },
  {
    accessorKey: "denied",
    header: () => <div className="text-right">Denied</div>,
    cell: ({ row }) => <div className="text-right">${Number(row.getValue("denied")).toFixed(2)}</div>,
  },
];

export function PatientClaimsTableClient({ data }: { data: PatientClaimRow[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="rounded-md border overflow-auto w-full">
      <Table className="text-sm">
        <TableHeader>
          {table.getHeaderGroups().map(hg => (
            <TableRow key={hg.id}>
              {hg.headers.map(h => (
                <TableHead key={h.id} className={"sticky top-0 z-10 bg-background " + (h.column.getIsSorted() ? "bg-muted/40" : "")}>
                  {h.isPlaceholder ? null : (
                    h.column.getCanSort() ? (
                      <button
                        className="flex w-full items-center gap-2 text-left select-none"
                        onClick={() => h.column.toggleSorting(h.column.getIsSorted() === "asc")}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        <ArrowUpDown className="size-3.5 opacity-60" />
                      </button>
                    ) : (
                      flexRender(h.column.columnDef.header, h.getContext())
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cell.column.getIsSorted() ? "bg-muted/10" : undefined}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}


