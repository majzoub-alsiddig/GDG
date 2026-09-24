// src/app/admin/(protected)/articles/new/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleForm, { type ArticleFormInitial } from "../_components/ArticleForm";
import { ArrowRightIcon, ArrowLeftIcon } from "@/components/icons";

export default async function NewArticlePage() {
  const categories = await prisma.articleCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true },
  });

  const initial: ArticleFormInitial = {
    title: "",
    slug: "",
    description: "",
    content: { type: "doc", content: [{ type: "paragraph" }] },
    author: "",
    authorRole: "",
    cover: "",
    categoryId: categories[0]?.id ?? "",
    readingTime: 5,
    featured: false,
    published: true,
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
        Add article
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Fill in the details and write the content. Open the preview panel to
        check how the article will appear.
      </p>

      {categories.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          You need at least one article category before creating an article.{" "}
          <Link
            href="/admin/categories"
            className="font-semibold underline hover:no-underline"
          >
            Add a category <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ArticleForm mode="create" initial={initial} categories={categories} />
        </div>
      )}
    </div>
  );
}
