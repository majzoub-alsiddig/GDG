import { prisma } from "@/lib/prisma";
import TeamManager from "./_components/TeamManager";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <TeamManager initialMembers={members} />;
}