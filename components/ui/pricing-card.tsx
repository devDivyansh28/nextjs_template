"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceId: string | null;
  currency: string;
  interval: "month" | "year";
  features: string[];
  isPopular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
}

export function PricingCard({ tier }: PricingCardProps) {
  

  const isPopular = tier.isPopular;

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        isPopular
          ? "border-primary/30 bg-linear-to-b from-primary/5 to-background shadow-lg shadow-primary/5"
          : "border-border bg-card hover:border-border/60 hover:shadow-md",
      )}
      data-tier={tier.id}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-accent-foreground bg-accent rounded-full tracking-wide">
          Most Popular
        </div>
      )}

      <header className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">
          {tier.name}
        </h3>
        <div className="mt-4 flex items-baseline justify-center gap-1">
          <span
            className="text-5xl font-bold text-foreground tabular-nums tracking-tight"
            aria-label={`${tier.price} ${tier.currency}`}
          >
            {tier.price === 0 ? "Free" : tier.price}
          </span>
          {tier.price > 0 && (
            <>
              <span className="text-lg font-medium text-muted-foreground">
                /{tier.interval === "month" ? "mo" : "yr"}
              </span>
            </>
          )}
        </div>
      </header>

      <ul
        className="flex-1 space-y-4 mb-8"
        role="list"
        aria-label={`${tier.name} features`}
      >
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className={cn(
                " size-5 shrink-0 rounded-full border flex items-center justify-center text-[11px]",
                isPopular
                  ? "border-primary/40 text-primary bg-primary/10"
                  : "border-border text-muted-foreground",
              )}
              aria-hidden="true"
            >
              <Check className="size-3" />
            </span>
            <span className="text-sm text-foreground/80 leading-relaxed mt-0.5">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <footer className="w-full">
        <Button
          className={cn(
            "w-full",
            isPopular ? "bg-primary hover:bg-primary/90" : "variant-outline",
          )}
          size="lg"
          // disabled={tier.priceId === null}
          aria-disabled={tier.priceId === null}
        >
          {tier.price === 0 ? "Get Started Free" : "Subscribe Now"}
        </Button>
        {tier.price === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No credit card required
          </p>
        )}
      </footer>
    </article>
  );
}
