// app/home/components/SectionHeader.tsx
import { ArrowRightIcon } from "@/components/icons";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
};

export default function SectionHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && (
        <a
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 sm:self-auto"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}