// src/app/admin/(protected)/seasons/page.tsx
import { prisma } from "@/lib/prisma";
import SeasonManager, { type SeasonRow } from "./_components/SeasonManager";

export default async function AdminSeasonsPage() {
  const seasons = await prisma.season.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { members: true } } },
  });

  const initialSeasons: SeasonRow[] = seasons.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    order: s.order,
    isActive: s.isActive,
    memberCount: s._count.members,
  }));

  return <SeasonManager initialSeasons={initialSeasons} />;
}