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

  return (
    <main className="bg-white pb-20">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link  href="/articles"  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 rounded-md">
          <ArrowLeftIcon className="h-4 w-4" />
          All articles
        </Link>
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a73e8]">
          <span>{article.category}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
          {article.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-gray-100 py-5 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-[12px] font-bold text-white">
              {article.author[0]}
            </span>
            <div className="leading-tight">
              <p className="font-semibold text-gray-900">{article.author}</p>
              {article.authorRole && (
                <p className="text-xs text-gray-500">{article.authorRole}</p>
              )}
            </div>
          </div>
          <span aria-hidden="true" className="hidden h-4 w-px bg-gray-200 sm:block" />
          <span className="text-sm text-gray-500">
            {formatDate(article.createdAt)}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4" />
            {article.readingTime} min read
          </span>
        </div>
      </header>

      {/* COVER */}
      <figure className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
          <img src={article.cover} alt={`Cover image for ${article.title}`} className="h-full w-full object-cover"/>
        </div>
      </figure>

      {/* BODY */}
      <article className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-[#1a73e8] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-medium prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none" dangerouslySetInnerHTML={{ __html: htmlContent }}/>
      </article>

      {/* SHARE */}
      <div className="mx-auto mt-14 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 px-5 py-4">
          <span className="text-sm font-semibold text-gray-700">
            Share this article
          </span>
          <div className="ml-auto flex items-center gap-1">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-[#0a66c2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]">
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]">
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]">
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a href={shareUrl} aria-label="Copy link" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]">
              <LinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              You might also like
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}