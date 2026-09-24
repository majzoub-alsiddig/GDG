// src/app/(Main)/articles/components/ArticleBody.tsx
import { generateHTML } from "@tiptap/html";
import { renderExtensions } from "@/lib/tiptap-extensions";
import type { JSONContent } from "@tiptap/core";

type Props = {
  content: JSONContent;
  className?: string;
};

// TODO: events main image is stupid also 

export default function ArticleBody({ content, className = "" }: Props) {
  let html = "";
  try {
    html = generateHTML(content, renderExtensions);
  } catch {
    html = "<p>Unable to render this article.</p>";
  }

  return (
    <div
      className={
        "prose prose-lg prose-slate max-w-none " +
        "prose-headings:font-bold prose-headings:text-gray-900 " +
        "prose-a:text-[#1a73e8] prose-a:no-underline hover:prose-a:underline " +
        "prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 " +
        "prose-code:text-[0.9em] prose-code:font-medium prose-code:text-gray-800 " +
        "prose-code:before:content-none prose-code:after:content-none " +
        "article-content " +
        className
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
