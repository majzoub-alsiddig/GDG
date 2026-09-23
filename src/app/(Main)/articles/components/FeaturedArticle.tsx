// src/app/(Main)/articles/components/FeaturedArticle.tsx
import Link from "next/link";
import type { Article } from "../types";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article>
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FBBC05]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B08000]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />
          Featured article
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
      </div>

      <Link
        href={`/articles/${article.id}`}
        className="group grid grid-cols-1 overflow-hidden rounded-3xl bg-gray-50 ring-1 ring-black/5 transition-all duration-300 ease-out hover:ring-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] lg:grid-cols-2"
      >
        {/* Cover */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 lg:aspect-auto lg:h-full lg:min-h-[380px]">
          <img
            src={article.cover}
            alt={`Cover image for ${article.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em]">
            <span className="text-[#1a73e8]">{article.category}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="inline-flex items-center gap-1 text-gray-500">
              <ClockIcon className="h-3 w-3" />
              {article.readingTime} min read
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {article.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {article.description}
          </p>

          <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
              {article.author[0]}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {article.author}
              </p>
              <p className="text-xs">
                {formatDate(article.createdAt)}
                {article.authorRole ? ` · ${article.authorRole}` : ""}
              </p>
            </div>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8]">
            Read article
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
