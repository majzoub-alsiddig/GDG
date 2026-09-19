// app/courses/components/CoursesSkeleton.tsx
export default function CoursesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse" aria-hidden="true">
          <div className="aspect-video w-full rounded-2xl bg-gray-200" />
          <div className="mt-4 h-2.5 w-16 rounded-full bg-gray-200" />
          <div className="mt-3 h-4 w-3/4 rounded-full bg-gray-200" />
          <div className="mt-3 h-3 w-full rounded-full bg-gray-200" />
          <div className="mt-2 h-3 w-5/6 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}