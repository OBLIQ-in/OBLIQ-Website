import type { PricingCardProps } from "@/components/ui/pricing-card";

export type Plan = Omit<PricingCardProps, "className">;

/**
 * Pricing plans shown in the homepage Pricing section.
 * Prices follow issue #37 and are still awaiting confirmation — change them here only.
 */
export const plans: Plan[] = [
  {
    name: "Obliq Basic",
    price: "Free",
    description: "For solo use with light needs.",
    features: [
      "Unlimited projects",
      "Unlimited clients",
      "Time tracking",
      "CRM",
      "iOS & Android app",
    ],
    cta: { label: "Try Obliq free", href: "/contact" },
  },
  {
    name: "Obliq Premium",
    price: { annually: "$198", monthly: "$18" },
    period: { annually: "/yr", monthly: "/mo" },
    description: "For pro use with light needs.",
    features: [
      "Everything in Basic",
      "Invoices & payments",
      "Expense tracking",
      "Income tracking",
      "Scheduling",
    ],
    featured: true,
    badge: "Save 20%",
    badgeBilling: "annually",
    cta: { label: "Get started", href: "/contact" },
  },
  {
    name: "Obliq Enterprise",
    price: "Flexible",
    description: "For team use with light needs.",
    features: [
      "Everything in Premium",
      "Custom data import",
      "Advanced onboarding",
      "Hubspot integration",
      "Timesheets",
    ],
    cta: { label: "Contact sales", href: "/contact" },
  },
];
