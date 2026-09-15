import TeamHero from "./components/TeamHero";
import TeamIntroduction from "./components/TeamIntroduction";
import TeamCulture from "./components/TeamCulture";
import TeamSection from "./components/TeamSection";
import JoinCommunityCTA from "./components/JoinCommunityCTA";
import { teamMembers } from "./data/team";

const Team = () => {
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