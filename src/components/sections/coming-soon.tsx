"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("comingSoon");

  return (
    <section id="coming-soon" className="container mx-auto px-4 md:px-8 py-16 md:py-20">
      <BlurFade delay={0.2} inView>
        <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 sm:p-8 text-center md:p-12 shadow-soft hover:shadow-elevated transition-all duration-250 ease-fluent">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Phone className="h-3 w-3" />
            {t("badge")}
          </div>
          <h2 className="mt-4 text-display-sm font-semibold tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {t("description")}
          </p>
          <a
            href="mailto:support@cardynal.io?subject=Voice%20agents%20early%20access"
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-8 text-background"
            )}
          >
            {t("cta")}
          </a>
        </div>
      </BlurFade>
    </section>
  );
}
