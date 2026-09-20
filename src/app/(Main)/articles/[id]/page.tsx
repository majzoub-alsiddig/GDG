import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ArticleCard from "../components/ArticleCard";
import { prisma } from "@/lib/prisma";
import type { Article, ArticleCategory } from "../types";
import {
  ArrowLeftIcon,
  ClockIcon,
  LinkedInIcon,
  LinkIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  const a = await prisma.article.findUnique({ where: { slug } });
  if (!a || !a.published) return null;
  return {
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
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleBySlug(id);
  if (!article) return {};
  return {
    title: `${article.title} - GDG UofK`,
    description: article.description,
  };
}

export default async function FullArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleBySlug(id);

  if (!article) {
    notFound();
  }

  const htmlContent = generateHTML(article.content, [StarterKit]);

  const relatedDb = await prisma.article.findMany({
    where: {
      published: true,
      category: article.category,
      NOT: { slug: article.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const related: Article[] = relatedDb.map((a) => ({
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

  const shareText = encodeURIComponent(article.title);
  const shareUrl = `https://gdguofk.club/articles/${article.id}`;

  // ... rest of the JSX is unchanged from your current file ...
  return (
    <main className="bg-white pb-20">
      {/* ... exactly the JSX you already have ... */}
    </main>
  );
}