// src/app/(Main)/articles/types.ts
import type { JSONContent } from "@tiptap/core";

export type Article = {
  id: string;
  title: string;
  description: string;
  content: JSONContent;
  author: string;
  authorRole?: string;
  createdAt: string;
  category: string;
  cover: string;
  readingTime: number;
  featured?: boolean;
};
