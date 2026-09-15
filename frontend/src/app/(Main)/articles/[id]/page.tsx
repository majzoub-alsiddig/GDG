import articlesData from "../exampleArticles.json";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { notFound } from "next/navigation";

export default async function FullArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articlesData.find((a) => a.id === id);
  if (!article) {
    notFound();
  }
  const htmlContent = generateHTML(article.content, [StarterKit]);

  return (
    <main className="min-h-screen mt-16 bg-white pb-20">
      {/* Article Header */}
      <header className="max-w-3xl mx-auto pt-16 px-6 mb-12">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4 uppercase tracking-widest">
          <span>{article.category}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 py-6 border-y border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
            {article.author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{article.author}</p>
            <p className="text-xs text-slate-500">{article.createdAt}</p>
          </div>
        </div>
      </header>

      {/* The Article Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="prose prose-lg prose-slate prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </main>
  );
}
