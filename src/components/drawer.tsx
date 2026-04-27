"use client";

import { Icons } from "@/components/icons";
import LanguageSelector from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { IoMenuSharp } from "react-icons/io5";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function drawerDemo() {
  const t = useTranslations("header");
  const tn = useTranslations("nav");

  return (
    <Drawer>
      <DrawerTrigger className="min-h-11 min-w-11 inline-flex items-center justify-center">
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              title="brand-logo"
              className="relative flex items-center space-x-2"
            >
              <Icons.logo className="w-auto h-9" />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <DrawerClose
              aria-label="Close menu"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </DrawerClose>
          </div>
          <nav className="max-h-[60vh] overflow-y-auto">
            <ul className="mt-7 text-start">
              <li className="my-3">
                <Link href="#features" className="font-semibold">{tn("features")}</Link>
              </li>
              <li className="my-3">
                <span className="font-semibold">{tn("solutions")}</span>
              </li>
              <li className="my-3">
                <Link href="#pricing" className="font-semibold">{tn("pricing")}</Link>
              </li>
              <li className="my-3">
                <Link href="/blog" className="font-semibold">{tn("blog")}</Link>
              </li>
              <li className="my-3">
                <a href="/docs" className="font-semibold">{tn("docs")}</a>
              </li>
            </ul>
          </nav>
        </DrawerHeader>

        <div className="mx-6 my-2 flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-secondary/50 px-4 py-3">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        <DrawerFooter className="px-6 pb-8 pt-2">
          <div className="flex flex-col items-stretch gap-3">
            <a
              href="https://app.cardynal.io/register"
              className={cn(
                buttonVariants({ variant: "default" }),
                "gap-2 text-background"
              )}
            >
              <Icons.logo className="h-5 w-5" />
              {t("getStarted")}
            </a>
            <a
              href="https://app.cardynal.io/login"
              className={buttonVariants({ variant: "outline" })}
            >
              {t("login")}
            </a>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
