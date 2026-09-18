// components/Footer.tsx
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  WhatsAppIcon,
  TikTokIcon,
  MailIcon,
} from "./icons";

type IconProps = { className?: string };

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Courses", href: "/courses" },
  { label: "Articles", href: "/articles" },
  { label: "FAQ", href: "/faq" },
] as const;

const COMMUNITY_LINKS = [
  { label: "Meet the Team", href: "/team" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Contact us", href: "/contact" },
] as const;

type SocialLink = {
  label: string;
  href: string;
  Icon: (props: IconProps) => React.ReactElement;
};

// NOTE: TikTok href is a placeholder. Replace with the real TikTok URL
// or remove the entry from SOCIAL_LINKS entirely.
const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/gdg_uofk", Icon: InstagramIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/google-developer-student-clubs-university-of-khartoum/",
    Icon: LinkedInIcon,
  },
  { label: "Facebook", href: "https://www.facebook.com/GDGUofK", Icon: FacebookIcon },
  { label: "X", href: "https://x.com/GDG_UofK", Icon: XIcon },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029Vb77fOH002T8HKROP32H",
    Icon: WhatsAppIcon,
  },
  { label: "TikTok", href: "#", Icon: TikTokIcon }, // TODO
];

const EMAIL = "contact@gdguofk.club";

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600">
      {/* ---------- Main footer ---------- */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-16">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
            >
              <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
              </span>
              <span className="text-[15px] font-bold tracking-tight text-gray-900">
                GDG <span className="font-medium text-gray-500">UofK</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 md:mt-5 md:max-w-xs">
              A student-driven community at the University of Khartoum where
              developers, designers, and tech enthusiasts learn, build, and
              connect.
            </p>
          </div>

          {/* Explore — centered flex row on mobile, vertical list on desktop */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Explore
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community — same pattern */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Community
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — icons centered on mobile, vertical list on desktop */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Connect
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow GDG UofK on ${label}`}
                    className="group inline-flex items-center gap-3 rounded-full text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] md:pr-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors group-hover:bg-gray-200 group-hover:text-gray-900 md:h-8 md:w-8">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="hidden md:inline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Email — centered on mobile, left-aligned on desktop */}
            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 rounded text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] md:mt-4"
            >
              <MailIcon className="h-4 w-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GDG University of Khartoum
          </p>
          <p className="text-xs font-medium tracking-[0.14em] text-gray-400 uppercase">
            Learn. Build. Connect.
          </p>
        </div>
      </div>
    </footer>
  );
}