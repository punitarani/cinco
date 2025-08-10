"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { type Patient } from "./columns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, CalendarDays, ShieldCheck, FileText, Stethoscope, HeartPulse, Activity, UserRound, Users } from "lucide-react";

export function PatientsClient({ patients }: { patients: Patient[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | null>(patients[0]?.id ?? null);
  const p = patients.find(x => x.id === selectedId) ?? patients[0];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select patient</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-72 overflow-auto">
            {patients.map(n => (
              <DropdownMenuItem key={n.id} onClick={() => setSelectedId(n.id)}>{n.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input placeholder="Search patients..." className="max-w-sm" />
      </div>

      {p && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Demographics</CardTitle>
            <CardDescription>Key contact and profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="font-medium text-lg">{p.name}</div>
                <div className="text-sm text-muted-foreground">ID: {p.id}</div>
                <div className="flex items-center gap-2 text-sm"><Phone className="size-4" />{p.phone}</div>
                <div className="flex items-center gap-2 text-sm"><Mail className="size-4" />{p.email}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm"><CalendarDays className="size-4" />DOB: {p.dob}</div>
                <div className="flex items-center gap-2 text-sm"><CalendarDays className="size-4" />Last visit: {p.lastVisit}</div>
                <div className="flex items-center gap-2 text-sm"><CalendarDays className="size-4" />Next appt: {p.nextAppointment}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {p && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5" />Insurance Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <div className="flex items-center justify-between"><span>Primary</span><span className="font-medium">{p.primaryInsurance}</span></div>
              <div className="flex items-center justify-between"><span>Policy #</span><span className="font-mono">{p.policyNumber}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="size-5" />Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-between"><span>Balance</span><span className="font-medium">${p.balance.toFixed(2)}</span></div>
                <div className="flex items-center justify-between"><span>Paid</span><span className="font-medium">${p.paid.toFixed(2)}</span></div>
                <div className="flex items-center justify-between"><span>Credits</span><span className="font-medium">${p.credits.toFixed(2)}</span></div>
                <div className="flex items-center justify-between"><span>Refunds</span><span className="font-medium">${p.refunds.toFixed(2)}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {p && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Stethoscope className="size-5" />Medical</CardTitle>
            <CardDescription>Snapshot from chart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Activity className="size-4" />Allergies: <span className="font-medium">{p.allergies || 'None'}</span></div>
                <div className="flex items-center gap-2"><HeartPulse className="size-4" />Chronic conditions: <span className="font-medium">{p.chronicConditions || 'None'}</span></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Users className="size-4" />PCP: <span className="font-medium">{p.pcp}</span></div>
                <div className="flex items-center gap-2"><UserRound className="size-4" />Referring provider: <span className="font-medium">{p.referringProvider || '-'}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={() => p && router.push(`/patients/${p.id}/claims`)}>View claims</Button>
      </div>
    </div>
  );
}
