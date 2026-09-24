// src/app/admin/(protected)/admins/_components/AdminForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FormField,
  FormToggle,
  inputClass,
} from "@/app/admin/_components/FormUI";

export type AdminFormInitial = {
  id?: string;
  username: string;
  name: string;
  active: boolean;
  isSelf: boolean;
};

type Props = {
  mode: "create" | "edit";
  initial: AdminFormInitial;
};

export default function AdminForm({ mode, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    username: initial.username,
    name: initial.name,
    password: "",
    confirmPassword: "",
    active: initial.active,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (form.password || form.confirmPassword) {
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setSaving(true);

    const payload: Record<string, unknown> = {
      username: form.username.trim(),
      name: form.name.trim(),
      active: form.active,
    };

    if (form.password) payload.password = form.password;

    const url =
      mode === "create"
        ? "/api/admin/admins"
        : `/api/admin/admins/${initial.id}`;

    try {
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Save failed");
      }

      router.push("/admin/admins");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-base font-bold text-gray-900">Account</h2>
        <p className="mt-1 text-sm text-gray-500">
          {mode === "create"
            ? "Create a new admin account."
            : "Update this admin's details. Leave password fields empty to keep the current password."}
        </p>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Name *" id="field-name">
              <input
                id="field-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Username *" id="field-username">
              <input
                id="field-username"
                type="text"
                required
                autoComplete="off"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                className={`${inputClass} font-mono text-sm`}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label={mode === "create" ? "Password *" : "New password"}
              id="field-password"
              hint={
                mode === "create"
                  ? "Minimum 6 characters."
                  : "Leave empty to keep the current password."
              }
            >
              <input
                id="field-password"
                type="password"
                autoComplete="new-password"
                required={mode === "create"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Confirm password" id="field-confirm">
              <input
                id="field-confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>

          {initial.isSelf ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              You can't deactivate or delete your own account.
            </div>
          ) : (
            <FormToggle
              label="Status"
              on={form.active}
              onChange={(v) => update("active", v)}
              onLabel="Active"
              offLabel="Inactive"
              onClasses="border-green-200 bg-green-50 text-green-800"
              onDot="bg-green-500"
            />
          )}
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

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
              ? "Create admin"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}
