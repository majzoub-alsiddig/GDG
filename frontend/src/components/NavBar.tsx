"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GDGLogoSvg from "@/../assets/GDG-logo.svg";
import Image from "next/image";

interface IPage {
  url: string;
  name: string;
}

const NavBar = () => {
  const pathname = usePathname();
  const pages: IPage[] = [
    { name: "Home", url: "/" },
    { name: "Members", url: "/contact" },
    { name: "Courses", url: "/courses" },
    { name: "Articles", url: "/articles" },
    { name: "FAQ", url: "/faq" },
    { name: "Admin", url: "/admin" },
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 transition-all duration-300 ${
          isVisible && !pathname.startsWith("/articles")
            ? "bg-transparent"
            : "bg-black/80 backdrop-blur-md shadow-md"
        }`}
      >
        <Link href="/" className="relative w-40 h-10">
          <Image
            src={GDGLogoSvg}
            alt="GDG Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <button
          className="md:hidden text-white focus:outline-none z-40"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.url}
              className={`transition-colors duration-200 ${
                pathname === page.url
                  ? "text-blue-400 font-bold"
                  : "text-white hover:text-blue-300"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-screen w-1/2 bg-black text-white flex flex-col gap-4 p-6 transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.url}
            className={`transition-colors duration-200 ${
              pathname === page.url
                ? "text-blue-400 font-bold"
                : "hover:text-blue-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {page.name}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
