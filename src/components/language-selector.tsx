"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "he", label: "HE" },
] as const;

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      disabled={isPending}
      className="h-9 rounded-md border border-input bg-background px-2 py-1 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 cursor-pointer"
    >
      {locales.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
