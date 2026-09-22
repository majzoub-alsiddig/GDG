// src/app/admin/(protected)/courses/_components/CourseForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Course } from "@/generated/prisma/client";
import ImageUpload from "@/app/admin/_components/ImageUpload";

const CATEGORIES = [
  "Web",
  "Android",
  "AI",
  "Flutter",
  "Google Workspace",
  "Career",
] as const;

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  course?: Course;
};

type FormState = {
  title: string;
  slug: string;
  description: string;
  cover: string;
  link: string;
  category: string;
  order: string;
  published: boolean;
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

function initialState(course?: Course): FormState {
  return {
    title: course?.title ?? "",
    slug: course?.slug ?? "",
    description: course?.description ?? "",
    cover: course?.cover ?? "",
    link: course?.link ?? "",
    category: course?.category ?? "Web",
    order: String(course?.order ?? 0),
    published: course?.published ?? true,
  };
}

export default function CourseForm({ mode, course }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState(course));
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-derive slug from title unless the user edited slug manually
  useEffect(() => {
    if (slugTouched) return;
    const auto = slugify(form.title);
    if (auto !== form.slug) {
      setForm((prev) => ({ ...prev, slug: auto }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, slugTouched]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
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
      cover: form.cover.trim(),
      link: form.link.trim(),
      category: form.category,
      order: Number(form.order) || 0,
      published: form.published,
    };

    const url =
      mode === "create"
        ? "/api/admin/courses"
        : `/api/admin/courses/${course!.id}`;

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

      router.push("/admin/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Cover image *
        </label>
        <ImageUpload
          value={form.cover}
          onChange={(url) => update("cover", url)}
        />
      </div>

      {/* Title + Slug */}
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
        <p className="mt-1.5 text-xs text-gray-400">
          Auto-generated from the title. Edit to override.
        </p>
      </Field>

      {/* Description */}
      <Field label="Description *" id="field-description">
        <textarea
          id="field-description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Link + Category */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Link (YouTube, etc.) *" id="field-link">
          <input
            id="field-link"
            type="url"
            required
            value={form.link}
            onChange={(e) => update("link", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Category *" id="field-category">
          <select
            id="field-category"
            required
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Order + Published */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Sort order" id="field-order">
          <input
            id="field-order"
            type="number"
            value={form.order}
            onChange={(e) => update("order", e.target.value)}
            className={inputClass}
          />
        </Field>

         <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Visibility
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={form.published}
            onClick={() => update("published", !form.published)}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              form.published
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-gray-200 bg-gray-50 text-gray-600"
            }`}
          >
            <span>{form.published ? "Published" : "Draft"}</span>

            {/* Track — inline-block + flex-shrink-0 so it can't be squashed */}
            <span
              className={`relative inline-block h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
                form.published ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {/* Knob — explicit left anchor + clean translate */}
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  form.published ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Create course"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

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
