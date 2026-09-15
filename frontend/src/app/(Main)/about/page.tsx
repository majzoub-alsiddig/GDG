import AboutPreview from "../home/components/AboutPreview";
import Mission from "../home/components/Mission";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutPreview />
      <Mission />
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What drives us
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1a73e8]">
                Learn
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We create spaces where students can build confidence with modern tools and technologies.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#34A853]">
                Build
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We turn ideas into projects, prototypes, and real-world experiences that matter.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#EA4335]">
                Share
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We believe in open knowledge, community collaboration, and helping each other grow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
