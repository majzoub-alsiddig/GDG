// src/app/admin/(protected)/admins/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import AdminForm from "../../_components/AdminForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditAdminPage({ params }: Params) {
  const { id } = await params;

  const [admin, current] = await Promise.all([
    prisma.admin.findUnique({ where: { id } }),
    getCurrentAdmin(),
  ]);
  if (!admin) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/admins"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to admins
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Edit admin
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Editing: <span className="font-medium text-gray-700">{admin.name}</span>
      </p>
      <div className="mt-8">
        <AdminForm
          mode="edit"
          initial={{
            id: admin.id,
            username: admin.username,
            name: admin.name,
            active: admin.active,
            isSelf: current?.id === admin.id,
          }}
        />
      </div>
    </div>
  );
}
