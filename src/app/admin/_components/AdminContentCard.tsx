// src/app/admin/_components/AdminContentCard.tsx
"use client";

import Link from "next/link";

type Badge = { label: string; className: string };

type Props = {
  cover: string;
  title: string;
  slug: string;
  description: string | null;
  categoryLabel: string;
  topRightBadges?: Badge[];
  meta: React.ReactNode;
  footerLeft?: React.ReactNode;
  editHref: string;
  onDelete: () => void;
  deleting?: boolean;
};

export default function AdminContentCard({
  cover,
  title,
  slug,
  description,
  categoryLabel,
  topRightBadges = [],
  meta,
  footerLeft,
  editHref,
  onDelete,
  deleting = false,
}: Props) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No cover
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
          {categoryLabel}
        </span>
        {topRightBadges.length > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1">
            {topRightBadges.map((b) => (
              <span
                key={b.label}
                className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${b.className}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="mt-1 font-mono text-[11px] text-gray-400">/{slug}</p>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {meta}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <div className="text-xs text-gray-400">{footerLeft}</div>
          <div className="flex items-center gap-1">
            <Link
              href={editHref}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
