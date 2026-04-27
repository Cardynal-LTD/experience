"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("problem");
  const quote = t("quote");
  const [highlight, ...rest] = quote.split(" — ");
  const remainder = rest.join(" — ");

  return (
    <section id="problem" className="container mx-auto px-4 py-20 md:px-8 md:py-24">
      <BlurFade delay={0.15} inView>
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {t("tag")}
        </p>
      </BlurFade>
      <BlurFade delay={0.3} inView>
        <figure className="relative mx-auto mt-8 max-w-3xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 start-0 select-none font-serif text-4xl leading-none text-primary/15 sm:text-6xl md:-top-10 md:text-7xl lg:text-8xl"
          >
            &ldquo;
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-16 end-0 select-none font-serif text-4xl leading-none text-primary/15 sm:text-6xl md:-bottom-20 md:text-7xl lg:text-8xl"
          >
            &rdquo;
          </span>
          <blockquote className="relative px-4 text-center text-display-sm md:text-display font-semibold tracking-tight leading-snug text-foreground text-balance md:px-12">
            <span className="text-primary">{highlight}</span>
            {remainder && (
              <>
                {" \u2014 "}
                <span>{remainder}</span>
              </>
            )}
          </blockquote>
        </figure>
      </BlurFade>
    </section>
  );
}
