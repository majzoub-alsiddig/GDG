// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  GlobeIcon,
  MenuIcon,
  GDGMark,
} from "@/components/icons";
import { useTranslations, type Locale } from "@/i18n";

const NAV_LINKS: { key: string; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.articles", href: "/articles" },
  { key: "nav.events", href: "/events" },
  { key: "nav.courses", href: "/courses" },
  { key: "nav.team", href: "/team" },
  { key: "nav.faq", href: "/faq" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type DropdownProps = {
  idPrefix: string;
  variant?: "inline" | "block";
};

function LanguageDropdown({ idPrefix, variant = "inline" }: DropdownProps) {
  const { locale, setLocale, t } = useTranslations();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const options: { value: Locale; label: string; short: string }[] = [
    { value: "en", label: t("language.english"), short: t("language.englishShort") },
    { value: "ar", label: t("language.arabic"), short: t("language.arabicShort") },
  ];

  const current = options.find((o) => o.value === locale) ?? options[0];

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

      {open && !isBlock && (
        <ul
          role="listbox"
          id={`${idPrefix}-menu`}
          aria-labelledby={`${idPrefix}-trigger`}
          className="absolute end-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.15)]"
        >
          {options.map((option) => {
            const selected = option.value === locale;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setLocale(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:bg-gray-50 focus-visible:outline-none ${
                    selected
                      ? "bg-blue-50 font-semibold text-[#1a73e8]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
                  {selected && (
                    <CheckIcon className="h-4 w-4 shrink-0 text-[#1a73e8]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {open && isBlock && (
        <ul
          role="listbox"
          id={`${idPrefix}-menu`}
          aria-labelledby={`${idPrefix}-trigger`}
          className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60 p-1"
        >
          {options.map((option) => {
            const selected = option.value === locale;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setLocale(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors focus-visible:bg-white focus-visible:outline-none ${
                    selected
                      ? "bg-white font-semibold text-[#1a73e8] shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
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

export default function SiteHeader() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
        >
          <GDGMark className="h-6 w-auto" />
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            GDG <span className="font-medium text-gray-500">UofK</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-gray-200" />

          <LanguageDropdown idPrefix="lang-desktop" variant="inline" />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

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
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          <div className="mt-3 border-t border-gray-100 pt-4">
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              {t("language.label")}
            </p>
            <LanguageDropdown idPrefix="lang-mobile" variant="block" />
          </div>
        </nav>
      </div>
    </header>
  );
}
