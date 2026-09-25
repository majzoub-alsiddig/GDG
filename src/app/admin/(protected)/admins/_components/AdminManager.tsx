// src/app/admin/(protected)/admins/_components/AdminManager.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminButton,
  AdminEmptyState,
  AdminErrorBanner,
  AdminPageHeader,
} from "@/app/admin/_components/AdminUI";

export type AdminRow = {
  id: string;
  username: string;
  name: string;
  active: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

type Props = {
  initialAdmins: AdminRow[];
  currentAdminId: string | null;
};

function formatDate(iso: string | null) {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminManager({
  initialAdmins,
  currentAdminId,
}: Props) {
  const router = useRouter();
  const [admins, setAdmins] = useState(initialAdmins);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete admin "${name}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Delete failed");
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <AdminPageHeader
        eyebrow="Access"
        title="Admins"
        description="People who can sign in and manage content. Changes take effect immediately."
      >
        <AdminButton href="/admin/admins/new">+ Add admin</AdminButton>
      </AdminPageHeader>

      <AdminErrorBanner message={error} />

      {admins.length === 0 ? (
        <AdminEmptyState
          title="No admins"
          message="Something's wrong - you should at least see yourself. Reload the page."
        />
      ) : (
        <ul className="mt-10 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {admins.map((a) => {
            const isYou = a.id === currentAdminId;
            const isBusy = busyId === a.id;
            const initial = (a.name || a.username)[0]?.toUpperCase() ?? "A";

            return (
              <li
                key={a.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {initial}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {a.name}
                    </h3>
                    {isYou && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1a73e8]">
                        You
                      </span>
                    )}
                    {!a.active && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-gray-400">
                    @{a.username}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">
                    Last signed in: {formatDate(a.lastLoginAt)} · Created{" "}
                    {formatDate(a.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/admins/${a.id}/edit`}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id, a.name)}
                    disabled={isBusy || isYou}
                    title={isYou ? "You cannot delete your own account" : "Delete admin"}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isBusy ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
