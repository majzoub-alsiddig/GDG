// app/courses/components/CoursesIntroduction.tsx
export default function CoursesIntroduction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Our courses
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Learn with GDG
          </h2>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Across our chapters, we have dedicated our time and effort to
            creating learning experiences that help students explore new
            technologies, strengthen their technical skills, and build
            practical knowledge.
          </p>
        </div>
      </div>

      <div className="mt-12 h-px w-full bg-gray-100 sm:mt-16" />
    </section>
  );
}