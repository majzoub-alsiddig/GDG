// src/app/(Main)/articles/hooks/use-articles-search.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "../types";

const ALL = "All" as const;
export type CategoryFilter = typeof ALL | string;

type UseArticlesSearchArgs = {
  initialArticles: Article[];
};

type UseArticlesSearchResult = {
  articles: Article[];
  query: string;
  setQuery: (q: string) => void;
  clearSearch: () => void;
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  isLoading: boolean;
  error: string | null;
};

export function useArticlesSearch({
  initialArticles,
}: UseArticlesSearchArgs): UseArticlesSearchResult {
  const [query, setQueryState] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(ALL);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runFilter = useCallback(
    (q: string, cat: CategoryFilter) => {
      setIsLoading(true);
      setError(null);

      // Simulated client-side filter — swap for a fetch() later if you
      // move to server-side search.
      try {
        const trimmed = q.trim().toLowerCase();
        const next = initialArticles.filter((a) => {
          if (cat !== ALL && a.category !== cat) return false;
          if (trimmed.length === 0) return true;
          const haystack =
            `${a.title} ${a.description} ${a.author} ${a.category}`.toLowerCase();
          return haystack.includes(trimmed);
        });
        setArticles(next);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [initialArticles]
  );

  // Debounce the filter when the query or category changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runFilter(query, category);
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, category, runFilter]);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
  }, []);

  const clearSearch = useCallback(() => {
    setQueryState("");
  }, []);

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
