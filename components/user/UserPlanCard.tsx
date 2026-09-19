import Link from 'next/link';
import { DbUserPlan, getPlanStatus, getPlanDisplayName, getPlanPrice, formatRenewalDate, getStatusLabel, getStatusColor, getPlanBadgeColor } from '@/lib/plan-utils';

interface UserPlanCardProps {
  dbUser: DbUserPlan;
}

export function UserPlanCard({ dbUser }: UserPlanCardProps) {
  const status = getPlanStatus(dbUser);
  const planName = getPlanDisplayName(dbUser.plan);
  const price = getPlanPrice(dbUser.plan);
  const isFree = dbUser.plan === 'FREE';
  const hasPeriodEnd = !!dbUser.stripeCurrentPeriodEnd;

  const statusLabel = getStatusLabel(status);
  const statusColor = getStatusColor(status);
  const badgeColor = getPlanBadgeColor(dbUser.plan);

  const showRenewalInfo = !isFree && hasPeriodEnd;
  const renewalDate = formatRenewalDate(dbUser.stripeCurrentPeriodEnd);

  return (
    <article className="w-full max-w-md mx-auto bg-zinc-800 rounded-2xl border border-zinc-700 p-6 sm:p-8">
      <header className="mb-6">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Current Plan
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
              {planName}
            </span>
            <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${statusColor}`} aria-label={statusLabel}>
              <span className="absolute h-2 w-2 rounded-full bg-white" />
            </span>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white tabular-nums">
              {price === 0 ? 'Free' : `$${price}/mo`}
            </p>
          </div>
        </div>
      </header>

      <div className="border-t border-zinc-700 pt-6">
        {showRenewalInfo && (
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="text-zinc-400">{statusLabel}:</span>
            <time 
              className={`font-medium tabular-nums ${status === 'past_due' ? 'text-red-400' : status === 'expiring_soon' || status === 'canceled' ? 'text-orange-400' : 'text-white'}`}
              dateTime={dbUser.stripeCurrentPeriodEnd?.toISOString()}
            >
              {renewalDate}
            </time>
          </div>
        )}

        <Link
          href="/pricing"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-zinc-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
        >
          {isFree ? 'Upgrade to Premium' : 'Manage Subscription'}
          <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}