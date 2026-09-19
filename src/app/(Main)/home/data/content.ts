// app/home/data/content.ts
import type { CommunityStat, EventItem, FeaturedCourse } from "../types";

export const communityStats: CommunityStat[] = [
  { value: "200+", label: "Online events", accent: "blue" },
  { value: "2021", label: "Founded at UofK", accent: "red" },
  { value: "20+", label: "Team members", accent: "yellow" },
  { value: "10+", label: "Technologies covered", accent: "green" },
];

export const featuredEvents: EventItem[] = [
  {
    id: "android-with-compose",
    title: "Building Modern Android Apps with Jetpack Compose",
    category: "Workshop",
    cover:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-02",
    location: "Online",
    link: "/events/android-compose",
  },
  {
    id: "intro-to-gemini",
    title: "Getting Started with Gemini APIs",
    category: "Talk",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-12",
    location: "University of Khartoum",
    link: "/events/gemini-apis",
  },
  {
    id: "flutter-study-jam",
    title: "Flutter Study Jam: From Zero to First App",
    category: "Study Jam",
    cover:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-24",
    location: "Online",
    link: "/events/flutter-study-jam",
  },
];

export const featuredCourses: FeaturedCourse[] = [
  {
    id: "google-workspace-essentials",
    title: "Google Workspace Essentials",
    description:
      "Learn how to effectively use Google Workspace tools for productivity and collaboration.",
    cover:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    link: "/courses",
    category: "Google Workspace",
  },
  {
    id: "intro-web",
    title: "Introduction to Web Development",
    description:
      "Build your first web pages with HTML, CSS, and JavaScript - from structure to interactivity.",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    link: "/courses",
    category: "Web",
  },
  {
    id: "android-kotlin",
    title: "Android Development with Kotlin",
    description:
      "Get started building native Android apps using Kotlin, Jetpack Compose, and modern tooling.",
    cover:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80",
    link: "/courses",
    category: "Android",
  },
];