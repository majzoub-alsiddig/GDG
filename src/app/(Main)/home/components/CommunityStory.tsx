"use client";

import { useTranslations } from "@/i18n";

const MILESTONE_META = [
  { key: "founded", accent: "bg-[#4285F4]" },
  { key: "events", accent: "bg-[#EA4335]" },
  { key: "today", accent: "bg-[#34A853]" },
] as const;

export default function CommunityStory() {
  const { t } = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          {t("about.story.eyebrow")}
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {t("about.story.title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {t("about.story.description")}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-14 sm:mt-16">
        {/* Connector line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-3 hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:block"
        />

        <ol className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-8">
          {MILESTONE_META.map(({ key, accent }) => {
            const marker = t(`about.story.milestones.${key}.marker`);
            const title = t(`about.story.milestones.${key}.title`);
            const description = t(`about.story.milestones.${key}.description`);

            return (
              <li key={key} className="relative text-center lg:text-start">
                {/* Marker dot */}
                <div className="mb-6 flex justify-center lg:justify-start">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span
                      className={`absolute h-6 w-6 rounded-full opacity-20 ${accent}`}
                    />
                    <span className={`relative h-3 w-3 rounded-full ${accent}`} />
                  </span>
                </div>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {marker}
                </p>
                <h3 className="mt-2 text-base font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
