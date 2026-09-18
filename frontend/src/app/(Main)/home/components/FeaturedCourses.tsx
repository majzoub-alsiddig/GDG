// app/home/components/FeaturedCourses.tsx
import type { FeaturedCourse } from "../types";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import { BookIcon, PlayIcon } from "@/components/icons";

export default function FeaturedCourses({ courses }: { courses: FeaturedCourse[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <SectionHeader
        eyebrow="Keep learning"
        title="Featured courses"
        description="Explore courses and resources created to help you grow your technical skills."
        action={{ label: "Explore courses", href: "/courses" }}
      />

      <div className="mt-10 sm:mt-12">
        {courses.length === 0 ? (
          <EmptyState
            icon={<BookIcon className="h-6 w-6 text-[#1a73e8]" />}
            title="No courses yet"
            message="We're preparing new learning resources. Check back soon."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {courses.map((course) => (
              <a
                key={course.id}
                href={course.link}
                className="group flex flex-col rounded-2xl outline-none transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
                  <img
                    src={course.cover}
                    alt={`Cover image for ${course.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                    <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <PlayIcon className="h-4 w-4 translate-x-[1px] text-gray-900" />
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {course.category}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1a73e8] sm:text-[17px]">
                    {course.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {course.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}