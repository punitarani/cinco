"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Procedure = {
  cpt: string;
  units: number;
  charge: number;
  dxCodes?: string[];
};

export type Claim = {
  id: string;          // claim number or id
  patient: string;     // from patients table
  insurance: string;   // insurance_providers.name
  status: string;      // claims.status
  dos: string;         // service_dates.start
  billed: number;      // billed_amount
  allowed: number;     // allowed_amount
  paid: number;        // paid_amount
  denied: number;      // denied_amount
  procedures: Procedure[]; // parsed from claim_data.lines
};

export const claimColumns: ColumnDef<Claim>[] = [
  { accessorKey: "patient", header: "Patient" },
  { accessorKey: "dos", header: "DOS" },
  { accessorKey: "insurance", header: "Insurance" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "id", header: "Claim #" },
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


