// src/app/(Main)/courses/components/CoursesSection.tsx
"use client";

import { useMemo, useState } from "react";
import type { Course } from "../types";
import CourseCard from "./CourseCard";
import CoursesEmptyState from "./CoursesEmptyState";
import CoursesSkeleton from "./CoursesSkeleton";
import { useTranslations } from "@/i18n";

type Props = {
  courses: Course[];
  loading?: boolean;
};

// Internal sentinel - never displayed, so a real DB category named "All" can't collide.
const ALL = "__ALL__";

export default function CoursesSection({ courses, loading = false }: Props) {
  const { t } = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return unique.length > 1 ? [ALL, ...unique] : [];
  }, [courses]);

  const visibleCourses = useMemo(
    () =>
      activeCategory === ALL
        ? courses
        : courses.filter((c) => c.category === activeCategory),
    [courses, activeCategory]
  );

  const count = visibleCourses.length;
  const countLabel =
    count === 1
      ? t("courses.section.courseCount", { count })
      : t("courses.section.courseCountPlural", { count });

  return (
    <section
      id="courses"
      className="scroll-mt-24 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("courses.section.title")}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {t("courses.section.description")}
            </p>
          </div>

          {!loading && visibleCourses.length > 0 && (
            <p className="shrink-0 text-sm text-gray-500">{countLabel}</p>
          )}
        </div>

        {/* Filters - designed in, ready for scale */}
        {!loading && categories.length > 0 && (
          <div className="mt-8 -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="group"
              aria-label={t("courses.section.filterAriaLabel")}
              className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
            >
              {categories.map((category) => {
                const isActive = category === activeCategory;
                const label =
                  category === ALL ? t("courses.section.all") : category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                      isActive
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-10 sm:mt-12">
          {loading ? (
            <CoursesSkeleton />
          ) : visibleCourses.length === 0 ? (
            <CoursesEmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {visibleCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
