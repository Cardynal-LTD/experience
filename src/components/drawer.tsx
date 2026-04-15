"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { IoMenuSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";

export default function drawerDemo() {
  const t = useTranslations("header");
  const tn = useTranslations("nav");

  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo className="w-auto h-[40px]" />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
          </div>
          <nav>
            <ul className="mt-7 text-left">
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
        <DrawerFooter>
          <a
            href="https://app.cardynal.io/login"
            className={buttonVariants({ variant: "outline" })}
          >
            {t("login")}
          </a>
          <a
            href="https://app.cardynal.io/signup"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto text-background flex gap-2"
            )}
          >
            <Icons.logo className="h-6 w-6" />
            {t("getStarted")}
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
