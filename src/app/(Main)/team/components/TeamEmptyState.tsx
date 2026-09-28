// src/app/(Main)/team/components/TeamEmptyState.tsx
"use client";

import { UsersIcon } from "@/components/icons";
import { useTranslations } from "@/i18n";

type Props = {
  variant?: "default" | "season";
};

export default function TeamEmptyState({ variant = "default" }: Props) {
  const { t } = useTranslations();

  const title =
    variant === "season" ? t("team.empty.seasonTitle") : t("team.empty.title");
  const message =
    variant === "season"
      ? t("team.empty.seasonMessage")
      : t("team.empty.message");

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <UsersIcon className="h-6 w-6 text-[#1a73e8]" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        {message}
      </p>
    </div>
  );
}
