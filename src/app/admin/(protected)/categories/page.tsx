// src/app/admin/(protected)/categories/page.tsx
import { prisma } from "@/lib/prisma";
import CategoryManager from "./_components/CategoryManager";

export default async function AdminCategoriesPage() {
  const rows = await prisma.courseCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { courses: true } } },
  });

  const categories = rows.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    order: c.order,
    courseCount: c._count.courses,
  }));

  return <CategoryManager initialCategories={categories} />;
}
