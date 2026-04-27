"use client";

import FlickeringGrid from "@/components/magicui/flickering-grid";
import Ripple from "@/components/magicui/ripple";
import ThemedSafari from "@/components/themed-safari";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("solution");

  const features = [
    {
      title: t("cards.0.title"),
      description: t("cards.0.description"),
      className: "hover:bg-red-500/10 hover:shadow-elevated transition-all duration-250 ease-fluent",
      content: (
        <ThemedSafari
          lightSrc="/agent-builder-light.png"
          darkSrc="/agent-builder-dark.png"
          url="https://app.cardynal.io"
          className="lg:-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] dark:drop-shadow-[0_0_28px_rgba(0,0,0,.4)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
    },
    {
      title: t("cards.1.title"),
      description: t("cards.1.description"),
      className: "hover:bg-blue-500/10 hover:shadow-elevated transition-all duration-250 ease-fluent",
      content: (
        <ThemedSafari
          lightSrc="/chat-inbox-light.png"
          darkSrc="/chat-inbox-dark.png"
          url="https://app.cardynal.io"
          className="lg:-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] dark:drop-shadow-[0_0_28px_rgba(0,0,0,.4)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
    },
    {
      title: t("cards.2.title"),
      description: t("cards.2.description"),
      className:
        "md:row-span-2 hover:bg-accent/10 hover:shadow-elevated transition-all duration-250 ease-fluent",
      content: (
        <>
          <FlickeringGrid
            className="z-0 absolute inset-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
            squareSize={4}
            gridGap={6}
            color="#000"
            maxOpacity={0.1}
            flickerChance={0.1}
            height={800}
            width={800}
          />
          <ThemedSafari
            lightSrc="/chat-inbox-light.png"
            darkSrc="/chat-inbox-dark.png"
            url="https://app.cardynal.io"
            className="lg:-mb-48 ms-12 mt-16 h-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] dark:drop-shadow-[0_0_28px_rgba(0,0,0,.4)] group-hover:translate-x-[-10px] rtl:group-hover:translate-x-[10px] transition-all duration-300"
          />
        </>
      ),
    },
    {
      title: t("cards.3.title"),
      description: t("cards.3.description"),
      className: "hover:bg-green-500/10 hover:shadow-elevated transition-all duration-250 ease-fluent",
      content: (
        <>
          <Ripple className="absolute -bottom-full" />
          <ThemedSafari
            lightSrc="/ticket-kanban-light.png"
            darkSrc="/ticket-kanban-dark.png"
            url="https://app.cardynal.io"
            className="lg:-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] dark:drop-shadow-[0_0_28px_rgba(0,0,0,.4)] group-hover:translate-y-[-10px] transition-all duration-300"
          />
        </>
      ),
    },
    {
      title: t("cards.4.title"),
      description: t("cards.4.description"),
      className: "hover:bg-purple-500/10 hover:shadow-elevated transition-all duration-250 ease-fluent",
      content: (
        <ThemedSafari
          lightSrc="/knowledge-base-light.png"
          darkSrc="/knowledge-base-dark.png"
          url="https://app.cardynal.io"
          className="lg:-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] dark:drop-shadow-[0_0_28px_rgba(0,0,0,.4)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
    },
  ];

  return (
    <Section
      title={t("tag")}
      subtitle={
        <>
          {t("title")}
          <br />
          <span className="text-primary">{t("titleAccent")}</span>
        </>
      }
      description={t("description")}
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <motion.div
        className="relative mx-auto mt-12 w-full max-w-5xl [mask-image:linear-gradient(to_bottom,black_0%,black_15%,transparent_70%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_15%,transparent_70%)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ThemedSafari
          url="https://app.cardynal.io"
          lightSrc="/agent-builder-light.png"
          darkSrc="/agent-builder-dark.png"
          className="size-full drop-shadow-2xl"
        />
      </motion.div>
      <div className="relative z-10 mx-auto mt-8 grid max-w-sm grid-cols-1 gap-6 text-gray-500 lg:-mt-40 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-5 sm:p-6 rounded-2xl border border-border/60 shadow-soft",
              feature.className
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-semibold tracking-tight mb-2 text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground text-pretty">{feature.description}</p>
            </div>
            {feature.content}
            <div className="absolute bottom-0 start-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
