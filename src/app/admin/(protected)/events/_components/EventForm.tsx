// src/app/admin/(protected)/events/_components/EventForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import ImageUpload from "@/app/admin/_components/ImageUpload";
import {
  ContentPreviewPane,
  FormField,
  FormToggle,
  inputClass,
} from "@/app/admin/_components/FormUI";
import { RichTextEditor } from "@/components/editor";

type CategoryOption = { id: string; name: string };

export type EventFormInitial = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: JSONContent;
  cover: string;
  categoryId: string;
  date: string; // datetime-local string: YYYY-MM-DDTHH:mm
  endDate: string; // datetime-local string, may be empty
  location: string;
  link: string;
  isFeatured: boolean;
  published: boolean;
};

type Props = {
  mode: "create" | "edit";
  initial: EventFormInitial;
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

export default function EventForm({ mode, initial, categories }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initial.title,
    slug: initial.slug,
    description: initial.description,
    cover: initial.cover,
    categoryId: initial.categoryId || categories[0]?.id || "",
    date: initial.date,
    endDate: initial.endDate,
    location: initial.location,
    link: initial.link,
    isFeatured: initial.isFeatured,
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
      setForm((prev) => ({
        ...prev,
        slug: auto,
        link: prev.link || (auto ? `/events/${auto}` : ""),
      }));
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
      cover: form.cover.trim(),
      categoryId: form.categoryId,
      date: form.date,
      endDate: form.endDate || null,
      location: form.location.trim(),
      link: form.link.trim(),
      isFeatured: form.isFeatured,
      published: form.published,
    };

    const url =
      mode === "create"
        ? "/api/admin/events"
        : `/api/admin/events/${initial.id}`;

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

      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  const categoryName =
    categories.find((c) => c.id === form.categoryId)?.name ?? "Event";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ============ METADATA ============ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-base font-bold text-gray-900">Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Basic information shown on the event card and header.
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
            <FormField label="Title *" id="field-title">
              <input
                id="field-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Slug *" id="field-slug">
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
            </FormField>
          </div>

          <FormField label="Description *" id="field-description">
            <textarea
              id="field-description"
              required
              rows={2}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Category *" id="field-category">
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
            </FormField>
            <FormField label="Location *" id="field-location">
              <input
                id="field-location"
                type="text"
                required
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Online or University of Khartoum"
                className={inputClass}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Starts at *" id="field-date">
              <input
                id="field-date"
                type="datetime-local"
                required
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField
              label="Ends at"
              id="field-endDate"
              hint="Optional. Leave blank for single-session events."
            >
              <input
                id="field-endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>

          <FormField
            label="Link *"
            id="field-link"
            hint="Where attendees go - an internal detail page (/events/your-slug) or an external registration URL."
          >
            <input
              id="field-link"
              type="text"
              required
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
              className={inputClass}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormToggle
              label="Featured"
              on={form.isFeatured}
              onChange={(v) => update("isFeatured", v)}
              onLabel="Featured"
              offLabel="Not featured"
              onClasses="border-amber-200 bg-amber-50 text-amber-800"
              onDot="bg-amber-500"
            />
            <FormToggle
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

      {/* ============ EDITOR ============ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Full description with headings, images, links, lists, and more.
          </p>
        </div>
        <RichTextEditor
          value={content}
          onChange={setContent}
          minHeight="480px"
        />
      </section>

      {/* ============ PREVIEW ============ */}
      <ContentPreviewPane
        title={form.title}
        description={form.description}
        categoryName={categoryName}
        cover={form.cover}
        meta={
          <>
            <span>{form.date || "Date"}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-300" />
            <span>{form.location || "Location"}</span>
          </>
        }
        content={content}
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
              ? "Create event"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}
