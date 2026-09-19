// app/team/components/TeamHero.tsx
import coverImg from "@/../assets/contact-cover.jpg";
import { ArrowRightIcon, UsersIcon } from "@/components/icons";

export default function TeamHero() {
  return (
    <section className="relative isolate flex min-h-[320px] items-center overflow-hidden bg-gray-900 sm:min-h-[360px] lg:min-h-[400px]">
      {/* Background */}
      <img
        src={coverImg.src}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Softer overlay so the community image remains recognizable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.22),transparent_60%)]" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
            <UsersIcon className="h-3.5 w-3.5" />
            GDG UofK · Community
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Meet Our Team
          </h1>

          {/* Google-colour accent rule */}
          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
          />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
            The people behind GDG UofK - a community of developers, designers,
            organizers, and technology enthusiasts working together to create
            opportunities for students to learn and grow.
          </p>

          <div className="mt-8">
            <a
              href="#team"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Meet the team
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}