// src/app/admin/(protected)/articles/_components/ArticleForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import ImageUpload from "@/app/admin/_components/ImageUpload";
import ArticleBody from "@/app/(Main)/articles/components/ArticleBody";
import { RichTextEditor } from "@/components/editor";

type CategoryOption = { id: string; name: string };

export type ArticleFormInitial = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: JSONContent;
  author: string;
  authorRole: string;
  cover: string;
  categoryId: string;
  readingTime: number;
  featured: boolean;
  published: boolean;
};

type Props = {
  mode: "create" | "edit";
  initial: ArticleFormInitial;
  categories: CategoryOption[];
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ArticleForm({ mode, initial, categories }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initial.title,
    slug: initial.slug,
    description: initial.description,
    author: initial.author,
    authorRole: initial.authorRole,
    cover: initial.cover,
    categoryId: initial.categoryId || categories[0]?.id || "",
    readingTime: String(initial.readingTime),
    featured: initial.featured,
    published: initial.published,
  });

  const [content, setContent] = useState<JSONContent>(initial.content);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slugTouched) return;
    const auto = slugify(form.title);
    if (auto !== form.slug) {
      setForm((prev) => ({ ...prev, slug: auto }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, slugTouched]);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.slug || form.title),
      description: form.description.trim(),
      content,
      author: form.author.trim(),
      authorRole: form.authorRole.trim() || null,
      cover: form.cover.trim(),
      categoryId: form.categoryId,
      readingTime: Number(form.readingTime) || 5,
      featured: form.featured,
      published: form.published,
    };

    const url =
      mode === "create"
        ? "/api/admin/articles"
        : `/api/admin/articles/${initial.id}`;

    try {
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Save failed");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ============ METADATA ============ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-base font-bold text-gray-900">Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Basic information shown on cards and the article header.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Cover image *
            </label>
            <ImageUpload
              value={form.cover}
              onChange={(url) => update("cover", url)}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Title *" id="field-title">
              <input
                id="field-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Slug *" id="field-slug">
              <input
                id="field-slug"
                type="text"
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value);
                }}
                className={`${inputClass} font-mono text-xs`}
              />
            </Field>
          </div>

          <Field label="Description *" id="field-description">
            <textarea
              id="field-description"
              required
              rows={2}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Author *" id="field-author">
              <input
                id="field-author"
                type="text"
                required
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Author role" id="field-authorRole">
              <input
                id="field-authorRole"
                type="text"
                value={form.authorRole}
                onChange={(e) => update("authorRole", e.target.value)}
                placeholder="e.g. Community Contributor"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Category *" id="field-category">
              <select
                id="field-category"
                required
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
                className={inputClass}
              >
                {categories.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </Field>
            <Field label="Reading time (min)" id="field-readingTime">
              <input
                id="field-readingTime"
                type="number"
                min={1}
                value={form.readingTime}
                onChange={(e) => update("readingTime", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Toggle
              label="Featured"
              on={form.featured}
              onChange={(v) => update("featured", v)}
              onLabel="Featured"
              offLabel="Not featured"
              onClasses="border-amber-200 bg-amber-50 text-amber-800"
              onDot="bg-amber-500"
            />
            <Toggle
              label="Visibility"
              on={form.published}
              onChange={(v) => update("published", v)}
              onLabel="Published"
              offLabel="Draft"
              onClasses="border-green-200 bg-green-50 text-green-800"
              onDot="bg-green-500"
            />
          </div>
        </div>
      </section>

      {/* ============ EDITOR (full width) ============ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Rich text — add headings, images, videos, links, lists, and more.
          </p>
        </div>
        <RichTextEditor value={content} onChange={setContent} minHeight="480px" />
      </section>

      {/* ============ COLLAPSIBLE PREVIEW ============ */}
      <PreviewPane
        content={content}
        form={{
          title: form.title,
          description: form.description,
          categoryName:
            categories.find((c) => c.id === form.categoryId)?.name ?? "Category",
          cover: form.cover,
          author: form.author,
          authorRole: form.authorRole,
          readingTime: form.readingTime,
        }}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:px-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || categories.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Create article"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

/* ---------------- Preview pane ---------------- */

function PreviewPane({
  content,
  form,
}: {
  content: JSONContent;
  form: {
    title: string;
    description: string;
    categoryName: string;
    cover: string;
    author: string;
    authorRole: string;
    readingTime: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const deferredContent = useDeferredValue(content);

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
            How the article will look on the public page.
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
              {form.categoryName}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl">
              {form.title || "Untitled article"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              {form.description || "No description yet."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-gray-100 py-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                  {(form.author || "A")[0]}
                </span>
                <div className="leading-tight">
                  <p className="font-semibold text-gray-900">
                    {form.author || "Author"}
                  </p>
                  {form.authorRole && (
                    <p className="text-[11px] text-gray-500">
                      {form.authorRole}
                    </p>
                  )}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-gray-300"
              />
              <span>{form.readingTime || 5} min read</span>
            </div>

            {form.cover && (
              <div className="mt-6 overflow-hidden rounded-xl bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.cover}
                  alt="Cover"
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8">
              <ArticleBody content={deferredContent} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- helpers ---------------- */

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
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
    </div>
  );
}

function Toggle({
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