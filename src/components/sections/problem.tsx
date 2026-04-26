"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("problem");
  const problems = t.raw("items");

  return (
    <Section title={t("tag")} subtitle={t("title")}>
      <div className="mx-auto mt-16 max-w-4xl divide-y divide-border">
        {problems.map((problem: any, index: number) => (
          <BlurFade key={index} delay={0.15 + index * 0.15} inView>
            <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[6rem_1fr] md:gap-12 md:py-12">
              <span className="font-mono text-4xl font-light text-primary md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
                  {problem.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {problem.description}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
