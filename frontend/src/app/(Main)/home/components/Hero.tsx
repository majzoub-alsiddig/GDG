// app/home/components/Hero.tsx
import Image from "next/image";
import heroImage from "@/../assets/cover.jpg";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

function GDGMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 44" className={className} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <rect x="-5.5" y="-5.5" width="28" height="11" rx="5.5" fill="#EA4335" transform="translate(15, 22) rotate(-40)" />
        <rect x="-5.5" y="-5.5" width="28" height="11" rx="5.5" fill="#4285F4" transform="translate(15, 22) rotate(40)" />

        <rect x="-22.5" y="-5.5" width="28" height="11" rx="5.5" fill="#FBBC05" transform="translate(57, 22) rotate(-40)" />
        <rect x="-22.5" y="-5.5" width="28" height="11" rx="5.5" fill="#34A853" transform="translate(57, 22) rotate(40)" />
      </g>
    </svg>
  );
}


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft tinted background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-[#4285F4]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#34A853]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20 lg:pb-24">
        {/* Text column */}
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-600 shadow-sm">
            GDG University of Khartoum
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[56px]">
            Learn.
            <span className="text-[#4285F4]"> Build.</span>
            <span className="text-[#EA4335]"> Connect.</span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-6 block h-1 w-24 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
          />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            A student-led developer community at the University of Khartoum -
            exploring Google technologies, building real projects, and growing
            together.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              Explore events
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="/team"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
            >
              Join the community
            </a>
          </div>

          {/* Small trust line */}
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
            Active since 2021 · 200+ events
          </p>
        </div>

        {/* Image column */}
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:aspect-[5/4]">
              <Image
                src={heroImage}
                alt="GDG UofK students collaborating at a community workshop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle vignette for depth */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge - Google colour accent */}
            <div className="absolute -bottom-4 left-4 hidden rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <GDGMark className="h-6 w-auto" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Student-led community
                  </p>
                  <p className="text-[11px] text-gray-500">University of Khartoum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}