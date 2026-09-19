// app/team/components/TeamSkeleton.tsx
export default function TeamSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
          aria-hidden="true"
        >
          <div className="aspect-[3/4] w-full bg-gray-200" />
          <div className="p-5 sm:p-6">
            <div className="h-4 w-1/2 rounded-full bg-gray-200" />
            <div className="mt-3 h-2.5 w-10 rounded-full bg-gray-200" />
            <div className="mt-4 h-3 w-1/3 rounded-full bg-gray-200" />
            <div className="mt-3 h-3 w-full rounded-full bg-gray-200" />
            <div className="mt-2 h-3 w-5/6 rounded-full bg-gray-200" />
            <div className="mt-5 flex gap-1.5">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}