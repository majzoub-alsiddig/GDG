"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Article, ArticleCategory } from "../types";

const ALL = "All" as const;
export type CategoryFilter = typeof ALL | ArticleCategory;

type DbArticle = {
  slug: string;
  title: string;
  description: string;
  content: unknown;
  author: string;
  authorRole: string | null;
  cover: string;
  category: string;
  readingTime: number;
  featured: boolean;
  createdAt: string;
};

function mapDbArticle(a: DbArticle): Article {
  return {
    id: a.slug,
    title: a.title,
    description: a.description,
    content: a.content as Article["content"],
    author: a.author,
    authorRole: a.authorRole ?? undefined,
    createdAt: a.createdAt.split("T")[0],
    category: a.category as ArticleCategory,
    cover: a.cover,
    readingTime: a.readingTime,
    featured: a.featured,
  };
}

type Options = {
  initialArticles: Article[];
  debounceMs?: number;
};

export function useArticlesSearch({
  initialArticles,
  debounceMs = 300,
}: Options) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(ALL);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  // Sync when the server sends fresh props (e.g. after a router.refresh)
  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  useEffect(() => {
    // Skip the first render — initialArticles already covers it
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category !== ALL) params.set("category", category);

      setIsLoading(true);
      setError(null);

      fetch(`/api/articles?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch articles");
          return res.json() as Promise<DbArticle[]>;
        })
        .then((data) => {
          setArticles(data.map(mapDbArticle));
        })
        .catch((err: unknown) => {
          if (err instanceof Error && err.name === "AbortError") return;
          setError("Couldn't load articles. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, category, debounceMs]);

  const clearSearch = useCallback(() => setQuery(""), []);

  return {
    articles,
    query,
    setQuery,
    clearSearch,
    category,
    setCategory,
    isLoading,
    error,
  };
}