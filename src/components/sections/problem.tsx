"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("problem");

  return (
    <Section title={t("tag")} subtitle={t("title")}>
      <BlurFade delay={0.2} inView>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t("body")}
        </p>
      </BlurFade>
    </Section>
  );
}
