"use client";

import Link from "next/link";
import type { Article } from "../types";
import { ClockIcon } from "@/components/icons";
import { useTranslations, LOCALE_TAGS } from "@/i18n";

export default function ArticleCard({ article }: { article: Article }) {
  const { t, locale } = useTranslations();

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    LOCALE_TAGS[locale],
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-4"
    >
      {/* Cover - 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
        <img
          src={article.cover}
          alt={t("articles.card.coverAlt", { title: article.title })}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
          <span className="text-[#1a73e8]">{article.category}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="inline-flex items-center gap-1 text-gray-500">
            <ClockIcon className="h-3 w-3" />
            {t("articles.card.minRead", { minutes: article.readingTime })}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1a73e8] sm:text-[19px]">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {article.description}
        </p>

        <div className="mt-4 flex items-center gap-2 pt-3 text-xs text-gray-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
            {article.author[0]}
          </span>
          <span className="font-medium text-gray-700">{article.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
