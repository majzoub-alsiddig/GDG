import TeamHero from "./components/TeamHero";
import TeamIntroduction from "./components/TeamIntroduction";
import TeamCulture from "./components/TeamCulture";
import TeamSection from "./components/TeamSection";
import JoinCommunityCTA from "./components/JoinCommunityCTA";
import { prisma } from "@/lib/prisma";
import type { TeamMember } from "./types";

export const dynamic = "force-dynamic";

export default async function Team() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const teamMembers: TeamMember[] = members.map((m) => ({
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

  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <TeamHero />
        {/* <TeamIntroduction /> Restore if you need it or want*/}
        {/* <TeamCulture /> Restore if you need it or want*/}
        <TeamSection members={teamMembers} />
        <JoinCommunityCTA /> {/* TODO: add community join link */}
      </main>
    </div>
  );
}