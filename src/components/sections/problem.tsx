"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareOff, Clock, Languages } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap = {
  MessageSquareOff,
  Clock,
  Languages,
};

export default function Component() {
  const t = useTranslations("problem");
  const problems = t.raw("items");

  return (
    <Section
      title={t("tag")}
      subtitle={t("title")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem: any, index: number) => {
          const IconComponent = Object.values(iconMap)[index] as React.ComponentType<{className: string}>;
          return (
            <BlurFade key={index} delay={0.2 + index * 0.2} inView>
              <Card className="bg-background border-none shadow-none">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </BlurFade>
          );
        })}
      </div>
    </Section>
  );
}
