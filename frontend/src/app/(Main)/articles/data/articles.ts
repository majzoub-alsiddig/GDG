// app/articles/data/articles.ts
import type { Article } from "../types";

export const articles: Article[] = [
  {
    id: "ai-workshop-recap",
    title: "Recap: Our First GenAI Workshop",
    description:
      "Over 100 students joined us to build their first Gemini-powered chatbot. Here’s what we covered and what’s coming next.",
    author: "GDG Team",
    authorRole: "Community",
    createdAt: "2026-02-20",
    category: "AI/ML",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    readingTime: 5,
    featured: true,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We had over 100 students join us to build their first Gemini-powered chatbot. Stay tuned for the next session!",
            },
          ],
        },
      ],
    },
  },
  {
    id: "intro-to-cloud-2026",
    title: "Getting Started with Google Cloud Platform",
    description:
      "Learn how students can start building scalable applications using Google Cloud — from your first project to your first deploy.",
    author: "Baboshi",
    authorRole: "Cloud Contributor",
    createdAt: "2026-02-10",
    category: "Cloud",
    cover:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    readingTime: 6,
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Why GCP for Students?" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Google Cloud offers powerful tools like App Engine and Cloud Functions. For GDSC members, mastering these is the first step toward scalable apps.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "flutter-vs-react-native",
    title: "Flutter or React Native in 2026?",
    description:
      "A practical comparison of the two leading cross-platform frameworks — performance, ecosystem, and which one to pick for your next project.",
    author: "Sarah Dev",
    authorRole: "Mobile Developer",
    createdAt: "2026-02-12",
    category: "Mobile",
    cover:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    readingTime: 7,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "The debate continues! While " },
            { type: "text", marks: [{ type: "bold" }], text: "Flutter" },
            {
              type: "text",
              text: " dominates in performance, React Native wins in community libraries.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "solution-challenge-tips",
    title: "Winning the 2026 Solution Challenge",
    description:
      "A field guide for GDG UofK teams entering the Solution Challenge — from problem selection to demo day.",
    author: "Lead Amir",
    authorRole: "Events Lead",
    createdAt: "2026-02-14",
    category: "Events",
    cover:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    readingTime: 8,
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Step 1: Identify a Problem" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Focus on the UN Sustainable Development Goals. Impact is more important than complex code.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "git-workflow-best-practices",
    title: "Git Branching Strategy for GDG Teams",
    description:
      "Stop pushing to main. A simple, practical branching model for student teams collaborating on real projects.",
    author: "Tech Team",
    authorRole: "Engineering",
    createdAt: "2026-02-16",
    category: "DevOps",
    cover:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1600&q=80",
    readingTime: 5,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Stop pushing to main! Use " },
            { type: "text", marks: [{ type: "code" }], text: "feature-branching" },
            {
              type: "text",
              text: " to keep your project stable during collaborations.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "anghami-api-integration",
    title: "Integrating Music APIs into Web Apps",
    description:
      "How to authenticate with OAuth 2.0 and pull user playlists from Anghami into your own web application.",
    author: "Baboshi",
    authorRole: "Web Developer",
    createdAt: "2026-02-18",
    category: "Web Dev",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    readingTime: 9,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "As a fan of Anghami, I explored how to fetch user playlists via API. Here is how you can use OAuth 2.0 to authenticate listeners.",
            },
          ],
        },
      ],
    },
  },
];