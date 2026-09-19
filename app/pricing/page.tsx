import { requireAuth } from "@/lib/auth-guard";
import { PricingCards } from "@/components/ui/pricing-cards";

const pricingTiers = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceId: null,
    currency: "USD",
    interval: "month" as const,
    features: [
      "Access to Basic features",
      "Limited Usage",
      "Community Support",
    ],
    isPopular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 10,
    priceId: "premium",
    currency: "USD",
    interval: "month" as const,
    features: [
      "Access to Premium features",
      "Unlimited Usage",
      "Priority support",
      "Community Support",
    ],
    isPopular: true,
  },
];

const page = async () => {
  await requireAuth();
  return (
    <main className="min-h-screen">
      <PricingCards tiers={pricingTiers} />
    </main>
  );
};

export default page;
