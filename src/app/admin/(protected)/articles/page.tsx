// src/app/admin/(protected)/articles/page.tsx
import { prisma } from "@/lib/prisma";
import ArticleManager from "./_components/ArticleManager";

export default async function AdminArticlesPage() {
  const rows = await prisma.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const articles = rows.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    description: a.description,
    cover: a.cover,
    category: { id: a.category.id, name: a.category.name },
    author: a.author,
    authorRole: a.authorRole,
    readingTime: a.readingTime,
    featured: a.featured,
    published: a.published,
    createdAt: a.createdAt.toISOString(),
  }));

  return <ArticleManager initialArticles={articles} />;
}
