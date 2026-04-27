"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Section from "@/components/section";

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function ChatIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function HumanIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

interface NodeProps {
  state: "idle" | "blue" | "orange" | "red" | "shake";
  icon: React.ReactNode;
  label: string;
  text: string;
  badge?: { text: string; tone: "red" | "orange" };
}

function Node({ state, icon, label, text, badge }: NodeProps) {
  const tone = {
    idle: "border-border bg-card text-muted-foreground",
    blue: "border-[#1181e8] bg-[#1181e8]/8 text-foreground shadow-[0_0_0_4px_rgba(17,129,232,0.08)]",
    orange: "border-brand bg-brand/10 text-foreground shadow-[0_0_0_4px_hsl(var(--brand)/0.12)]",
    red: "border-red-500 bg-red-500/8 text-foreground",
    shake: "border-red-500 bg-red-500/8 text-foreground",
  }[state];

  return (
    <motion.div
      animate={state === "shake" ? { x: [0, -4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative w-full max-w-[280px] rounded-xl border px-3 py-2.5 transition-all duration-500",
        tone
      )}
    >
      {badge && (
        <span
          className={cn(
            "absolute -top-2 start-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            badge.tone === "red"
              ? "bg-red-500 text-white"
              : "bg-brand text-brand-foreground"
          )}
        >
          {badge.text}
        </span>
      )}
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-0.5 text-sm font-medium leading-snug">{text}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Connector({ active, color = "blue" }: { active: boolean; color?: "blue" | "orange" }) {
  const colorClass = color === "orange" ? "bg-brand" : "bg-[#1181e8]";
  return (
    <div className="relative my-1 h-6 w-px self-center bg-border">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className={cn("absolute inset-0", colorClass)}
      />
    </div>
  );
}

export default function TreeWidget() {
  const t = useTranslations("tree");
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    if (reduced) {
      setPhase(5);
      return;
    }
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase(0);
        await sleep(400);
        if (cancelled) return;
        setPhase(1);
        await sleep(1200);
        if (cancelled) return;
        setPhase(2);
        await sleep(1200);
        if (cancelled) return;
        setPhase(3);
        await sleep(1400);
        if (cancelled) return;
        setPhase(4);
        await sleep(1400);
        if (cancelled) return;
        setPhase(5);
        await sleep(3800);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const customerState: NodeProps["state"] = phase >= 1 ? "blue" : "idle";
  const aiState: NodeProps["state"] = phase >= 3 ? "orange" : phase >= 2 ? "blue" : "idle";
  const blockedState: NodeProps["state"] =
    phase >= 4 ? "shake" : phase >= 3 ? "red" : "idle";
  const priorityState: NodeProps["state"] =
    phase >= 5 ? "orange" : "idle";

  return (
    <Section
      title={t("tag")}
      subtitle={
        <>
          {t("title")}
          <br />
          <span className="text-muted-foreground font-normal">{t("subtitle")}</span>
        </>
      }
    >
      <div className="mx-auto mt-10 flex w-full max-w-md flex-col items-center px-4">
        <Node
          state={customerState}
          icon={<ChatIcon />}
          label="Customer"
          text={t("steps.customer")}
        />
        <Connector active={phase >= 2} color="blue" />
        <Node
          state={aiState}
          icon={<SparkIcon />}
          label="AI"
          text={t("steps.ai")}
        />
        <Connector active={phase >= 3} color="orange" />
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <Node
              state={blockedState}
              icon={<BlockIcon />}
              label="Auto-reply"
              text={t("steps.blocked")}
              badge={phase >= 4 ? { text: "BLOCKED", tone: "red" } : undefined}
            />
          </div>
          <div className="flex flex-col items-center">
            <Node
              state={priorityState}
              icon={<HumanIcon />}
              label="Human"
              text={t("steps.priority")}
              badge={phase >= 5 ? { text: "PRIORITY", tone: "orange" } : undefined}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
