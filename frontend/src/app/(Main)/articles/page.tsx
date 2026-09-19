import type { Metadata } from "next";
import ArticlesExplorer from "./components/ArticlesExplorer";
import ContributeCTA from "./components/ContributeCTA";
import { articles } from "./data/articles";

export const metadata: Metadata = {
  title: "Articles  -  GDG UofK",
  description:
    "Technical tutorials, community stories, project insights, and practical knowledge from the GDG UofK community.",
};

export default function ArticlesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <ArticlesExplorer articles={articles} />
        <ContributeCTA />
      </main>
    </div>
  );
}