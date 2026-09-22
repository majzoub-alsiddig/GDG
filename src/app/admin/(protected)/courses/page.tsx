// src/app/admin/(protected)/courses/page.tsx
import { prisma } from "@/lib/prisma";
import CourseManager from "./_components/CourseManager";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <CourseManager initialCourses={courses} />;
}
