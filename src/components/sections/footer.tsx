"use client";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const footerLinks = t.raw("links");

  // Map footer links to translated text
  const footerConfig = [
    {
      title: t("product"),
      links: [
        { href: "#features", text: footerLinks.features },
        { href: "#pricing", text: footerLinks.pricing },
        { href: "#how-it-works", text: footerLinks.howItWorks },
        { href: "#faq", text: footerLinks.faq },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "/about", text: footerLinks.ourStory },
        { href: "/docs", text: footerLinks.docs },
        { href: "mailto:support@cardynal.io", text: footerLinks.contact },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/privacy", text: footerLinks.privacy },
        { href: "/terms", text: footerLinks.terms },
        { href: "/ai-transparency", text: footerLinks.aiTransparency },
        { href: "/security", text: footerLinks.security },
        { href: "/refund", text: footerLinks.refund },
      ],
    },
  ];

  return (
    <footer>
      <div className="max-w-6xl mx-auto py-16 sm:px-10 px-5 pb-0">
        <a
          href="/"
          title={siteConfig.name}
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto h-[40px]" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </a>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 mt-8">
          {footerConfig.map((section, index) => (
            <div key={index} className="mb-5">
              <h2 className="font-semibold">{section.title}</h2>
              <ul>
                {section.links.map((link, linkIndex) => {
                  const isExternal =
                    link.href.startsWith("mailto:") ||
                    link.href.startsWith("http") ||
                    link.href.startsWith("/docs");
                  const linkClass =
                    "group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90";
                  return (
                    <li key={linkIndex} className="my-2">
                      {isExternal ? (
                        <a href={link.href} className={linkClass}>
                          {link.text}
                          <ChevronRight className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.text}
                          <ChevronRight className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t py-2 grid md:grid-cols-2 h-full justify-between w-full grid-cols-1 gap-1">
          <span className="text-sm tracking-tight text-foreground">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              {siteConfig.name}
            </Link>{" "}
            - {siteConfig.description}
          </span>
          <ul className="flex justify-start md:justify-end text-sm tracking-tight text-foreground">
            <li className="mr-3 md:mx-4">
              <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                {footerLinks.privacy}
              </Link>
            </li>
            <li className="mr-3 md:mx-4">
              <Link href="/terms" target="_blank" rel="noopener noreferrer">
                {footerLinks.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
