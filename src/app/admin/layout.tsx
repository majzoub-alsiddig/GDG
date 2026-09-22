"use client";

import { usePathname } from "next/navigation";
import AdminNavBar from "./_components/AdminNavBar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {!isLoginPage && <AdminNavBar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
