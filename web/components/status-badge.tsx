"use client";

import { Badge } from "@/components/ui/badge";

const colorMap: Record<string, { variant?: "default" | "secondary" | "destructive"; className?: string }> = {
  paid: { variant: "default", className: "bg-green-600 text-white" },
  partially_paid: { variant: "secondary", className: "bg-yellow-500 text-black" },
  processed: { variant: "secondary", className: "bg-blue-500 text-white" },
  denied: { variant: "destructive" },
  submitted: { variant: "secondary" },
  draft: { variant: "secondary", className: "bg-gray-300 text-black" },
  appealed: { variant: "secondary", className: "bg-purple-500 text-white" },
  closed: { variant: "secondary", className: "bg-gray-500 text-white" },
  planned: { variant: "secondary" },
};

export function StatusBadge({ status }: { status: string }) {
  const key = (status || "").toLowerCase();
  const cfg = colorMap[key] || { variant: "secondary" as const };
  return <Badge variant={cfg.variant} className={cfg.className}>{status || "unknown"}</Badge>;
}


