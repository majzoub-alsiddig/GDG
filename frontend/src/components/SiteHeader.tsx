// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Logo mark — two chevron pairs, Google colours, bold outline       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Inline icons                                                      */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav config                                                        */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Events", href: "/events" },
  { label: "Courses", href: "/courses" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
];

const LANGUAGES = [
  { value: "en", label: "English", short: "EN" },
  { value: "ar", label: "العربية", short: "AR" },
] as const;

type Language = (typeof LANGUAGES)[number];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* --------------------------------------------------------------------  */
/*  LanguageDropdown                                                     */
/*                                                                       */
/*  • "inline" — desktop chip, dropdown opens absolutely (right-aligned) */
/*  • "block"  — mobile row, options expand INLINE in the flow so the    */
/*              parent's `overflow-hidden` animation doesn't clip them   */
/* --------------------------------------------------------------------  */

type DropdownProps = {
  idPrefix: string;
  variant?: "inline" | "block";
};

function LanguageDropdown({ idPrefix, variant = "inline" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Language>(LANGUAGES[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape — only needed for the floating (inline) variant.
  // The block variant renders options inline, so there's nothing to dismiss.
  useEffect(() => {
    if (!open || variant !== "inline") return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  const isBlock = variant === "block";

  return (
    <div ref={wrapperRef} className={`relative ${isBlock ? "w-full" : ""}`}>
      <button
        type="button"
        id={`${idPrefix}-trigger`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${idPrefix}-menu`}
        className={
          isBlock
            ? `flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-gray-700 transition-colors hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                open ? "border-[#1a73e8] ring-2 ring-[#1a73e8]/15" : ""
              }`
            : `inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                open ? "border-[#1a73e8] bg-blue-50/40 text-[#1a73e8]" : ""
              }`
        }
      >
        <GlobeIcon
          className={
            isBlock ? "h-4 w-4 text-gray-500" : "h-3.5 w-3.5 text-gray-500"
          }
        />
        <span className={open && !isBlock ? "text-[#1a73e8]" : ""}>
          {isBlock ? current.label : current.short}
        </span>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${
            isBlock ? "h-4 w-4 text-gray-500" : "h-3.5 w-3.5 text-gray-400"
          } ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ---------------- INLINE / DESKTOP — floating menu ---------------- */}
      {open && !isBlock && (
        <ul
          role="listbox"
          id={`${idPrefix}-menu`}
          aria-labelledby={`${idPrefix}-trigger`}
          className="absolute right-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.15)]"
        >
          {LANGUAGES.map((lang) => {
            const selected = lang.value === current.value;
            return (
              <li key={lang.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrent(lang);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:bg-gray-50 focus-visible:outline-none ${
                    selected
                      ? "bg-blue-50 font-semibold text-[#1a73e8]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="whitespace-nowrap">{lang.label}</span>
                  {selected && (
                    <CheckIcon className="h-4 w-4 shrink-0 text-[#1a73e8]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* ---------------- BLOCK / MOBILE — inline expanded list ---------------- */}
      {open && isBlock && (
        <ul
          role="listbox"
          id={`${idPrefix}-menu`}
          aria-labelledby={`${idPrefix}-trigger`}
          className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60 p-1"
        >
          {LANGUAGES.map((lang) => {
            const selected = lang.value === current.value;
            return (
              <li key={lang.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrent(lang);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors focus-visible:bg-white focus-visible:outline-none ${
                    selected
                      ? "bg-white font-semibold text-[#1a73e8] shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  <span className="whitespace-nowrap">{lang.label}</span>
                  {selected && (
                    <CheckIcon className="h-4 w-4 shrink-0 text-[#1a73e8]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SiteHeader                                                         */
/* ------------------------------------------------------------------ */

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-b border-gray-200/80 shadow-[0_1px_16px_rgba(0,0,0,0.04)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-18 lg:px-8">
        {/* ---------- Logo ---------- */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
        >
          <GDGMark className="h-6 w-auto" />
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            GDG <span className="font-medium text-gray-500">UofK</span>
          </span>
        </Link>

        {/* ---------- Desktop nav ---------- */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-gray-200" />

          <LanguageDropdown idPrefix="lang-desktop" variant="inline" />
        </nav>

        {/* ---------- Mobile toggle ---------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* ---------- Mobile nav ---------- */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-gray-100 bg-white transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[48rem] border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Language selector — mobile */}
          <div className="mt-3 border-t border-gray-100 pt-4">
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              Language
            </p>
            <LanguageDropdown idPrefix="lang-mobile" variant="block" />
          </div>
        </nav>
      </div>
    </header>
  );
}