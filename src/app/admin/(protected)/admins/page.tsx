// src/app/admin/(protected)/admins/page.tsx
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import AdminManager from "./_components/AdminManager";

export default async function AdminAdminsPage() {
  const [admins, current] = await Promise.all([
    prisma.admin.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        username: true,
        name: true,
        active: true,
        lastLoginAt: true,
        createdAt: true,
      },
    }),
    getCurrentAdmin(),
  ]);

  const rows = admins.map((a) => ({
    id: a.id,
    username: a.username,
    name: a.name,
    active: a.active,
    lastLoginAt: a.lastLoginAt ? a.lastLoginAt.toISOString() : null,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <AdminManager initialAdmins={rows} currentAdminId={current?.id ?? null} />
  );
}
