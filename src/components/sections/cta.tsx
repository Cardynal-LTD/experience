"use client";

import { Icons } from "@/components/icons";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta");

  return (
    <Section
      id="cta"
      title={t("title")}
      subtitle={t("subtitle")}
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <a
          href="https://app.cardynal.io/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          {t("cta")}
        </a>
      </div>
    </Section>
  );
}
