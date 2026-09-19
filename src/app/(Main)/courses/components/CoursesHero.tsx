// app/courses/components/CoursesHero.tsx
import coverImg from "@/../assets/cover.jpg";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";

export default function CoursesHero() {
  return (
    <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-gray-900 sm:min-h-[500px] lg:min-h-[560px]">
      {/* Background */}
      <img
        src={coverImg.src}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.25),transparent_60%)]" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
            GDG UofK · Learning
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Courses
          </h1>

          {/* Google-colour accent rule */}
          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
          />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg">
            Explore the courses and learning sessions created by our community
            to help students learn, build, and grow.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Browse courses
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/10 to-transparent"
      />
    </section>
  );
}