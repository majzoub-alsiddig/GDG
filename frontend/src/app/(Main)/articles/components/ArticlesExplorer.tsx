// app/articles/components/ArticlesExplorer.tsx
"use client";

import { useMemo, useState } from "react";
import type { Article, ArticleCategory } from "../types";
import ArticleCard from "./ArticleCard";
import ArticlesEmptyState from "./ArticlesEmptyState";
import { CloseIcon, SearchIcon } from "@/components/icons";

const ALL = "All" as const;

const CATEGORY_ORDER: ArticleCategory[] = [
  "Web Dev",
  "Mobile",
  "AI/ML",
  "Cloud",
  "DevOps",
  "Events",
];

export default function ArticlesExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<typeof ALL | ArticleCategory>(ALL);

  const categories = useMemo(() => {
    const present = new Set(articles.map((a) => a.category));
    if (present.size <= 1) return [];
    return [ALL, ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [articles]);

  const featured = useMemo(
    () => articles.find((a) => a.featured) ?? null,
    [articles]
  );

  const trimmedQuery = query.trim().toLowerCase();
  const isFiltering = trimmedQuery.length > 0 || activeCategory !== ALL;

  const visibleArticles = useMemo(() => {
    return articles.filter((a) => {
      if (activeCategory !== ALL && a.category !== activeCategory) return false;
      if (trimmedQuery.length > 0) {
        const haystack = `${a.title} ${a.description} ${a.author} ${a.category}`.toLowerCase();
        if (!haystack.includes(trimmedQuery)) return false;
      }
      return true;
    });
  }, [articles, activeCategory, trimmedQuery]);

  // When filtering, exclude the featured article from the grid to avoid duplication.
  const gridArticles = useMemo(() => {
    if (featured && !isFiltering) {
      return visibleArticles.filter((a) => a.id !== featured.id);
    }
    return visibleArticles;
  }, [visibleArticles, featured, isFiltering]);

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
                  className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-11 pr-11 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
                />
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
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

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="border-y border-gray-100 bg-gray-50/60">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="group"
                aria-label="Filter articles by category"
                className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
              >
                {categories.map((category) => {
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                        isActive
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {isFiltering
                ? trimmedQuery
                  ? `Results for “${query}”`
                  : `${activeCategory} articles`
                : "Latest articles"}
            </h2>
            {isFiltering && (
              <p className="mt-2 text-sm text-gray-500">
                {visibleArticles.length} article
                {visibleArticles.length === 1 ? "" : "s"} found
              </p>
            )}
          </div>
        </div>

        {gridArticles.length === 0 ? (
          <ArticlesEmptyState
            title={isFiltering ? "No articles found" : "No articles yet"}
            message={
              isFiltering
                ? "Try another keyword or explore a different category."
                : "We’re preparing something interesting. Check back soon."
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