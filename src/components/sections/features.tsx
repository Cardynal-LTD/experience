"use client";

import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Inbox, BookOpen, Workflow, Plug } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("features");

  const data = [
    {
      id: 1,
      title: t("items.0.title"),
      content: t("items.0.description"),
      image: "/chat-inbox-light.png",
      imageDark: "/chat-inbox-dark.png",
      icon: <Inbox className="h-6 w-6 text-primary" />,
    },
    {
      id: 2,
      title: t("items.1.title"),
      content: t("items.1.description"),
      image: "/knowledge-base-light.png",
      imageDark: "/knowledge-base-dark.png",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      id: 3,
      title: t("items.2.title"),
      content: t("items.2.description"),
      image: "/workflow-builder-light.png",
      imageDark: "/workflow-builder-dark.png",
      icon: <Workflow className="h-6 w-6 text-primary" />,
    },
    {
      id: 4,
      title: t("items.3.title"),
      content: t("items.3.description"),
      image: "/dashboard-light.png",
      imageDark: "/dashboard-dark.png",
      icon: <Plug className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <Section title={t("title")} subtitle={t("subtitle")}>
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
