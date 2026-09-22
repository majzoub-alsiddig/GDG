// src/app/admin/(protected)/courses/new/page.tsx
import Link from "next/link";
import CourseForm from "../_components/CourseForm";

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to courses
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Add course
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Changes appear on the public courses page immediately after saving.
      </p>
      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
