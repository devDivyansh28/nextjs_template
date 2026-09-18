"use client";

import * as React from "react";
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card";

interface PricingCardsProps {
  tiers: PricingTier[];
}

export function PricingCards({ tiers }: PricingCardsProps) {
  return (
    <section aria-labelledby="pricing-heading" className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 lg:py-32">
      <header className="mx-auto max-w-2xl text-center mb-16">
        <h2 id="pricing-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Simple, transparent pricing
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Choose the plan that fits your needs. All plans include core features.
          Upgrade or cancel anytime.
        </p>
      </header>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
        role="list"
        aria-label="Pricing tiers"
      >
        {tiers.map((tier) => (
          <div key={tier.id} role="listitem">
            <PricingCard tier={tier} />
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        All prices in USD. Taxes calculated at checkout.
      </p>
    </section>
  );
}