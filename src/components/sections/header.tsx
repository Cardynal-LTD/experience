"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import LanguageSelector from "@/components/language-selector";
import Menu from "@/components/menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "relative sticky top-0 z-[9999] py-2 bg-background/70 backdrop-blur-lg"
      }
    >
      <div className="flex justify-between items-center container">
        <Link
          href="/"
          title="brand-logo"
          className="relative me-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto h-8 sm:h-10" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            <nav className="me-10">
              <Menu />
            </nav>

            <div className="gap-2 flex items-center">
              <ThemeToggle />
              <LanguageSelector />
              <a
                href="https://app.cardynal.io/login"
                className={buttonVariants({ variant: "outline" })}
              >
                {t("login")}
              </a>
              <a
                href="https://app.cardynal.io/register"
                className={cn(buttonVariants({ variant: "brand", size: "pill" }))}
              >
                {t("getStarted")}
              </a>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
