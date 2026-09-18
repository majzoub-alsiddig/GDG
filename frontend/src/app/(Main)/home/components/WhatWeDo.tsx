// app/home/components/WhatWeDo.tsx
import { ArrowRightIcon, BookIcon, CodeIcon, UsersIcon } from "@/components/icons";

const PILLARS = [
  {
    Icon: BookIcon,
    title: "Learn",
    description:
      "Explore courses, workshops, talks, and practical resources built for students.",
    cta: "Explore courses",
    href: "/courses",
    accent: "text-[#4285F4]",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
  },
  {
    Icon: CodeIcon,
    title: "Build",
    description:
      "Turn knowledge into real projects through challenges, hackathons, and collaboration.",
    cta: "See activities",
    href: "/events",
    accent: "text-[#34A853]",
    bg: "bg-green-50",
    ring: "ring-green-100",
  },
  {
    Icon: UsersIcon,
    title: "Connect",
    description:
      "Meet developers, speakers, and people who share your passion for technology.",
    cta: "Meet the team",
    href: "/team",
    accent: "text-[#EA4335]",
    bg: "bg-red-50",
    ring: "ring-red-100",
  },
];

export default function WhatWeDo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          What we do
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          More than a club
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Three things shape everything we do at GDG UofK.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {PILLARS.map(({ Icon, title, description, cta, href, accent, bg, ring }) => (
          <a
            key={title}
            href={href}
            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 sm:p-8"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring}`}
            >
              <Icon className={`h-6 w-6 ${accent}`} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#1a73e8]">
              {cta}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}