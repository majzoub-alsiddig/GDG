// src/app/(Main)/team/components/TeamSeasonExplorer.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "@/i18n";

type SeasonPill = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  memberCount: number;
};

type Props = {
  seasons: SeasonPill[];
  selectedSlug: string | null;
};

export default function TeamSeasonExplorer({ seasons, selectedSlug }: Props) {
  const router = useRouter();
  const { t } = useTranslations();

  if (seasons.length === 0) return null;

  function go(slug: string) {
    router.push(`/team?season=${encodeURIComponent(slug)}`);
  }

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          {t("team.seasons.label")}
        </span>
        <div
          role="tablist"
          aria-label={t("team.seasons.label")}
          className="flex flex-wrap justify-center gap-2"
        >
          {seasons.map((s) => {
            const active = s.slug === selectedSlug;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => go(s.slug)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                  active
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {s.name}
                {s.isActive && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#34A853]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}