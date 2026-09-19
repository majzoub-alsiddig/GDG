"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GDGLogo from "@/../assets/GDG-logo.svg";
import Image from "next/image";

const AdminNavBar = () => {
  return (
    <nav
      className={`flex-1  top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 transition-all duration-300  bg-black "
      }`}
    >
      <Link href="/" className="relative w-56 h-12">
        <Image
          src={GDGLogo}
          alt="GDG Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>
      <div className="flex text-white items-center gap-6 text-sm font-medium">
        <Link href={"/admin"} className="text-lg">
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
