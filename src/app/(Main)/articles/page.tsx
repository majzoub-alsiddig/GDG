import type { Metadata } from "next";
import ArticlesExplorer from "./components/ArticlesExplorer";
import ContributeCTA from "./components/ContributeCTA";
import { prisma } from "@/lib/prisma";
import type { Article, ArticleCategory } from "./types";

export const metadata: Metadata = {
  title: "Articles - GDG UofK",
  description: "Technical tutorials, community stories, project insights, and practical knowledge from the GDG UofK community.",
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const dbArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const articles: Article[] = dbArticles.map((a) => ({
    id: a.slug,
    title: a.title,
    description: a.description,
    content: a.content as Article["content"],
    author: a.author,
    authorRole: a.authorRole ?? undefined,
    createdAt: a.createdAt.toISOString().split("T")[0],
    category: a.category as ArticleCategory,
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