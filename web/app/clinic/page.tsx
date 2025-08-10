import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Building2, IdCard, MapPin } from "lucide-react";

type Provider = {
  name: string;
  npi: string;
  taxId: string;
  phone?: string;
};

type Clinic = {
  name: string;
  npi: string;
  taxId: string;
  phone: string;
  facilityName: string;
  facilityAddress: string;
  providers: Provider[];
};

const mockClinic: Clinic = {
  name: "Cinco Health Group",
  npi: "1234567890",
  taxId: "12-3456789",
  phone: "(555) 555-1234",
  facilityName: "Cinco Family Practice",
  facilityAddress: "123 Main St, Suite 200, Springfield, NY 10001",
  providers: [
    { name: "Dr. Oz", npi: "1111111111", taxId: "12-3456789", phone: "(555) 555-1111" },
    { name: "Dr. Jane Doe", npi: "2222222222", taxId: "12-3456789", phone: "(555) 555-2222" },
    { name: "PA John Smith", npi: "3333333333", taxId: "12-3456789" },
  ],
};

export default function ClinicPage() {
  const c = mockClinic;
  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Organization identifiers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Clinic Info</CardTitle>
          <CardDescription>Organization identifiers and primary contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <div className="font-medium text-lg">{c.name}</div>
              <div className="flex items-center gap-2"><IdCard className="size-4" />NPI: <span className="font-mono">{c.npi}</span></div>
              <div className="flex items-center gap-2"><IdCard className="size-4" />Tax ID: <span className="font-mono">{c.taxId}</span></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Phone className="size-4" />{c.phone}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facility block */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Building2 className="size-5" />Facility</CardTitle>
          <CardDescription>Billing/rendering facility details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <div className="text-muted-foreground">Facility Name</div>
              <div className="font-medium">{c.facilityName}</div>
            </div>
            <div>
              <div className="text-muted-foreground flex items-center gap-2"><MapPin className="size-4" />Address</div>
              <div className="font-medium leading-relaxed">{c.facilityAddress}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Providers list */}
      <Card>
        <CardHeader>
          <CardTitle>Providers</CardTitle>
          <CardDescription>Individual NPI and Tax IDs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table className="text-[0.95rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead className="whitespace-nowrap">NPI</TableHead>
                  <TableHead className="whitespace-nowrap">Tax ID</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {c.providers.map(p => (
                  <TableRow key={p.npi}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="font-mono">{p.npi}</TableCell>
                    <TableCell className="font-mono">{p.taxId}</TableCell>
                    <TableCell>{p.phone || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

