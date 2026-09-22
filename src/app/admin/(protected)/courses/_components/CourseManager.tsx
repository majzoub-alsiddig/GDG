// src/app/admin/(protected)/courses/_components/CourseManager.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Course } from "@/generated/prisma/client";

type Props = { initialCourses: Course[] };

export default function CourseManager({ initialCourses }: Props) {
  const router = useRouter();
  const [courses, setCourses] = useState(initialCourses);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCourses((prev) => prev.filter((c) => c.id !== id));
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
            Courses
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Changes are published to the public courses page immediately.
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          + Add course
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

      {courses.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center">
          <h3 className="text-lg font-bold text-gray-900">No courses yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Click &ldquo;Add course&rdquo; to create the first one.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li
              key={c.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Cover */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {c.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.cover}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No cover
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                  {c.category}
                </span>
                {!c.published && (
                  <span className="absolute right-3 top-3 rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Draft
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-gray-900">{c.title}</h3>
                <p className="mt-1 font-mono text-[11px] text-gray-400">
                  /{c.slug}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {c.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400">#{c.order}</span>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/courses/${c.id}/edit`}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id, c.title)}
                      disabled={busyId === c.id}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      {busyId === c.id ? "Deleting…" : "Delete"}
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

