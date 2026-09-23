// src/app/admin/(protected)/articles/_components/ArticleManager.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminArticleRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  category: { id: string; name: string };
  author: string;
  authorRole: string | null;
  readingTime: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
};

type Props = { initialArticles: AdminArticleRow[] };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleManager({ initialArticles }: Props) {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setArticles((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Articles
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Changes are published to the public articles page immediately.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/categories"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Manage categories
          </Link>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            + Add article
          </Link>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {articles.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center">
          <h3 className="text-lg font-bold text-gray-900">No articles yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Click &ldquo;Add article&rdquo; to create the first one.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li
              key={a.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {a.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No cover
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                  {a.category.name}
                </span>
                <div className="absolute right-3 top-3 flex items-center gap-1">
                  {a.featured && (
                    <span className="rounded-full bg-[#FBBC05] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Featured
                    </span>
                  )}
                  {!a.published && (
                    <span className="rounded-full bg-gray-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Draft
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-gray-900">
                  {a.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-gray-400">
                  /{a.slug}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {a.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">
                    {a.author}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{a.readingTime} min read</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatDate(a.createdAt)}</span>
                </div>

                <div className="mt-4 flex items-center justify-end gap-1 border-t border-gray-100 pt-3">
                  <Link
                    href={`/admin/articles/${a.id}/edit`}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id, a.title)}
                    disabled={busyId === a.id}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    {busyId === a.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
