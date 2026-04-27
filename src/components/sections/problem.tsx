"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("problem");
  const quote = t("quote");
  const [highlight, ...rest] = quote.split(/\.\s+/);
  const remainder = rest.join(". ");

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
            className="pointer-events-none absolute -top-4 start-0 select-none font-serif text-3xl leading-none text-primary/15 sm:text-4xl md:-top-6 md:text-5xl lg:text-6xl"
          >
            &ldquo;
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 end-0 select-none font-serif text-3xl leading-none text-primary/15 sm:text-4xl md:-bottom-12 md:text-5xl lg:text-6xl"
          >
            &rdquo;
          </span>
          <blockquote className="relative px-4 text-center text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-foreground text-balance md:px-12">
            <span className="text-primary">{highlight}.</span>
            {remainder && (
              <>
                {" "}
                <span>{remainder}</span>
              </>
            )}
          </blockquote>
        </figure>
      </BlurFade>
    </section>
  );
}
