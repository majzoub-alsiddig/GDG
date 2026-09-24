"use client";

import { ArrowRightIcon, BookIcon, CodeIcon, UsersIcon } from "@/components/icons";
import { useTranslations } from "@/i18n";

const PILLAR_META = [
  {
    key: "learn",
    Icon: BookIcon,
    href: "/courses",
    accent: "text-[#4285F4]",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
  },
  {
    key: "build",
    Icon: CodeIcon,
    href: "/events",
    accent: "text-[#34A853]",
    bg: "bg-green-50",
    ring: "ring-green-100",
  },
  {
    key: "connect",
    Icon: UsersIcon,
    href: "/team",
    accent: "text-[#EA4335]",
    bg: "bg-red-50",
    ring: "ring-red-100",
  },
] as const;

export default function WhatWeDo() {
  const { t } = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          {t("about.whatWeDo.eyebrow")}
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {t("about.whatWeDo.title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {t("about.whatWeDo.description")}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {PILLAR_META.map(({ key, Icon, href, accent, bg, ring }) => {
          const title = t(`about.whatWeDo.pillars.${key}.title`);
          const description = t(`about.whatWeDo.pillars.${key}.description`);
          const cta = t(`about.whatWeDo.pillars.${key}.cta`);

          return (
            <a
              key={key}
              href={href}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 sm:p-8"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring}`}
              >
                <Icon className={`h-6 w-6 ${accent}`} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#1a73e8]">
                {cta}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
