// app/team/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Courses", href: "/courses" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

type Props = { active?: string };

export default function SiteHeader({ active = "Team" }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const isActive = link.label === active;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-[#1a73e8]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

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

      <div
        id="mobile-nav"
        className={`overflow-hidden border-gray-100 bg-white transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            const isActive = link.label === active;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors ${
                  isActive ? "bg-blue-50 text-[#1a73e8]" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}