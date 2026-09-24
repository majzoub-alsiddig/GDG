// src/app/(Main)/events/components/EventDetailChrome.tsx
"use client";

import Link from "next/link";
import { ArrowLeftIcon, CalendarIcon, PinIcon } from "@/components/icons";
import { useTranslations, LOCALE_TAGS } from "@/i18n";

export default function EventDetailChrome({
  title,
  description,
  categoryName,
  date,
  location,
  cover,
}: {
  title: string;
  description: string;
  categoryName: string;
  date: string;
  location: string;
  cover: string;
}) {
  const { t, locale } = useTranslations();
  const tag = LOCALE_TAGS[locale];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(tag, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(tag, {
      hour: "numeric",
      minute: "2-digit",
    });

  const isPast = new Date(date).getTime() < Date.now();

  return (
    <>
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
        >
          <ArrowLeftIcon className="h-4 w-4 rtl:rotate-180" />
          {t("events.detail.breadcrumb")}
        </Link>
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
          <span className="text-[#1a73e8]">{categoryName}</span>
          {isPast && (
            <>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-gray-300"
              />
              <span className="text-gray-400">
                {t("events.detail.pastEvent")}
              </span>
            </>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
          {description}
        </p>

        {/* Meta bar */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-gray-100 py-5 text-sm">
          <span className="inline-flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            {formatDate(date)} · {formatTime(date)}
          </span>
          <span className="inline-flex items-center gap-2 text-gray-600">
            <PinIcon className="h-4 w-4 text-gray-400" />
            {location}
          </span>
        </div>
      </header>

      {/* COVER */}
      <figure className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
          <img
            src={cover}
            alt={t("events.detail.coverAlt", { title })}
            className="h-full w-full object-cover"
          />
        </div>
      </figure>
    </>
  );
}
