"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Patient = {
  id: string;
  name: string;
  dob: string; // ISO date string
  phone: string;
  email: string;
  primaryInsurance: string;
  policyNumber: string;
  balance: number;
  paid: number;
  credits: number;
  refunds: number;
  allergies: string;
  chronicConditions: string;
  lastVisit: string; // ISO date
  nextAppointment?: string; // ISO date
  pcp: string;
  referringProvider?: string;
};

export const columns: ColumnDef<Patient>[] = [
  { accessorKey: "name", header: "Patient" },
  { accessorKey: "dob", header: "DOB" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "primaryInsurance", header: "Insurance" },
  { accessorKey: "policyNumber", header: "Policy #" },
  {
    accessorKey: "balance",
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const amt = Number(row.getValue("balance"));
      return <div className="text-right">${amt.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "paid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => {
      const amt = Number(row.getValue("paid"));
      return <div className="text-right">${amt.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "credits",
    header: () => <div className="text-right">Credits</div>,
    cell: ({ row }) => {
      const amt = Number(row.getValue("credits"));
      return <div className="text-right">${amt.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "refunds",
    header: () => <div className="text-right">Refunds</div>,
    cell: ({ row }) => {
      const amt = Number(row.getValue("refunds"));
      return <div className="text-right">${amt.toFixed(2)}</div>;
    },
  },
];


