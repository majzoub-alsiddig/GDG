// src/app/(Main)/team/components/TeamCulture.tsx
"use client";

import { CodeIcon, LightbulbIcon, ShareIcon } from "@/components/icons";
import { useTranslations } from "@/i18n";

const PILLARS = [
  {
    key: "learn" as const,
    Icon: LightbulbIcon,
    accent: "text-[#4285F4]",
    ring: "ring-blue-100",
    bg: "bg-blue-50",
  },
  {
    key: "build" as const,
    Icon: CodeIcon,
    accent: "text-[#34A853]",
    ring: "ring-green-100",
    bg: "bg-green-50",
  },
  {
    key: "share" as const,
    Icon: ShareIcon,
    accent: "text-[#EA4335]",
    ring: "ring-red-100",
    bg: "bg-red-50",
  },
];

export default function TeamCulture() {
  const { t } = useTranslations();

  return (
    <section className="px-4 pb-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            {t("team.culture.eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t("team.culture.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {t("team.culture.description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {PILLARS.map(({ key, Icon, accent, ring, bg }) => (
            <div
              key={key}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] sm:p-8"
            >
              <span
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring}`}
              >
                <Icon className={`h-6 w-6 ${accent}`} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {t(`team.culture.pillars.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {t(`team.culture.pillars.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
