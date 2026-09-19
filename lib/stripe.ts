import stripe from "stripe";

export const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export const STRIPE_PRICE_IDs = {
  premium: "price_1UHQKW5zPSK9N6tg0niTeUty",
} as const;