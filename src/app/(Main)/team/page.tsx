// src/app/(Main)/team/page.tsx
import TeamHero from "./components/TeamHero";
import TeamSeasonExplorer from "./components/TeamSeasonExplorer";
import TeamSection from "./components/TeamSection";
import JoinCommunityCTA from "./components/JoinCommunityCTA";
import { prisma } from "@/lib/prisma";
import type { TeamMember } from "./types";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ season?: string | string[] }>;

export default async function Team({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const seasonParam =
    typeof sp.season === "string"
      ? sp.season
      : Array.isArray(sp.season)
        ? sp.season[0]
        : undefined;

  const seasons = await prisma.season.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { members: true } } },
  });

  // Resolve which season to show:
  //   1. explicit ?season=<slug> if it matches
  //   2. otherwise the active season
  //   3. otherwise the highest-ordered season
  let selected = seasonParam
    ? seasons.find((s) => s.slug === seasonParam) ?? null
    : null;

  if (!selected && seasons.length > 0) {
    selected =
      seasons.find((s) => s.isActive) ??
      [...seasons].sort((a, b) => b.order - a.order)[0] ??
      null;
  }

  // Legacy behavior: if there are no seasons at all, show every member.
  // Once seasons exist, only the selected season's members are public.
  const rawMembers =
    seasons.length === 0
      ? await prisma.teamMember.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        })
      : selected
        ? await prisma.teamMember.findMany({
            where: { seasonId: selected.id },
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          })
        : [];

  const teamMembers: TeamMember[] = rawMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    about: m.about,
    photo: m.photo,
    category: m.category as TeamMember["category"],
    socials: {
      github: m.github ?? undefined,
      linkedin: m.linkedin ?? undefined,
      instagram: m.instagram ?? undefined,
      twitter: m.twitter ?? undefined,
      website: m.website ?? undefined,
    },
  }));

  const seasonPills = seasons.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    isActive: s.isActive,
    memberCount: s._count.members,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <TeamHero />
        {seasonPills.length > 0 && (
          <TeamSeasonExplorer
            seasons={seasonPills}
            selectedSlug={selected?.slug ?? null}
          />
        )}
        <TeamSection
          members={teamMembers}
          emptyVariant={seasons.length > 0 ? "season" : "default"}
        />
        <JoinCommunityCTA />
      </main>
    </div>
  );
}