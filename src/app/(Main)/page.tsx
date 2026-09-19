import Hero from "./home/components/Hero";
import CommunityStats from "./home/components/CommunityStats";
import UpcomingEvents from "./home/components/UpcomingEvents";
import FeaturedCourses from "./home/components/FeaturedCourses";
import JoinCommunity from "./home/components/JoinCommunity";
import {
  communityStats,
  featuredCourses,
  featuredEvents,
} from "./home/data/content";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <Hero />
        {/* <CommunityStats stats={communityStats} /> */}
        <UpcomingEvents events={featuredEvents} />
        <FeaturedCourses courses={featuredCourses} />
        <JoinCommunity />
      </main>
    </div>
  );
}