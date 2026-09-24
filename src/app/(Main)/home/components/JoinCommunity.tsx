// app/home/components/JoinCommunity.tsx
import { ArrowRightIcon } from "@/components/icons";

export default function JoinCommunity() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          {/* Google-colour top rule */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
            <span className="flex-1 bg-[#4285F4]" />
            <span className="flex-1 bg-[#EA4335]" />
            <span className="flex-1 bg-[#FBBC05]" />
            <span className="flex-1 bg-[#34A853]" />
          </div>

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#4285F4]/20 blur-3xl"
          />

          <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready to build with us?
          </h2>

          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Learn something new. Meet people who care about the same things.
            Build something meaningful together.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/team"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Join the community
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Explore events {/* TODO: add the communty link*/}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}