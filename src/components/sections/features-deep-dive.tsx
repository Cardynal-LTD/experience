"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/section";

const ICONS = [
  // Agent builder — squares
  <svg key="ab" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>,
  // Workflow — branches
  <svg key="wf" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>,
  // Integrations — plug
  <svg key="in" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>,
];

interface DeepDiveItem {
  title: string;
  description: string;
  highlights: string[];
}

export default function FeaturesDeepDive() {
  const t = useTranslations("featuresDeepDive");
  const items = t.raw("items") as DeepDiveItem[];

  return (
    <Section
      title={t("tag")}
      subtitle={t("title")}
      description={t("subtitle")}
      className="bg-neutral-50 dark:bg-neutral-900/40"
    >
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-fluent hover:shadow-elevated md:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-fluent group-hover:bg-brand/15">
                {ICONS[i] ?? ICONS[0]}
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2 ps-14">
              {item.highlights.map((h, hi) => (
                <li
                  key={hi}
                  className="flex items-start gap-2 text-sm text-foreground/85"
                >
                  <svg
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
