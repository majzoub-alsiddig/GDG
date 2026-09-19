// app/home/components/CommunityStats.tsx
import type { CommunityStat } from "../types";

const ACCENT: Record<CommunityStat["accent"], string> = {
  blue: "text-[#4285F4]",
  red: "text-[#EA4335]",
  yellow: "text-[#F9AB00]",
  green: "text-[#34A853]",
};

export default function CommunityStats({ stats }: { stats: CommunityStat[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="border-y border-gray-100 bg-gray-50/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p
                className={`text-3xl font-bold tracking-tight sm:text-4xl ${ACCENT[stat.accent]}`}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}