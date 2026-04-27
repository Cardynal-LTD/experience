"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ComingSoon() {
  const t = useTranslations("comingSoon");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/voice-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="coming-soon" className="container mx-auto px-4 md:px-8 py-16 md:py-20">
      <BlurFade delay={0.2} inView>
        <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 sm:p-8 text-center md:p-12 shadow-soft hover:shadow-elevated transition-all duration-250 ease-fluent">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Phone className="h-3 w-3" />
            {t("badge")}
          </div>
          <h2 className="mt-4 text-display-sm font-semibold tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {t("description")}
          </p>

          {status === "success" ? (
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
              <Check className="size-4" />
              {t("success")}
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row"
            >
              <label htmlFor="voice-waitlist-email" className="sr-only">
                {t("formLabel")}
              </label>
              <input
                id="voice-waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("formPlaceholder")}
                disabled={status === "submitting"}
                className={cn(
                  "flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm",
                  "placeholder:text-muted-foreground/60",
                  "focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand",
                  "transition-all duration-fluent",
                  "disabled:opacity-60"
                )}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  buttonVariants({ variant: "brand" }),
                  "rounded-full",
                  "disabled:opacity-70"
                )}
              >
                <span>{t("cta")}</span>
                <ArrowRight className="ms-2 size-4 transition-transform duration-fluent group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-xs text-red-500">{t("error")}</p>
          )}
        </div>
      </BlurFade>
    </section>
  );
}
