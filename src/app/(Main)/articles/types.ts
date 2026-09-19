// app/articles/types.ts
import type { JSONContent } from "@tiptap/core";

export type ArticleCategory =
  | "Web Dev"
  | "Mobile"
  | "AI/ML"
  | "Cloud"
  | "DevOps"
  | "Events";

export type Article = {
  id: string;
  title: string;
  description: string;
  content: JSONContent;
  author: string;
  authorRole?: string;
  createdAt: string;
  category: ArticleCategory;
  cover: string;
  readingTime: number;
  featured?: boolean;
};