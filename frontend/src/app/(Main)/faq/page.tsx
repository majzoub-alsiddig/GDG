// app/faq/page.tsx
import Footer from "@/components/Footer";
import FAQHero from "./components/FAQHero";
import FAQSection from "./components/FAQSection";
import StillHaveQuestions from "./components/StillHaveQuestions";

// SiteHeader is rendered by app/layout.tsx — do not include it here.

export default function FAQ() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <main className="flex-1">
        <FAQHero />
        <FAQSection />
        <StillHaveQuestions />
      </main>

    </div>
  );
}