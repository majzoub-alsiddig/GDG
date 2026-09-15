import { json } from "stream/consumers";
import ArticleCard from "./components/ArticleCard";
import articles from "./exampleArticles.json";

const ArticlesPage = () => {
  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Hero Header */}
      <header className="py-16 px-6 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            The Latest Insight
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our collection of articles on development, design, and
            technology.
          </p>
        </div>
      </header>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArticlesPage;
