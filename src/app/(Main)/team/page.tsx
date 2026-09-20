import TeamHero from "./components/TeamHero";
import TeamIntroduction from "./components/TeamIntroduction";
import TeamCulture from "./components/TeamCulture";
import TeamSection from "./components/TeamSection";
import JoinCommunityCTA from "./components/JoinCommunityCTA";
import { prisma } from "@/lib/prisma";
import type { TeamMember, TeamCategory } from "./types";

const Team = async () => {
  const dbMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });

  const teamMembers: TeamMember[] = dbMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    about: m.about,
    photo: m.photo,
    category: m.category as TeamCategory,
    socials: {
      github: m.github || undefined,
      linkedin: m.linkedin || undefined,
      instagram: m.instagram || undefined,
      twitter: m.twitter || undefined,
      website: m.website || undefined,
    },
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <TeamHero />
        <TeamIntroduction />
        <TeamCulture />
        <TeamSection members={teamMembers} />
        <JoinCommunityCTA />
      </main>
    </div>
  );
};

export default Team;