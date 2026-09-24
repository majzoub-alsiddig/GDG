// src/app/admin/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin-auth";
import AdminNavBar from "../_components/AdminNavBar";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AdminNavBar admin={admin} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
