import Hero from "./home/components/Hero";
import CommunityStats from "./home/components/CommunityStats";
import UpcomingEvents from "./home/components/UpcomingEvents";
import FeaturedCourses from "./home/components/FeaturedCourses";
import JoinCommunity from "./home/components/JoinCommunity";
import { prisma } from "@/lib/prisma";
import type { EventItem, FeaturedCourse } from "./home/types";
import type { Article, ArticleCategory } from "./articles/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [dbEvents, dbCourses] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, isFeatured: true },
      orderBy: { date: "asc" },
      take: 3,
    }),
    prisma.course.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take: 3,
    }),
  ]);

  const featuredEvents: EventItem[] = dbEvents.map((e) => ({
    id: e.slug,
    title: e.title,
    category: e.category as EventItem["category"],
    cover: e.cover,
    date: e.date.toISOString().split("T")[0],
    location: e.location,
    link: e.link,
  }));

  const featuredCourses: FeaturedCourse[] = dbCourses.map((c) => ({
    id: c.slug,
    title: c.title,
    description: c.description,
    cover: c.cover,
    link: c.link,
    category: c.category,
  }));

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

// TODO: see the join community links, on head and footer