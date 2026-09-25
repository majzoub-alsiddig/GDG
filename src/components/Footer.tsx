// src/components/Footer.tsx
"use client";

import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  WhatsAppIcon,
  TikTokIcon,
  MailIcon,
  GDGMark,
} from "./icons";
import { useTranslations } from "@/i18n";

type IconProps = { className?: string };

const EXPLORE_LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.events", href: "/events" },
  { key: "nav.courses", href: "/courses" },
  { key: "nav.articles", href: "/articles" },
  { key: "nav.faq", href: "/faq" },
] as const;

const COMMUNITY_LINKS = [
  { key: "footer.meetTheTeam", href: "/team" },
  { key: "footer.upcomingEvents", href: "/events" },
  { key: "footer.contactUs", href: "/" },
] as const;

type SocialLink = {
  key: string;
  href: string;
  Icon: (props: IconProps) => React.ReactElement;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "footer.social.instagram",
    href: "https://www.instagram.com/gdg_uofk",
    Icon: InstagramIcon,
  },
  {
    key: "footer.social.linkedin",
    href: "https://www.linkedin.com/company/google-developer-student-clubs-university-of-khartoum/",
    Icon: LinkedInIcon,
  },
  {
    key: "footer.social.facebook",
    href: "https://www.facebook.com/GDGUofK",
    Icon: FacebookIcon,
  },
  { key: "footer.social.x", href: "https://x.com/GDG_UofK", Icon: XIcon },
  {
    key: "footer.social.whatsapp",
    href: "https://whatsapp.com/channel/0029Vb77fOH002T8HKROP32H",
    Icon: WhatsAppIcon,
  },
  { key: "footer.social.tiktok", href: "https://www.tiktok.com/@gdg.uofk", Icon: TikTokIcon },
];

const EMAIL = "contact@gdguofk.club";

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer
      id="pagefooter"
      className="border-t border-gray-200 bg-white text-gray-600"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-16">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
            >
              <GDGMark className="h-6 w-auto" />
              <span className="text-[15px] font-bold tracking-tight text-gray-900">
                GDG <span className="font-medium text-gray-500">UofK</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 md:mt-5 md:max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("footer.explore")}
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("footer.community")}
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("footer.connect")}
            </h3>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-5 md:mt-5 md:flex-col md:items-start md:gap-3">
              {SOCIAL_LINKS.map(({ key, href, Icon }) => {
                const label = t(key);
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("footer.follow", { platform: label })}
                      className="group inline-flex items-center gap-3 rounded-full text-sm text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] md:pe-3"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors group-hover:bg-gray-200 group-hover:text-gray-900 md:h-8 md:w-8">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="hidden md:inline">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

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

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-gray-500">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs font-medium tracking-[0.14em] text-gray-400 uppercase">
            {t("footer.signature")}
          </p>
        </div>
      </div>
    </footer>
  );
}
