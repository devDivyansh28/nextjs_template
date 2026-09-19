export type PlanStatus = 'active' | 'expiring_soon' | 'canceled' | 'past_due' | 'free';

export interface DbUserPlan {
  plan: 'FREE' | 'PREMIUM';
  stripeCurrentPeriodEnd: Date | null;
  stripePriceId: string | null;
  stripeCustomerID: string | null;
}

export function getPlanStatus(user: DbUserPlan): PlanStatus {
  if (user.plan === 'FREE') return 'free';

  const periodEnd = user.stripeCurrentPeriodEnd;
  const now = new Date();

  if (!periodEnd) return 'active';

  if (now > periodEnd) return 'past_due';

  const daysUntilEnd = Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilEnd <= 7) return 'expiring_soon';

  if (user.stripePriceId === null) return 'canceled';

  return 'active';
}

export function getPlanDisplayName(plan: 'FREE' | 'PREMIUM'): 'Free' | 'Premium' {
  return plan === 'FREE' ? 'Free' : 'Premium';
}

export function getPlanPrice(plan: 'FREE' | 'PREMIUM'): 0 | 10 {
  return plan === 'FREE' ? 0 : 10;
}

export function formatRenewalDate(date: Date | null): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function isExpiringSoon(date: Date | null): boolean {
  if (!date) return false;
  const now = new Date();
  const daysUntilEnd = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilEnd <= 7 && daysUntilEnd > 0;
}

export function getStatusLabel(status: PlanStatus): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'expiring_soon':
      return 'Renews soon';
    case 'canceled':
      return 'Cancels on';
    case 'past_due':
      return 'Payment failed';
    case 'free':
      return 'Active';
  }
}

export function getStatusColor(status: PlanStatus): string {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'expiring_soon':
      return 'bg-orange-500';
    case 'canceled':
      return 'bg-orange-500';
    case 'past_due':
      return 'bg-red-500';
    case 'free':
      return 'bg-green-500';
  }
}

export function getPlanBadgeColor(plan: 'FREE' | 'PREMIUM'): string {
  return plan === 'FREE' ? 'bg-zinc-700 text-zinc-300' : 'bg-yellow-500 text-zinc-950';
}