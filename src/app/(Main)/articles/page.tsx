// src/app/(Main)/articles/page.tsx
import type { Metadata } from "next";
import ArticlesExplorer from "./components/ArticlesExplorer";
import ContributeCTA from "./components/ContributeCTA";
import { prisma } from "@/lib/prisma";
import type { Article } from "./types";
import type { JSONContent } from "@tiptap/core";

export const metadata: Metadata = {
  title: "Articles - GDG UofK",
  description:
    "Technical tutorials, community stories, project insights, and practical knowledge from the GDG UofK community.",
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const dbArticles = await prisma.article.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const articles: Article[] = dbArticles.map((a) => ({
    id: a.slug,
    title: a.title,
    description: a.description,
    content: a.content as JSONContent,
    author: a.author,
    authorRole: a.authorRole ?? undefined,
    createdAt: a.createdAt.toISOString().split("T")[0],
    category: a.category.name,
    cover: a.cover,
    readingTime: a.readingTime,
    featured: a.featured,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <ArticlesExplorer articles={articles} />
        <ContributeCTA />
      </main>
    </div>
  );
}
