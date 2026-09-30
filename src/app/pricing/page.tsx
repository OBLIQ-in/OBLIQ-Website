import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Obliq. Free forever for open source.",
};

export default function PricingPage() {
  // Extra top padding clears the floating navbar
  return <Pricing as="h1" className="pt-36" />;
}
