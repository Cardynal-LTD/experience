"use client";

import { Link } from "@/i18n/routing";
import { Icons } from "@/components/icons";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function NavigationMenuDemo() {
  const t = useTranslations("nav");
  const featuresMain = t.raw("featuresMain") as { title: string; description: string };
  const featuresItems = t.raw("featuresItems") as Array<{ title: string; description: string }>;
  const solutionsItems = t.raw("solutionsItems") as Array<{ title: string; description: string }>;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Features dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("features")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary/10 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="#features"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {featuresMain.title}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {featuresMain.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {featuresItems.map((item, index) => (
                <ListItem
                  key={index}
                  href="#features"
                  title={item.title}
                  className="hover:bg-primary/10"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Solutions dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("solutions")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {solutionsItems.map((item, index) => (
                <ListItem
                  key={index}
                  href="#"
                  title={item.title}
                  className="hover:bg-primary/10"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Pricing link */}
        <NavigationMenuItem>
          <Link href="#pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("pricing")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Blog link */}
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("blog")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Docs link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className={navigationMenuTriggerStyle()}
          >
            {t("docs")}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
