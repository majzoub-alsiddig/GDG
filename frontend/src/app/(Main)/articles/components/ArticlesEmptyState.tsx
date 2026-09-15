// app/articles/components/ArticlesEmptyState.tsx
import { BookOpenIcon } from "./icons";

type Props = {
  title?: string;
  message?: string;
};

export default function ArticlesEmptyState({
  title = "No articles found",
  message = "Try another keyword or explore a different category.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <BookOpenIcon className="h-6 w-6 text-[#1a73e8]" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        {message}
      </p>
    </div>
  );
}