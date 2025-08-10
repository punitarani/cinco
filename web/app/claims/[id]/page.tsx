import { notFound } from "next/navigation";
import { ClaimDetailsClient } from "../ClaimDetailsClient";

export default async function ClaimDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Optionally we could prefetch to 404 fast. Keep it simple for now.
  const { id } = await params;
  if (!id) return notFound();
  return <ClaimDetailsClient claimId={id} />;
}


