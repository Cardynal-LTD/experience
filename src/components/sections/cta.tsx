"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta");
  const tHero = useTranslations("hero");

  return (
    <Section
      id="cta"
      title={t("title")}
      subtitle={t("subtitle")}
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
        <a
          href="https://app.cardynal.io/register"
          className={cn(
            buttonVariants({ variant: "default" }),
            "text-background"
          )}
        >
          {t("cta")}
        </a>
        <a
          href="https://cal.com/cardynal.io/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {tHero("ctaSecondary")}
        </a>
      </div>
    </Section>
  );
}
