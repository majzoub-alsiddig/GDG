// src/app/admin/(protected)/admins/new/page.tsx
import Link from "next/link";
import AdminForm from "../_components/AdminForm";

export default function NewAdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/admins"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to admins
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Add admin
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        New admins can sign in immediately after creation.
      </p>
      <div className="mt-8">
        <AdminForm
          mode="create"
          initial={{
            username: "",
            name: "",
            active: true,
            isSelf: false,
          }}
        />
      </div>
    </div>
  );
}
