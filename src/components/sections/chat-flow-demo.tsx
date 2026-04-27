"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MessageType = "customer" | "ai" | "human" | "system" | "tool" | "note";

interface Message {
  id: string;
  type: MessageType;
  text: string;
  label?: string;
  glow?: boolean;
  typing?: boolean;
}

interface FlowMessage {
  type: MessageType;
  text: string;
  label?: string;
  glow?: boolean;
}

interface Flow {
  name: string;
  messages: FlowMessage[];
}

const FLOWS: Flow[] = [
  {
    name: "Technical Support",
    messages: [
      { type: "customer", label: "Alex", text: "The API is throwing a 500 error on POST requests." },
      { type: "ai", text: "Got it. Let me check our system status." },
      { type: "system", text: "Intent detected: technical_issue" },
      { type: "tool", text: "GET /status/current", glow: true },
      { type: "tool", text: "✓ All systems operational" },
      { type: "ai", text: "Our systems are operational. Can you share your request body?" },
      { type: "customer", label: "Alex", text: '{"user": "test", "action": "create"}' },
      { type: "tool", text: "POST /validate/json", glow: true },
      { type: "tool", text: "✗ Missing required field: api_key" },
      { type: "ai", text: 'Found it! Your payload is missing the "api_key" field. Add it and you should be good.' },
      { type: "customer", label: "Alex", text: "That fixed it! Thanks a lot." },
      { type: "ai", text: "Perfect! Let me know if you need anything else." },
    ],
  },
  {
    name: "Order Tracking with Escalation",
    messages: [
      { type: "customer", label: "Noa", text: "Where is my order #4521? It's been 5 days." },
      { type: "ai", text: "Let me look that up for you right away." },
      { type: "system", text: "Intent: order_tracking" },
      { type: "tool", text: "GET /orders/4521", glow: true },
      { type: "tool", text: "Status: Stuck at sorting facility" },
      { type: "ai", text: "I see your order is delayed. Let me escalate to our logistics team." },
      { type: "system", text: "Escalating to human agent" },
      { type: "note", label: "Handoff Note", text: "Customer frustrated (5 days wait). Order #4521 stuck. Needs priority resolution." },
      { type: "human", label: "Maya", text: "Hi Noa! I'm taking over. Let me contact the carrier directly." },
      { type: "human", label: "Maya", text: "Good news. Your package will arrive tomorrow by 6pm." },
      { type: "customer", label: "Noa", text: "That's great, thank you so much!" },
    ],
  },
  {
    name: "Refund Request",
    messages: [
      { type: "customer", label: "Jordan", text: "I want a refund for order #8842. Product arrived damaged." },
      { type: "ai", text: "I'm sorry to hear that. Let me pull up your order." },
      { type: "system", text: "Intent: refund_request" },
      { type: "tool", text: "GET /orders/8842", glow: true },
      { type: "tool", text: "Order: Wireless Headphones · $89.99" },
      { type: "system", text: "Policy check: Eligible for full refund" },
      { type: "ai", text: "You're eligible for a full refund. Want me to process it now?" },
      { type: "customer", label: "Jordan", text: "Yes please." },
      { type: "tool", text: "POST /refunds/create", glow: true },
      { type: "tool", text: "✓ Refund initiated: $89.99" },
      { type: "ai", text: "Done! $89.99 will be back in your account within 3-5 business days." },
    ],
  },
];

const MAX_VISIBLE = 6;
const TYPING_MIN = 1800;
const TYPING_MAX = 3200;
const AFTER_MESSAGE = 900;
const AFTER_SYSTEM = 1200;
const BETWEEN_FLOWS = 4500;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function MessageBubble({ msg }: { msg: Message }) {
  const isLeft = msg.type === "customer";
  const isCenter = msg.type === "system" || msg.type === "tool";
  const isRight = msg.type === "ai" || msg.type === "human" || msg.type === "note";

  const align = isLeft ? "self-start" : isRight ? "self-end" : "self-center";
  const labelAlign = isLeft ? "text-start" : "text-end";

  const bubble: Record<MessageType, string> = {
    customer: "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-slate-100",
    ai: "bg-accent text-accent-foreground",
    human: "bg-primary text-primary-foreground",
    system: "bg-slate-500/8 text-slate-500 text-[11px] sm:text-xs italic ring-1 ring-slate-500/15 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10",
    tool: "bg-indigo-500/8 text-indigo-600 font-mono text-[11px] sm:text-xs ring-1 ring-indigo-500/20 dark:bg-indigo-400/15 dark:text-indigo-300 dark:ring-indigo-400/30",
    note: "bg-amber-500/8 text-amber-800 ring-1 ring-amber-500/30 dark:bg-amber-400/12 dark:text-amber-300",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex max-w-[80%] sm:max-w-[85%] flex-col gap-1", align)}
    >
      {(msg.label && (msg.type === "customer" || msg.type === "ai" || msg.type === "human")) && (
        <span className={cn("text-[11px] sm:text-xs font-medium text-muted-foreground", labelAlign)}>
          {msg.label}
        </span>
      )}
      <div
        className={cn(
          "rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm",
          bubble[msg.type],
          msg.glow && "animate-pulse",
          isCenter && "px-2 py-1 rounded-full"
        )}
      >
        {msg.type === "note" && msg.label && (
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {msg.label}
          </div>
        )}
        {msg.typing ? (
          <div className="flex items-center gap-1 py-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-50 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-50 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-50 [animation-delay:300ms]" />
          </div>
        ) : (
          msg.text
        )}
      </div>
    </motion.div>
  );
}

export default function ChatFlowDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const runningRef = useRef(true);
  const flowIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    runningRef.current = true;

    const trim = (msgs: Message[]) => msgs.slice(-MAX_VISIBLE);

    const append = (msg: Message) =>
      setMessages((prev) => trim([...prev, msg]));

    const replace = (id: string, msg: Message) =>
      setMessages((prev) => prev.map((m) => (m.id === id ? msg : m)));

    const remove = (id: string) =>
      setMessages((prev) => prev.filter((m) => m.id !== id));

    const showTyping = async (type: MessageType, label?: string) => {
      const id = uid();
      append({ id, type, text: "", label, typing: true });
      await sleep(rand(TYPING_MIN, TYPING_MAX));
      remove(id);
      return;
    };

    const runFlow = async (flow: Flow) => {
      for (const msg of flow.messages) {
        if (!runningRef.current) return;

        const isHuman = msg.type === "customer" || msg.type === "ai" || msg.type === "human";
        if (isHuman) {
          await showTyping(msg.type, msg.label);
          if (!runningRef.current) return;
        }

        append({
          id: uid(),
          type: msg.type,
          text: msg.text,
          label: msg.label,
          glow: msg.glow,
        });

        await sleep(msg.type === "system" || msg.type === "tool" ? AFTER_SYSTEM : AFTER_MESSAGE);
      }
    };

    const loop = async () => {
      while (runningRef.current) {
        const flow = FLOWS[flowIndexRef.current];
        flowIndexRef.current = (flowIndexRef.current + 1) % FLOWS.length;
        await runFlow(flow);
        if (!runningRef.current) return;
        await sleep(BETWEEN_FLOWS);
      }
    };

    loop();

    return () => {
      runningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mx-auto flex w-full max-w-[90vw] sm:max-w-[380px] flex-col overflow-hidden rounded-[28px] border border-border/60 bg-background shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 bg-foreground px-4 py-3 text-background">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-white/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-cardynal.png"
            alt="Cardynal"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold leading-tight">Cardynal Support</div>
          <div className="flex items-center gap-1.5 text-[11px] text-background/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            AI + human, live
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex h-[360px] sm:h-[460px] md:h-[520px] flex-col gap-2 overflow-y-auto overflow-x-hidden touch-pan-x overscroll-contain bg-slate-50 px-4 py-4 dark:bg-neutral-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 border-t border-border/50 bg-background px-4 py-3">
        <div className="flex-1 rounded-full bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
          Type a message...
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" />
            <path d="m22 2-7 20-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
