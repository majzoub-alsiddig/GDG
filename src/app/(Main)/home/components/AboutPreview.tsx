// app/home/components/AboutPreview.tsx
"use client";

import Image from "next/image";
import aboutImage from "@/../assets/cover.jpg";
import { ArrowRightIcon } from "@/components/icons";
import { useTranslations } from "@/i18n";

export default function AboutPreview() {
  const { t } = useTranslations();

  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-24">
        {/* Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <Image
              src={aboutImage}
              alt={t("about.preview.imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            {t("about.preview.eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {t("about.preview.title")}
          </h2>

          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
          />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("about.preview.body")}
          </p>

          <a
            href="/team"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
          >
            {t("about.preview.cta")}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
