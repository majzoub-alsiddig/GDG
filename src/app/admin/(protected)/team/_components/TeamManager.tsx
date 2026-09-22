// src/app/admin/(protected)/team/_components/TeamManager.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TeamMember } from "@/generated/prisma/client";

type Props = { initialMembers: TeamMember[] };

export default function TeamManager({ initialMembers }: Props) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMembers((prev) => prev.filter((m) => m.id !== id));
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Team Members
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Changes are published to the public team page immediately.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          + Add member
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Empty */}
      {members.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center">
          <h3 className="text-lg font-bold text-gray-900">No team members yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Click &ldquo;Add member&rdquo; to create the first one.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li
              key={m.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No photo
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                  {m.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-gray-900">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#1a73e8]">
                  {m.role}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {m.about}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400">#{m.order}</span>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/team/${m.id}/edit`}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(m.id, m.name)}
                      disabled={busyId === m.id}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      {busyId === m.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}