"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Section from "@/components/section";
import { cn } from "@/lib/utils";

interface Member {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  image: string;
}

function LinkedInIcon() {
  return (
    <svg
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-border bg-foreground/[0.04]">
      {!errored ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-lg font-semibold tracking-wider text-muted-foreground">
          {initials(name)}
        </div>
      )}
    </div>
  );
}

export default function Founders() {
  const t = useTranslations("founders");
  const members = t.raw("members") as Member[];

  return (
    <Section
      title={t("tag")}
      subtitle={t("title")}
      description={t("subtitle")}
      className="bg-neutral-50 dark:bg-neutral-900/40"
    >
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {members.map((m, i) => (
          <motion.a
            key={m.name}
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.1,
            }}
            className={cn(
              "group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-fluent",
              "hover:-translate-y-0.5 hover:shadow-elevated"
            )}
          >
            <div className="flex w-full items-center gap-4">
              <Avatar src={m.image} name={m.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-foreground">
                    {m.name}
                  </h4>
                  <span className="text-muted-foreground transition-colors duration-fluent group-hover:text-[#0A66C2]">
                    <LinkedInIcon />
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-brand">{m.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {m.bio}
            </p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
