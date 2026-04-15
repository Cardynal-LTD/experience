"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      " border border-neutral-200 bg-white",
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      name: "James Whitfield",
      role: "CTO at Storevault",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      description: (
        <p>
          We added Cardynal to our e-commerce platform and <Highlight>our merchants saw 73% fewer support tickets</Highlight> in the first month. It basically sold itself as a feature.
        </p>
      ),
    },
    {
      name: "Laura Chen",
      role: "VP Product at Deskflow",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      description: (
        <p>
          We looked into building support ourselves. <Highlight>Cardynal saved us 6 months</Highlight> and delivered something better than what we would have built in-house.
        </p>
      ),
    },
    {
      name: "Marc Delarue",
      role: "Founder at Punchlist",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      description: (
        <p>
          The setup was surprisingly quick. <Highlight>We went live in under a week</Highlight> and our customers think it's our own product — that's exactly what we wanted.
        </p>
      ),
    },
    {
      name: "Priya Nair",
      role: "Head of CS at Appointly",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      description: (
        <p>
          Our clinics used to drown in appointment questions. Now <Highlight>the AI handles 85% of them on its own</Highlight>. The team can finally focus on the cases that actually need a human.
        </p>
      ),
    },
    {
      name: "Ryan Torres",
      role: "CEO at Tenantbase",
      img: "https://randomuser.me/api/portraits/men/52.jpg",
      description: (
        <p>
          Property managers on our platform needed better support tools and we couldn't build them fast enough. <Highlight>Cardynal became one of our most requested features</Highlight> overnight.
        </p>
      ),
    },
    {
      name: "Sophie Brandt",
      role: "Product Lead at Orderstack",
      img: "https://randomuser.me/api/portraits/women/63.jpg",
      description: (
        <p>
          <Highlight>One inbox for everything</Highlight> — that's what our merchants kept asking for. Cardynal gave them WhatsApp, email, and web chat in one place, and we didn't have to build a thing.
        </p>
      ),
    },
    {
      name: "Daniel Okoye",
      role: "CTO at Vendora",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description: (
        <p>
          Our marketplace sellers love that they can <Highlight>set up their own refund and tracking flows</Highlight> without asking us for help. Our support load dropped by half.
        </p>
      ),
    },
    {
      name: "Emma Lindqvist",
      role: "VP Ops at Carewise",
      img: "https://randomuser.me/api/portraits/women/35.jpg",
      description: (
        <p>
          In healthcare, trust is everything. <Highlight>Each clinic gets its own separate workspace</Highlight> — their data never mixes with anyone else's. That was the deciding factor for us.
        </p>
      ),
    },
    {
      name: "Alex Petrov",
      role: "Founder at Shelfhero",
      img: "https://randomuser.me/api/portraits/men/78.jpg",
      description: (
        <p>
          We added AI support as a paid feature for our sellers. <Highlight>Revenue per customer went up 22%</Highlight> in the first quarter. Support went from a cost center to a growth lever.
        </p>
      ),
    },
    {
      name: "Nina Colombo",
      role: "Head of Product at Rentwise",
      img: "https://randomuser.me/api/portraits/women/55.jpg",
      description: (
        <p>
          Our landlords deal with hundreds of tenant requests. <Highlight>Response time went from hours to seconds</Highlight>. They handle the important stuff, the AI handles the rest.
        </p>
      ),
    },
    {
      name: "Tom Brennan",
      role: "CEO at Launchpad HQ",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      description: (
        <p>
          As a startup, building our own support wasn't realistic. <Highlight>Cardynal gave us a professional support experience</Highlight> at a price that made sense from day one.
        </p>
      ),
    },
    {
      name: "Aisha Rahman",
      role: "Product Manager at Curalink",
      img: "https://randomuser.me/api/portraits/women/72.jpg",
      description: (
        <p>
          Our customers kept asking for better support inside our product. <Highlight>We turned it on in a few days</Highlight> and satisfaction scores jumped almost immediately.
        </p>
      ),
    },
  ];

  return (
    <Section
      title={t("title")}
      subtitle={t("subtitle")}
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
