// app/articles/components/ContributeCTA.tsx
import { ArrowRightIcon, PenIcon } from "./icons";

export default function ContributeCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
            <span className="flex-1 bg-[#4285F4]" />
            <span className="flex-1 bg-[#EA4335]" />
            <span className="flex-1 bg-[#FBBC05]" />
            <span className="flex-1 bg-[#34A853]" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#4285F4]/20 blur-3xl"
          />

          <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <PenIcon className="h-6 w-6" />
          </span>

          <h2 className="relative mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Have something to share?
          </h2>

          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Write about a project, a technology you&rsquo;ve learned, or
            something you discovered along the way. GDG UofK is built by its
            community — and that includes you.
          </p>

          <div className="relative mt-9">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Share your knowledge
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}