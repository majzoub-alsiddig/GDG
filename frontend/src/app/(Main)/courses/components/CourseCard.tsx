// app/courses/components/CourseCard.tsx
import type { Course } from "../types";
import { PlayIcon } from "./icons";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <a
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl outline-none transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-4"
    >
      {/* Thumbnail — always 16:9 for a consistent rhythm */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
        <img
          src={course.cover}
          alt={`Cover image for ${course.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Hover scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Play affordance (desktop hover) */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
          <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <PlayIcon className="h-5 w-5 translate-x-[1px] text-gray-900" />
          </span>
        </div>
      </div>

      {/* Meta */}
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

        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8]">
          <PlayIcon className="h-3 w-3" />
          Watch on YouTube
        </span>
      </div>
    </a>
  );
}