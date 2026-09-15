// app/home/components/CommunityStory.tsx
const MILESTONES = [
  {
    marker: "2021",
    title: "GDG UofK founded",
    description:
      "One of the first Google Developer Groups established in Sudan, founded in August 2021.",
    accent: "bg-[#4285F4]",
  },
  {
    marker: "200+",
    title: "Online events hosted",
    description:
      "Workshops, talks, and study jams delivered to students across Sudan and the Arab world.",
    accent: "bg-[#EA4335]",
  },
  {
    marker: "Today",
    title: "Still learning, still building",
    description:
      "Continuing to grow our community, our skills, and the opportunities we create together.",
    accent: "bg-[#34A853]",
  },
];

export default function CommunityStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          Our story
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          From 2021 to today
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          A short timeline of how GDG UofK grew from an idea into a community.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-14 sm:mt-16">
        {/* Connector line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-3 hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:block"
        />

        <ol className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-8">
          {MILESTONES.map((milestone) => (
            <li key={milestone.marker} className="relative text-center lg:text-left">
              {/* Marker dot */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span
                    className={`absolute h-6 w-6 rounded-full opacity-20 ${milestone.accent}`}
                  />
                  <span className={`relative h-3 w-3 rounded-full ${milestone.accent}`} />
                </span>
              </div>

              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {milestone.marker}
              </p>
              <h3 className="mt-2 text-base font-semibold text-gray-900">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}