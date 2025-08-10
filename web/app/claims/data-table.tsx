"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, type SortingState } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  rowClassName?: (row: TData) => string | undefined;
  className?: string; // forwarded to <Table>
}

export function DataTable<TData, TValue>({ columns, data, onRowClick, rowClassName, className }: DataTableProps<TData, TValue>) {
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
    <div className="overflow-auto rounded-md border">
      <Table className={className}>
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
              <TableRow
                key={row.id}
                className={"cursor-pointer hover:bg-muted/40 " + (rowClassName ? (rowClassName(row.original) || "") : "")}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cell.column.getIsSorted() ? "bg-muted/10" : undefined}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

