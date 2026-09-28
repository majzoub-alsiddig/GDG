// src/app/admin/(protected)/seasons/_components/SeasonManager.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type SeasonRow = {
  id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  memberCount: number;
};

type Props = {
  initialSeasons: SeasonRow[];
};

export default function SeasonManager({ initialSeasons }: Props) {
  const router = useRouter();
  const [seasons, setSeasons] = useState(initialSeasons);

  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState("0");
  const [newActive, setNewActive] = useState(false);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState("0");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/seasons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          order: Number(newOrder) || 0,
          isActive: newActive,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        season?: {
          id: string;
          name: string;
          slug: string;
          order: number;
          isActive: boolean;
        };
        error?: string;
      };
      if (!res.ok || !data.season) {
        throw new Error(data.error ?? "Create failed");
      }

      setSeasons((prev) => {
        // If the new one is active, flip the local view of the others too.
        const next = data.season!.isActive
          ? prev.map((s) => ({ ...s, isActive: false }))
          : prev;
        return [...next, { ...data.season!, memberCount: 0 }];
      });
      setNewName("");
      setNewOrder("0");
      setNewActive(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  function startEdit(s: SeasonRow) {
    setEditingId(s.id);
    setEditName(s.name);
    setEditOrder(String(s.order));
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
      const res = await fetch(`/api/admin/seasons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          order: Number(editOrder) || 0,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        season?: { id: string; name: string; slug: string; order: number };
        error?: string;
      };
      if (!res.ok || !data.season) {
        throw new Error(data.error ?? "Save failed");
      }
      setSeasons((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                name: data.season!.name,
                slug: data.season!.slug,
                order: data.season!.order,
              }
            : s
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

  async function setActive(id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/seasons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        season?: { id: string };
        error?: string;
      };
      if (!res.ok || !data.season) {
        throw new Error(data.error ?? "Failed");
      }
      // Single active: only this one is on now.
      setSeasons((prev) => prev.map((s) => ({ ...s, isActive: s.id === id })));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete season "${name}"?`)) return;
    setBusyId(id);
    setError(null);

    async function attempt(force: boolean) {
      const url = force
        ? `/api/admin/seasons/${id}?force=true`
        : `/api/admin/seasons/${id}`;
      const res = await fetch(url, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        requiresConfirm?: boolean;
      };
      return { res, data };
    }

    try {
      let { res, data } = await attempt(false);

      // Two-step: API tells us why it blocked; user confirms; retry with force.
      if (res.status === 409 && data.requiresConfirm) {
        const ok = confirm(`${data.error}\n\nContinue?`);
        if (!ok) {
          setBusyId(null);
          return;
        }
        ({ res, data } = await attempt(true));
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Delete failed");
      }

      setSeasons((prev) => prev.filter((s) => s.id !== id));
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
          Seasons
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Seasons group team members by academic year. The active season is shown
          by default on the public team page.
        </p>
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
        className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_110px_auto_auto] sm:items-end sm:p-5"
      >
        <div>
          <label
            htmlFor="new-season-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            New season
          </label>
          <input
            id="new-season-name"
            type="text"
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. 2026/2027"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="new-season-order"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Order
          </label>
          <input
            id="new-season-order"
            type="number"
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 sm:pb-3">
          <input
            type="checkbox"
            checked={newActive}
            onChange={(e) => setNewActive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Set active
        </label>
        <button
          type="submit"
          disabled={creating || !newName.trim()}
          className="h-[46px] shrink-0 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {creating ? "Adding…" : "Add season"}
        </button>
      </form>

      <div className="mt-8">
        {seasons.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-base font-bold text-gray-900">
              No seasons yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Add your first season above.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {seasons.map((s) => {
              const isEditing = editingId === s.id;
              const isBusy = busyId === s.id;

              return (
                <li
                  key={s.id}
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
                          onClick={() => saveEdit(s.id)}
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
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900">
                            {s.name}
                          </h3>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                            #{s.order}
                          </span>
                          {s.isActive && (
                            <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#34A853]">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-gray-400">
                          /{s.slug}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {s.memberCount} member{s.memberCount === 1 ? "" : "s"}
                        </span>
                        {!s.isActive && (
                          <button
                            type="button"
                            onClick={() => setActive(s.id)}
                            disabled={isBusy}
                            className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#1a73e8] transition-colors hover:bg-blue-50 disabled:opacity-50"
                          >
                            Set active
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => startEdit(s)}
                          disabled={isBusy}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.name)}
                          disabled={isBusy}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          {isBusy ? "Working…" : "Delete"}
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