// src/app/admin/(protected)/categories/_components/CategoryManager.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  order: number;
  count: number;
};

type Kind = "courses" | "articles" | "events";

type Props = {
  initialCourseCategories: CategoryRow[];
  initialArticleCategories: CategoryRow[];
  initialEventCategories: CategoryRow[];
};

export default function CategoryManager({
  initialCourseCategories,
  initialArticleCategories,
  initialEventCategories,
}: Props) {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>("courses");

  const endpoints = {
    courses: {
      base: "/api/admin/categories",
      itemLabel: "course",
      itemLabelPlural: "courses",
    },
    articles: {
      base: "/api/admin/article-categories",
      itemLabel: "article",
      itemLabelPlural: "articles",
    },
    events: {
      base: "/api/admin/event-categories",
      itemLabel: "event",
      itemLabelPlural: "events",
    },
  } as const;

  const [courseCategories, setCourseCategories] = useState(
    initialCourseCategories
  );
  const [articleCategories, setArticleCategories] = useState(
    initialArticleCategories
  );
  const [eventCategories, setEventCategories] = useState(
    initialEventCategories
  );

  const categories =
    kind === "courses"
      ? courseCategories
      : kind === "articles"
        ? articleCategories
        : eventCategories;

  const setCategories =
    kind === "courses"
      ? setCourseCategories
      : kind === "articles"
        ? setArticleCategories
        : setEventCategories;

  const endpoint = endpoints[kind];

  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState("0");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState("0");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const kindSingular =
    kind === "courses" ? "course" : kind === "articles" ? "article" : "event";

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setCreating(true);

    try {
      const res = await fetch(endpoint.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          order: Number(newOrder) || 0,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        category?: { id: string; name: string; slug: string; order: number };
        error?: string;
      };

      if (!res.ok || !data.category) {
        throw new Error(data.error ?? "Create failed");
      }

      setCategories((prev) => [...prev, { ...data.category!, count: 0 }]);
      setNewName("");
      setNewOrder("0");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  function startEdit(c: CategoryRow) {
    setEditingId(c.id);
    setEditName(c.name);
    setEditOrder(String(c.order));
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditOrder("0");
  }

  async function saveEdit(id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`${endpoint.base}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          order: Number(editOrder) || 0,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        category?: { id: string; name: string; slug: string; order: number };
        error?: string;
      };

      if (!res.ok || !data.category) {
        throw new Error(data.error ?? "Save failed");
      }

      setCategories((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                name: data.category!.name,
                slug: data.category!.slug,
                order: data.category!.order,
              }
            : c
        )
      );
      cancelEdit();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`${endpoint.base}/${id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Delete failed");
      setCategories((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          Content
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Categories
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Categories appear as filters on the public pages. Deleting a category
          that still has items is blocked - reassign them first.
        </p>
      </div>

      <div className="mt-6 inline-flex flex-wrap rounded-full border border-gray-200 bg-white p-1">
        {(["courses", "articles", "events"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setKind(k);
              cancelEdit();
              setError(null);
            }}
            aria-pressed={kind === k}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              kind === k
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {k === "courses"
              ? "Course categories"
              : k === "articles"
                ? "Article categories"
                : "Event categories"}
          </button>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleCreate}
        className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-end sm:gap-3 sm:p-5"
      >
        <div className="flex-1">
          <label
            htmlFor="new-cat-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            New {kindSingular} category
          </label>
          <input
            id="new-cat-name"
            type="text"
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Data Science"
            className={inputClass}
          />
        </div>
        <div className="w-full sm:w-24">
          <label
            htmlFor="new-cat-order"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Order
          </label>
          <input
            id="new-cat-order"
            type="number"
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={creating || !newName.trim()}
          className="h-[46px] shrink-0 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {creating ? "Adding…" : "Add category"}
        </button>
      </form>

      <div className="mt-8">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-base font-bold text-gray-900">
              No categories yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Add your first {kindSingular} category above.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {categories.map((c) => {
              const isEditing = editingId === c.id;
              const isBusy = busyId === c.id;

              return (
                <li
                  key={c.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                >
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={`${inputClass} flex-1`}
                        autoFocus
                      />
                      <input
                        type="number"
                        value={editOrder}
                        onChange={(e) => setEditOrder(e.target.value)}
                        className={`${inputClass} w-full sm:w-24`}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveEdit(c.id)}
                          disabled={isBusy}
                          className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                        >
                          {isBusy ? "Saving…" : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          disabled={isBusy}
                          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900">
                            {c.name}
                          </h3>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                            #{c.order}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-gray-400">
                          /{c.slug}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {c.count} {endpoint.itemLabel}
                          {c.count === 1 ? "" : "s"}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEdit(c)}
                          disabled={isBusy}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id, c.name)}
                          disabled={isBusy || c.count > 0}
                          title={
                            c.count > 0
                              ? `Reassign ${endpoint.itemLabelPlural} before deleting`
                              : "Delete category"
                          }
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {isBusy ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20";
