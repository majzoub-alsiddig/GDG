// src/app/admin/(protected)/categories/page.tsx
import { prisma } from "@/lib/prisma";
import CategoryManager, {
  type CategoryRow,
} from "./_components/CategoryManager";

export default async function AdminCategoriesPage() {
  const [courseCats, articleCats, eventCats] = await Promise.all([
    prisma.courseCategory.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { courses: true } } },
    }),
    prisma.articleCategory.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { articles: true } } },
    }),
    prisma.eventCategory.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { events: true } } },
    }),
  ]);

  const courseCategories: CategoryRow[] = courseCats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    order: c.order,
    count: c._count.courses,
  }));

  const articleCategories: CategoryRow[] = articleCats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    order: c.order,
    count: c._count.articles,
  }));

  const eventCategories: CategoryRow[] = eventCats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    order: c.order,
    count: c._count.events,
  }));

  return (
    <CategoryManager
      initialCourseCategories={courseCategories}
      initialArticleCategories={articleCategories}
      initialEventCategories={eventCategories}
    />
  );
}
