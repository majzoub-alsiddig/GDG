// src/app/(Main)/courses/page.tsx
import CoursesHero from "./components/CoursesHero";
import CoursesIntroduction from "./components/CoursesIntroduction";
import CoursesSection from "./components/CoursesSection";
import LearningCTA from "./components/LearningCTA";
import { prisma } from "@/lib/prisma";
import type { Course } from "./types";

export const dynamic = "force-dynamic";

const Courses = async () => {
  const rows = await prisma.course.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const courses: Course[] = rows.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    cover: c.cover,
    link: c.link,
    category: c.category.name,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <CoursesHero />
        {/* <CoursesIntroduction /> Restore if you need it or want*/}
        <CoursesSection courses={courses} />
        {/* <LearningCTA /> Restore if you need it or want*/}
      </main>
    </div>
  );
};

export default Courses;
