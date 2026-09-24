// src/app/(Main)/team/components/TeamSection.tsx
"use client";

import { useMemo } from "react";
import type { TeamCategory, TeamMember } from "../types";
import TeamMemberCard from "./TeamMemberCard";
import TeamEmptyState from "./TeamEmptyState";
import TeamSkeleton from "./TeamSkeleton";
import { useTranslations } from "@/i18n";

type Props = {
  members: TeamMember[];
  loading?: boolean;
};

const CATEGORY_ORDER: TeamCategory[] = [
  "Core",
  "Technical",
  "Media",
  "Managment",
];

export default function TeamSection({ members, loading = false }: Props) {
  const { t } = useTranslations();

  // Translate a DB category value; fall back to the raw value for unknowns.
  const categoryLabel = (category: string) =>
    t(`team.categories.${category}`) === `team.categories.${category}`
      ? category
      : t(`team.categories.${category}`);

  const grouped = useMemo(() => {
    const map = new Map<TeamCategory, TeamMember[]>();
    for (const member of members) {
      const list = map.get(member.category) ?? [];
      list.push(member);
      map.set(member.category, list);
    }
    const ordered: { category: TeamCategory; members: TeamMember[] }[] = [];
    for (const category of CATEGORY_ORDER) {
      const list = map.get(category);
      if (list && list.length > 0) ordered.push({ category, members: list });
    }
    for (const [category, list] of map) {
      if (!CATEGORY_ORDER.includes(category) && list.length > 0) {
        ordered.push({ category, members: list });
      }
    }
    return ordered;
  }, [members]);

  const showCategoryHeadings = grouped.length > 1;

  return (
    <section
      id="team"
      className="scroll-mt-24 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            {t("team.section.eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t("team.section.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("team.section.description")}
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 sm:mt-14">
          {loading ? (
            <TeamSkeleton />
          ) : members.length === 0 ? (
            <TeamEmptyState />
          ) : (
            <div className="flex flex-col gap-14 sm:gap-16">
              {grouped.map(({ category, members: list }) => (
                <div key={category}>
                  {showCategoryHeadings && (
                    /* Centered category heading with flanking rules */
                    <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-gray-200 sm:w-12"
                      />
                      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500">
                        {categoryLabel(category)}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-gray-200 sm:w-12"
                      />
                    </div>
                  )}

                  {/* Centered flex-wrap grid  -  centers any count of cards */}
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                    {list.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
