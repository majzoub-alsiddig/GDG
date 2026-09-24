// src/app/admin/(protected)/articles/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { prisma } from "@/lib/prisma";
import ArticleForm, {
  type ArticleFormInitial,
} from "../../_components/ArticleForm";
import { ArrowLeftIcon } from "@/components/icons";

type Params = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Params) {
  const { id } = await params;

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const categories = await prisma.articleCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true },
  });

  const initial: ArticleFormInitial = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    description: article.description,
    content: article.content as JSONContent,
    author: article.author,
    authorRole: article.authorRole ?? "",
    cover: article.cover,
    categoryId: article.categoryId,
    readingTime: article.readingTime,
    featured: article.featured,
    published: article.published,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-4 w-4" /> 
        Back to articles
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Edit article
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Editing: <span className="font-medium text-gray-700">{article.title}</span>
      </p>
      <div className="mt-8">
        <ArticleForm mode="edit" initial={initial} categories={categories} />
      </div>
    </div>
  );
}
