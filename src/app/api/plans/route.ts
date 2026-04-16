import { NextResponse } from "next/server";

export const revalidate = 300;

type SupabasePlan = {
  name: string;
  slug: string;
  tier: string;
  billing_interval: string | null;
  price_cents: number;
  currency: string;
  session_limit: number | null;
  agent_limit: number | null;
  inbox_limit: number | null;
  source_limit: number | null;
  features: Record<string, boolean> | null;
  sort_order: number;
  trial_days: number;
};

export type PublicPlan = {
  name: string;
  slug: string;
  tier: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  sessionLimit: number | null;
  agentLimit: number | null;
  inboxLimit: number | null;
  sourceLimit: number | null;
  features: Record<string, boolean>;
  trialDays: number;
};

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const query =
    "/rest/v1/plans?is_active=eq.true&is_public=eq.true" +
    "&select=name,slug,tier,billing_interval,price_cents,currency,session_limit,agent_limit,inbox_limit,source_limit,features,sort_order,trial_days" +
    "&order=sort_order.asc";

  const res = await fetch(`${url}${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  const raw = (await res.json()) as SupabasePlan[];

  const plans: PublicPlan[] = raw.map((p) => {
    const monthly = p.price_cents / 100;
    const yearly = Math.round(monthly * 0.8);
    return {
      name: p.name,
      slug: p.slug,
      tier: p.tier,
      priceMonthly: monthly,
      priceYearly: yearly,
      currency: p.currency,
      sessionLimit: p.session_limit,
      agentLimit: p.agent_limit,
      inboxLimit: p.inbox_limit,
      sourceLimit: p.source_limit,
      features: p.features || {},
      trialDays: p.trial_days,
    };
  });

  return NextResponse.json(plans);
}
