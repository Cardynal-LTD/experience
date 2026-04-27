"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChatFlowDemo from "@/components/sections/chat-flow-demo";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  const t = useTranslations("hero");
  return (
    <motion.div
      className="flex w-fit max-w-full items-center gap-2 rounded-full bg-secondary px-2 py-1 ring-1 ring-brand/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="shrink-0 rounded-full bg-brand-gradient px-2 py-0.5 text-xs font-semibold text-brand-foreground sm:text-sm">
        {t("pill")}
      </div>
      <p className="hidden text-xs font-medium text-foreground sm:block sm:text-sm">
        {t("pillSub")}
      </p>
    </motion.div>
  );
}

function HeroTitles() {
  const t = useTranslations("hero");
  const titleWords = t.raw("title");
  return (
    <div className="flex w-full flex-col space-y-4 overflow-hidden pt-6">
      <motion.h1
        className="text-center text-display lg:text-display-lg font-semibold tracking-tight leading-tight text-foreground text-balance lg:text-start"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {titleWords.map((text: string, index: number) => (
          <motion.span
            key={index}
            className={cn(
              "inline-block px-0.5 sm:px-1 md:px-2 text-balance font-semibold",
              index === 0 && "text-brand-gradient"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-base leading-6 text-muted-foreground text-balance text-pretty sm:text-xl sm:leading-9 lg:mx-0 lg:text-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {t("description")}
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  const t = useTranslations("hero");
  return (
    <motion.div
      className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease }}
    >
      <motion.a
        href="https://app.cardynal.io/register"
        className={cn(buttonVariants({ variant: "brand" }))}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease }}
      >
        {t("cta")}
      </motion.a>
      <motion.a
        href="https://cal.com/cardynal.io/30min"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline" }))}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease }}
      >
        {t("ctaSecondary")}
      </motion.a>
    </motion.div>
  );
}

function HeroDemo() {
  return (
    <motion.div
      className="relative mx-auto mt-10 flex w-full items-center justify-center lg:mt-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <ChatFlowDemo />
    </motion.div>
  );
}

export default function Hero2() {
  return (
    <section id="hero" className="overflow-x-hidden">
      <div className="relative w-full px-4 pt-16 sm:px-6 sm:pt-20 md:pt-24 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div className="flex flex-col items-center lg:items-start">
            <HeroPill />
            <HeroTitles />
            <HeroCTA />
          </div>
          <HeroDemo />
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  );
}
