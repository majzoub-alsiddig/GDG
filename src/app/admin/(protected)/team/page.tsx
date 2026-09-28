// src/app/admin/(protected)/team/page.tsx
import { prisma } from "@/lib/prisma";
import TeamManager from "./_components/TeamManager";

export default async function AdminTeamPage() {
  const [members, seasons] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: {
        season: { select: { id: true, name: true, slug: true, isActive: true } },
      },
    }),
    prisma.season.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { id: true, name: true, isActive: true },
    }),
  ]);

  return <TeamManager initialMembers={members} seasons={seasons} />;
}