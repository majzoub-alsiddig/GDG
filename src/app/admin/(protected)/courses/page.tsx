// src/app/admin/(protected)/courses/page.tsx
import { prisma } from "@/lib/prisma";
import CourseManager from "./_components/CourseManager";

export default async function AdminCoursesPage() {
  const rows = await prisma.course.findMany({
    include: { category: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const courses = rows.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    cover: c.cover,
    link: c.link,
    order: c.order,
    published: c.published,
    category: { id: c.category.id, name: c.category.name },
  }));

  return <CourseManager initialCourses={courses} />;
}
