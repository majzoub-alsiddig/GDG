// src/app/admin/(protected)/team/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamForm from "../../_components/TeamForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage({ params }: Params) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to team
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Edit team member
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Editing: <span className="font-medium text-gray-700">{member.name}</span>
      </p>
      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
        <TeamForm mode="edit" member={member} />
      </div>
    </div>
  );
}