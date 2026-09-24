import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#34A853]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EA4335]/5 blur-3xl" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)", backgroundSize: "32px 32px", }} />

      <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-20 lg:px-8 lg:pt-24 lg:pb-24">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-600 shadow-sm">GDG University of Khartoum</span>
        </div>

        <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Learn.<span className="text-[#4285F4]"> Build.</span><span className="text-[#EA4335]"> Connect.</span>
        </h1>

        <span aria-hidden="true" className="mx-auto mt-8 block h-1 w-28 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]" />

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl"> A student-led developer community at the University of Khartoum - exploring Google technologies, building real projects, and growing together.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="/events" className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
            Explore events
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="/team" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2">
            Join the community {/** TODO: add community link*/}
          </a>
        </div>

      </div>
    </section>
  );
}