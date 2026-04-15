"use client";

import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Link, Upload, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("howItWorks");

  const data = [
    {
      id: 1,
      title: t("steps.0.title"),
      content: t("steps.0.description"),
      image: "/chat-inbox-light.png",
      imageDark: "/chat-inbox-dark.png",
      icon: <Link className="w-6 h-6 text-primary" />,
    },
    {
      id: 2,
      title: t("steps.1.title"),
      content: t("steps.1.description"),
      image: "/knowledge-base-light.png",
      imageDark: "/knowledge-base-dark.png",
      icon: <Upload className="w-6 h-6 text-primary" />,
    },
    {
      id: 3,
      title: t("steps.2.title"),
      content: t("steps.2.description"),
      image: "/agent-builder-light.png",
      imageDark: "/agent-builder-dark.png",
      icon: <Rocket className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <Features data={data} />
    </Section>
  );
}
