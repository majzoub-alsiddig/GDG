// app/team/components/TeamSection.tsx
"use client";

import { useMemo } from "react";
import type { TeamCategory, TeamMember } from "../types";
import TeamMemberCard from "./TeamMemberCard";
import TeamEmptyState from "./TeamEmptyState";
import TeamSkeleton from "./TeamSkeleton";

type Props = {
  members: TeamMember[];
  loading?: boolean;
};

const CATEGORY_ORDER: TeamCategory[] = [
  "Leadership",
  "Technical",
  "Media",
  "Operations",
];

export default function TeamSection({ members, loading = false }: Props) {
  // Group members by category, respecting a preferred category order.
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
    // Include any categories not in the preferred order
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
        {/* Section header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              The people behind GDG
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Meet the organizers, developers, designers, and volunteers who
              make our community possible.
            </p>
          </div>

          {!loading && members.length > 0 && (
            <p className="shrink-0 text-sm text-gray-500">
              {members.length} member{members.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="mt-10 sm:mt-12">
          {loading ? (
            <TeamSkeleton />
          ) : members.length === 0 ? (
            <TeamEmptyState />
          ) : (
            <div className="flex flex-col gap-14 sm:gap-16">
              {grouped.map(({ category, members: list }) => (
                <div key={category}>
                  {showCategoryHeadings && (
                    <div className="mb-6 flex items-center gap-4 sm:mb-8">
                      <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                        {category}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-gray-100"
                      />
                      <span className="text-xs font-medium text-gray-400">
                        {list.length}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
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