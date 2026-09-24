import Link from "next/link";
import { PenIcon, CalendarIcon, BookOpenIcon, UsersIcon, ArrowRightIcon } from "@/components/icons"
import { getCurrentAdmin } from "@/lib/admin-auth";

const SECTIONS = [
  {
    title: "Admins",
    description: "Manage who can sign in and edit content.",
    href: "/admin/admins",
    accent: "text-[#EA4335]",
    bg: "bg-red-50",
    ring: "ring-red-100",
    Icon: UsersIcon,
    stat: "Manage access",
  },
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

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  const firstName = admin?.name.split(" ")[0] ?? "Admin";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome back, {firstName}
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