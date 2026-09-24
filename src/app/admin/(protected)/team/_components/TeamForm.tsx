"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TeamMember } from "@/generated/prisma/client";
import ImageUpload from "@/app/admin/_components/ImageUpload";

const CATEGORIES = ["Core", "Technical", "Media", "Managment"] as const;

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  member?: TeamMember;
};

type FormState = {
  name: string;
  role: string;
  about: string;
  photo: string;
  category: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  website: string;
  order: string;
};

function initialState(member?: TeamMember): FormState {
  return {
    name: member?.name ?? "",
    role: member?.role ?? "",
    about: member?.about ?? "",
    photo: member?.photo ?? "",
    category: member?.category ?? "Technical",
    github: member?.github ?? "",
    linkedin: member?.linkedin ?? "",
    instagram: member?.instagram ?? "",
    twitter: member?.twitter ?? "",
    website: member?.website ?? "",
    order: String(member?.order ?? 0),
  };
}

export default function TeamForm({ mode, member }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState(member));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      about: form.about.trim(),
      photo: form.photo.trim(),
      category: form.category,
      github: form.github.trim() || null,
      linkedin: form.linkedin.trim() || null,
      instagram: form.instagram.trim() || null,
      twitter: form.twitter.trim() || null,
      website: form.website.trim() || null,
      order: Number(form.order) || 0,
    };

    const url =
      mode === "create"
        ? "/api/admin/team"
        : `/api/admin/team/${member!.id}`;

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

      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo uploader */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Photo *
        </label>
        <ImageUpload
          value={form.photo}
          onChange={(url) => update("photo", url)}
        />
      </div>

      {/* Name + Role */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name *" id="field-name">
          <input
            id="field-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Role *" id="field-role">
          <input
            id="field-role"
            type="text"
            required
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Category + Order */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        <Field label="Sort order" id="field-order">
          <input
            id="field-order"
            type="number"
            value={form.order}
            onChange={(e) => update("order", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {/* About */}
      <Field label="About *" id="field-about">
        <textarea
          id="field-about"
          required
          rows={3}
          value={form.about}
          onChange={(e) => update("about", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Socials */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Social links
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="GitHub" id="field-github">
            <input
              id="field-github"
              type="url"
              value={form.github}
              onChange={(e) => update("github", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="LinkedIn" id="field-linkedin">
            <input
              id="field-linkedin"
              type="url"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Instagram" id="field-instagram">
            <input
              id="field-instagram"
              type="url"
              value={form.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="X / Twitter" id="field-twitter">
            <input
              id="field-twitter"
              type="url"
              value={form.twitter}
              onChange={(e) => update("twitter", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Website" id="field-website">
            <input
              id="field-website"
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputClass}
            />
          </Field>
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
              ? "Create member"
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