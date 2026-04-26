"use client";

import { useTranslations } from "next-intl";

export default function TrustStrip() {
  const t = useTranslations("trustStrip");
  const items = t.raw("items") as string[];

  return (
    <section id="trust" className="overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 py-10">
        <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:gap-x-8">
          {items.map((item, idx) => (
            <li key={idx} className="font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
