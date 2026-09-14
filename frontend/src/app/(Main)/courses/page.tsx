// app/courses/page.tsx
import Footer from "@/components/Footer";
import SiteHeader from "./components/SiteHeader";
import CoursesHero from "./components/CoursesHero";
import CoursesIntroduction from "./components/CoursesIntroduction";
import CoursesSection from "./components/CoursesSection";
import LearningCTA from "./components/LearningCTA";
import { courses } from "./data/courses";

const Courses = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-poppins">
      <SiteHeader active="Courses" />

      <main className="flex-1">
        <CoursesHero />
        <CoursesIntroduction />
        <CoursesSection courses={courses} />
        <LearningCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Courses;