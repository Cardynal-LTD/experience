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

function formatCurrency(amount: number, locale: string): string {
  if (locale === "he") return `₪ ${Math.round(amount * 3.6)}`;
  if (locale === "fr") return `${Math.round(amount * 0.92)} €`;
  return `$${amount}`;
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
      custom_branding: "Branding personnalisé",
    };
  }
  if (locale === "he") {
    return {
      whatsapp: "WhatsApp כלול",
      api_access: "גישת API",
      custom_llm: "LLM מותאם",
      export_import: "ייצוא / ייבוא",
      custom_branding: "מיתוג מותאם",
    };
  }
  return {
    whatsapp: "WhatsApp included",
    api_access: "API access",
    custom_llm: "Custom LLM",
    export_import: "Export / Import",
    custom_branding: "Custom branding",
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
            price: isEnterprise ? (locale === "fr" ? "Sur devis" : locale === "he" ? "בהתאמה" : "Custom") : formatCurrency(plan.priceMonthly, locale),
            yearlyPrice: isEnterprise ? (locale === "fr" ? "Sur devis" : locale === "he" ? "בהתאמה" : "Custom") : formatCurrency(plan.priceYearly, locale),
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

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <div className="flex justify-center mb-10">
        <span className="mr-2 font-semibold">{t("monthly")}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch checked={!isMonthly} onCheckedChange={handleToggle} />
          </Label>
        </label>
        <span className="ml-2 font-semibold">{t("yearly")}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: 0,
                    opacity: 1,
                    x:
                      index === plans.length - 1
                        ? -30
                        : index === 0
                        ? 30
                        : 0,
                    scale:
                      index === 0 || index === plans.length - 1
                        ? 0.94
                        : 1.0,
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
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              index === 1 ? "border-primary border-[2px]" : "border-border",
              index === 0 || index === plans.length - 1
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === plans.length - 1 && "origin-left"
            )}
          >
            {index === 1 && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <FaStar className="text-white" />
                <span className="text-white ml-1 font-sans font-semibold">
                  {t("popular")}
                </span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {isMonthly ? plan.price : plan.yearlyPrice}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                </span>
              </p>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? t("billedMonthly") : t("billedAnnually")}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
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
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-white",
                  index === 1
                    ? "bg-primary text-white"
                    : "bg-white text-black"
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
    </Section>
  );
}
