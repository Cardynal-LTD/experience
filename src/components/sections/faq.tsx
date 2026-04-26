"use client";

import Section from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");

  const faqs = t.raw("items");

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <div className="mx-auto my-12 px-3 sm:px-4 md:max-w-[800px]">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col items-center justify-center space-y-2"
        >
          {faqs.map((faq: any, idx: number) => (
            <AccordionItem
              key={idx}
              value={faq.question}
              className="w-full border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-4 text-start">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-start">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
        {t("stillHaveQuestions")}{" "}
        <a href={`mailto:${siteConfig.links.email}`} className="underline">
          {siteConfig.links.email}
        </a>
      </h4>
    </Section>
  );
}
