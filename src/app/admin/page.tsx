import Link from "next/link";
import ArticleCard from "./_components/ArticleCard";

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-500">
            Manage your published articles and drafts
          </p>
        </div>
        <Link
          href="/admin/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add Article
        </Link>
      </div>

      <h2 className="text-xl font-semibold text-slate-700 mb-6">
        Available Articles
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <ArticleCard
            key={index}
            id={`${index}`}
            preview="The future of web development is shifting towards..."
            createdAt="2026-02-18"
            author="GDG"
          />
        ))}
      </div>
    </div>
  );
};
export default Page;
