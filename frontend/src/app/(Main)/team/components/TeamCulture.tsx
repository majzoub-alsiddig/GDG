// app/team/components/TeamCulture.tsx
import { CodeIcon, LightbulbIcon, ShareIcon } from "@/components/icons";

const PILLARS = [
  {
    Icon: LightbulbIcon,
    title: "Learn",
    description:
      "Explore new technologies and expand your skills through curated resources and hands-on sessions.",
    accent: "text-[#4285F4]",
    ring: "ring-blue-100",
    bg: "bg-blue-50",
  },
  {
    Icon: CodeIcon,
    title: "Build",
    description:
      "Turn ideas into real projects with the support of a community that cares about your growth.",
    accent: "text-[#34A853]",
    ring: "ring-green-100",
    bg: "bg-green-50",
  },
  {
    Icon: ShareIcon,
    title: "Share",
    description:
      "Teach, mentor, and grow together - because knowledge multiplies when it's shared.",
    accent: "text-[#EA4335]",
    ring: "ring-red-100",
    bg: "bg-red-50",
  },
];

export default function TeamCulture() {
  return (
    <section className="px-4 pb-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Our culture
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            More than a team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            We are a community built around learning, collaboration, and sharing
            technology.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {PILLARS.map(({ Icon, title, description, accent, ring, bg }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] sm:p-8"
            >
              <span
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring}`}
              >
                <Icon className={`h-6 w-6 ${accent}`} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}