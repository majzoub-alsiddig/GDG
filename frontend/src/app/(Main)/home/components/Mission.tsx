// app/home/components/Mission.tsx
import { GlobeIcon } from "@/components/icons";

export default function Mission() {
  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <GlobeIcon className="h-6 w-6 text-[#4285F4]" />
        </span>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Our mission
        </h2>

        <span
          aria-hidden="true"
          className="mx-auto mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
        />

        <p className="mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl">
          To spread knowledge of Google technologies - and technology more
          broadly - throughout the tech community in Sudan and the Arab world.
        </p>
      </div>
    </section>
  );
}