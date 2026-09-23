"use client";

import { useMemo } from "react";
import type { Article } from "../types";
import {
  useArticlesSearch,
} from "../hooks/use-articles-search";
import ArticleCard from "./ArticleCard";
import ArticlesEmptyState from "./ArticlesEmptyState";
import ArticlesSkeleton from "./ArticlesSkeleton";
import { CloseIcon, SearchIcon } from "@/components/icons";


const ALL = "All" as const;

export default function ArticlesExplorer({
  articles: initialArticles,
}: {
  articles: Article[];
}) {
  const {
    articles,
    query,
    setQuery,
    clearSearch,
    category,
    setCategory,
    isLoading,
    error,
  } = useArticlesSearch({ initialArticles });

  const categories = useMemo(() => {
    const present = new Set(initialArticles.map((a) => a.category));
    if (present.size <= 1) return [];
    return [ALL, ...Array.from(present).sort()];
  }, [initialArticles]);

  const trimmedQuery = query.trim().toLowerCase();
  const isFiltering = trimmedQuery.length > 0 || category !== ALL;

  // Featured first, then the rest in their original order
  const gridArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      return fb - fa;
    });
  }, [articles]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-[#4285F4]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[56px]">
              Ideas, Tutorials
              <span className="text-[#1a73e8]"> &amp; Stories</span>
            </h1>

            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-1 w-20 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
            />

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Technical tutorials, community stories, project insights, and
              practical knowledge from the GDG UofK community.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-xl">
              <label htmlFor="articles-search" className="sr-only">
                Search articles
              </label>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="articles-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-11 pr-11 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-ms-clear]:hidden"
                />
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {isFiltering
                ? trimmedQuery
                  ? `Results for "${query}"`
                  : `${category} articles`
                : "Latest articles"}
            </h2>
            {isFiltering && !isLoading && (
              <p className="mt-2 text-sm text-gray-500">
                {articles.length} article{articles.length === 1 ? "" : "s"} found
              </p>
            )}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
            {error}
          </div>
        ) : isLoading ? (
          <ArticlesSkeleton />
        ) : gridArticles.length === 0 ? (
          <ArticlesEmptyState
            title={isFiltering ? "No articles found" : "No articles yet"}
            message={
              isFiltering
                ? "Try another keyword or explore a different category."
                : "We're preparing something interesting. Check back soon."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}