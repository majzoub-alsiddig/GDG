// src/app/admin/_components/FormUI.tsx
"use client";

import { useDeferredValue, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import ArticleBody from "@/app/(Main)/articles/components/ArticleBody";

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20";

export function FormField({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function FormToggle({
  label,
  on,
  onChange,
  onLabel,
  offLabel,
  onClasses,
  onDot,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
  onLabel: string;
  offLabel: string;
  onClasses: string;
  onDot: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
          on ? onClasses : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <span>{on ? onLabel : offLabel}</span>
        <span
          className={`relative inline-block h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
            on ? onDot : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              on ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

type PreviewProps = {
  title: string;
  description: string;
  categoryName: string;
  cover: string;
  meta: React.ReactNode;
  content: JSONContent;
};

export function ContentPreviewPane({
  title,
  description,
  categoryName,
  cover,
  meta,
  content,
}: PreviewProps) {
  const [open, setOpen] = useState(false);
  const deferred = useDeferredValue(content);

  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors hover:bg-gray-100/60 sm:px-6 sm:py-5"
      >
        <div>
          <h2 className="text-base font-bold text-gray-900">Live preview</h2>
          <p className="mt-1 text-sm text-gray-500">
            How this will look on the public page.
          </p>
        </div>
        <span className="flex items-center gap-2">
          <span className="hidden rounded-full bg-[#1a73e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:inline">
            Live
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <div className="max-h-[80vh] overflow-y-auto rounded-xl border border-gray-200 bg-white p-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a73e8]">
              {categoryName}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl">
              {title || "Untitled"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              {description || "No description yet."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-gray-100 py-4 text-xs text-gray-500">
              {meta}
            </div>

            {cover && (
              <div className="mt-6 overflow-hidden rounded-xl bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt="Cover"
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8">
              <ArticleBody content={deferred} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
