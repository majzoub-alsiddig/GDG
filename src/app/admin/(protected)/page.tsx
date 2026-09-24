import Link from "next/link";

type IconProps = { className?: string };

function PenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function BookOpenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 6.5C10.5 5 8.5 4 6 4H3v15h3c2.5 0 4.5 1 6 2.5 1.5-1.5 3.5-2.5 6-2.5h3V4h-3c-2.5 0-4.5 1-6 2.5Z" />
      <path d="M12 6.5V21.5" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M2 21v-1a5 5 0 0 1 5-5h2M22 21v-1a5 5 0 0 0-3-4.58M14 21v-1a5 5 0 0 1 3-4.58" />
    </svg>
  );
}

function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const SECTIONS = [
  {
    title: "Articles",
    description: "Write, edit, and publish community articles.",
    href: "/admin/articles",
    accent: "text-[#EA4335]",
    bg: "bg-red-50",
    ring: "ring-red-100",
    Icon: PenIcon,
    stat: "Manage posts",
  },
  {
    title: "Events",
    description: "Schedule workshops, talks, and study jams.",
    href: "/admin/events",
    accent: "text-[#4285F4]",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    Icon: CalendarIcon,
    stat: "Manage events",
  },
  {
    title: "Courses",
    description: "Manage learning resources and video courses.",
    href: "/admin/courses",
    accent: "text-[#34A853]",
    bg: "bg-green-50",
    ring: "ring-green-100",
    Icon: BookOpenIcon,
    stat: "Manage courses",
  },
  {
    title: "Team",
    description: "Update member profiles, roles, and socials.",
    href: "/admin/team",
    accent: "text-[#F9AB00]",
    bg: "bg-yellow-50",
    ring: "ring-yellow-100",
    Icon: UsersIcon,
    stat: "Manage members",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome back, Admin
        </h1>
        <p className="max-w-2xl text-sm text-gray-500 sm:text-base">
          Manage everything that appears on the public site - articles, events,
          courses, and team members - from one place.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map((section) => {
          const { Icon, title, description, href, accent, bg, ring, stat } =
            section;
          return (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring}`}
              >
                <Icon className={`h-6 w-6 ${accent}`} />
              </span>
              <h2 className="mt-5 text-lg font-bold text-gray-900">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{stat}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#1a73e8]">
                  Open
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}