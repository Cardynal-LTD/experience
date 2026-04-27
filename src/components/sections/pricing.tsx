"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useWindowSize from "@/lib/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

interface ApiPlan {
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
}

interface DisplayPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  description: string;
  buttonText: string;
  features: string[];
}

function formatCurrency(amount: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : currency === "ILS" ? "₪" : "$";
  return currency === "USD" ? `${symbol}${amount}` : `${symbol} ${amount}`;
}

function formatLimit(n: number | null, locale: string): string {
  if (n === null || n === -1 || n >= 999999) {
    if (locale === "fr") return "Illimité";
    if (locale === "he") return "ללא הגבלה";
    return "Unlimited";
  }
  return n.toLocaleString(locale === "he" ? "he-IL" : locale === "fr" ? "fr-FR" : "en-US");
}

function featureLabels(locale: string) {
  if (locale === "fr") {
    return {
      whatsapp: "WhatsApp inclus",
      api_access: "Accès API",
      custom_llm: "LLM personnalisé",
      export_import: "Export / Import",
    };
  }
  if (locale === "he") {
    return {
      whatsapp: "WhatsApp כלול",
      api_access: "גישת API",
      custom_llm: "LLM מותאם",
      export_import: "ייצוא / ייבוא",
    };
  }
  return {
    whatsapp: "WhatsApp included",
    api_access: "API access",
    custom_llm: "Custom LLM",
    export_import: "Export / Import",
  };
}

export default function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const fallbackPlans = t.raw("plans") as DisplayPlan[];
  const [apiPlans, setApiPlans] = useState<DisplayPlan[] | null>(null);
  const [isMonthly, setIsMonthly] = useState(true);
  const { isDesktop } = useWindowSize();

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ApiPlan[]) => {
        if (!Array.isArray(data) || data.length === 0) return;

        const periodLabel = locale === "fr" ? "mois" : locale === "he" ? "חודש" : "month";
        const ctaLabel = locale === "fr" ? "Essai gratuit 14 jours" : locale === "he" ? "14 יום ניסיון חינם" : "Start free for 14 days";
        const contactLabel = locale === "fr" ? "Parlons-en" : locale === "he" ? "דברו איתנו" : "Talk to us";
        const sessionLabel = locale === "fr" ? "sessions/mois" : locale === "he" ? "סשנים/חודש" : "sessions/month";
        const agentLabel = locale === "fr" ? "agents IA" : locale === "he" ? "סוכני AI" : "AI agents";
        const inboxLabel = locale === "fr" ? "boîtes de réception" : locale === "he" ? "תיבות דואר" : "inboxes";
        const sourceLabel = locale === "fr" ? "sources de connaissances" : locale === "he" ? "מקורות ידע" : "knowledge sources";
        const flags = featureLabels(locale);

        const mapped: DisplayPlan[] = data.map((plan) => {
          const isEnterprise = plan.tier === "enterprise" || plan.priceMonthly === 0;
          const features: string[] = [
            `${formatLimit(plan.sessionLimit, locale)} ${sessionLabel}`,
            `${formatLimit(plan.agentLimit, locale)} ${agentLabel}`,
            `${formatLimit(plan.inboxLimit, locale)} ${inboxLabel}`,
            `${formatLimit(plan.sourceLimit, locale)} ${sourceLabel}`,
          ];
          (Object.keys(flags) as Array<keyof typeof flags>).forEach((k) => {
            if (plan.features?.[k]) features.push(flags[k]);
          });

          return {
            name: plan.name.toUpperCase(),
            price: isEnterprise ? (locale === "fr" ? "Sur devis" : locale === "he" ? "בהתאמה" : "Custom") : formatCurrency(plan.priceMonthly, plan.currency),
            yearlyPrice: isEnterprise ? (locale === "fr" ? "Sur devis" : locale === "he" ? "בהתאמה" : "Custom") : formatCurrency(plan.priceYearly, plan.currency),
            period: isEnterprise ? "" : periodLabel,
            description: "",
            buttonText: isEnterprise ? contactLabel : ctaLabel,
            features,
          };
        });

        setApiPlans(mapped);
      })
      .catch(() => {
        // Fallback to translation data
      });
  }, [locale]);

  const plans = apiPlans || fallbackPlans;
  const customPlan = plans.find((p) => !p.period);
  const regularPlans = plans.filter((p) => p.period);

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2 justify-center mb-10">
        <span className="me-2 font-semibold">{t("monthly")}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch checked={!isMonthly} onCheckedChange={handleToggle} />
          </Label>
        </label>
        <span className="ms-2 font-semibold">{t("yearly")}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {regularPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: 0,
                    opacity: 1,
                    x:
                      index === regularPlans.length - 1
                        ? -20
                        : index === 0
                        ? 20
                        : 0,
                    scale: index === 1 ? 1.0 : 0.96,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border border-border/60 p-5 sm:p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative shadow-soft hover:shadow-elevated transition-all duration-250 ease-fluent`,
              index === 1 ? "border-primary border-[2px] z-10" : "z-0"
            )}
          >
            {index === 1 && (
              <div className="absolute top-0 end-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <FaStar className="text-white" />
                <span className="text-white ms-1 font-sans font-semibold">
                  {t("popular")}
                </span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold tracking-tight text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-foreground">
                  {isMonthly ? plan.price : plan.yearlyPrice}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                </span>
              </p>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? t("billedMonthly") : t("billedAnnually")}
              </p>

              <ul className="mt-5 gap-3 sm:gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="me-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <a
                href="https://app.cardynal.io/register"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                  index === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground"
                )}
              >
                {plan.buttonText}
              </a>
              {plan.description && (
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {customPlan && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-background p-5 sm:p-6 md:p-10 shadow-soft hover:shadow-elevated transition-all duration-250 ease-fluent"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:items-center">
            <div className="text-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <FaStar className="h-3 w-3" />
                {customPlan.name}
              </div>
              <h3 className="mt-4 text-display-sm font-semibold tracking-tight text-balance">
                {customPlan.description}
              </h3>
              <p className="mt-4 text-base text-muted-foreground text-pretty md:text-lg">
                {isMonthly ? customPlan.price : customPlan.yearlyPrice}
              </p>
              <a
                href="mailto:support@cardynal.io"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-6 text-background"
                )}
              >
                {customPlan.buttonText}
              </a>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {customPlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm md:text-base">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
