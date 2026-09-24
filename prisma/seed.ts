import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { hashPassword } from '../src/lib/passwords'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // ================= Admin bootstrap =================
  // Only runs when the Admin table is empty.
  // Existing admins are preserved across reseeds.
  const existingAdminCount = await prisma.admin.count()
  if (existingAdminCount === 0) {
    const username = process.env.ADMIN_USERNAME ?? "admin"
    const password = process.env.ADMIN_PASSWORD ?? "admin"
    const passwordHash = await hashPassword(password)
    await prisma.admin.create({
      data: {
        username,
        name: "Admin",
        passwordHash,
        active: true,
      },
    })
    console.log(`✅ Bootstrapped admin "${username}"`)
  } else {
    console.log(`· Skipped admin bootstrap (${existingAdminCount} already exist)`)
  }

  // ================= Team =================
  await prisma.teamMember.deleteMany()
  const teamMembers = [
    {
      name: "Dr. Sara Ahmed",
      role: "Chapter Lead",
      about: "Leads GDG UofK with a passion for community building and empowering students through technology.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      category: "Core",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      order: 1,
    },
    {
      name: "Mohammed Ali",
      role: "Co-Organizer",
      about: "Coordinates events and partnerships, connecting students with opportunities across the tech community.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      category: "Core",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      order: 2,
    },
    {
      name: "Majzoub Al Siddig",
      role: "Software Dev",
      about: "Passionate about web development and building tools that make learning more accessible for students.",
      photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80",
      category: "Technical",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      order: 3,
    },
    {
      name: "Fatima Hassan",
      role: "Android Developer",
      about: "Builds native Android apps with Kotlin and Jetpack Compose, and mentors new mobile developers.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      category: "Technical",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      order: 4,
    },
    {
      name: "Omar Ibrahim",
      role: "Web Developer",
      about: "Enjoys crafting fast, accessible web experiences and sharing what he learns with the community.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      category: "Technical",
      github: "https://github.com",
      twitter: "https://x.com",
      order: 5,
    },
    {
      name: "Layla Mohammed",
      role: "Content Lead",
      about: "Tells the stories of GDG through written and visual content, shaping how the community is seen.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      category: "Media",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      order: 6,
    },
    {
      name: "Youssef Ahmed",
      role: "Graphic Designer",
      about: "Designs posters, branding, and visuals that bring GDG events and campaigns to life.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      category: "Media",
      instagram: "https://instagram.com",
      website: "https://example.com",
      order: 7,
    },
    {
      name: "Aisha Khalid",
      role: "Events Coordinator",
      about: "Organizes workshops, meetups, and study jams that keep the GDG community active and engaged.",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      category: "Managment",
      linkedin: "https://linkedin.com",
      order: 8,
    },
  ]
  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member })
  }

  // ================= Events + Categories =================
  await prisma.event.deleteMany()
  await prisma.eventCategory.deleteMany()

  const eventCategoryData = [
    { name: "Workshop", slug: "workshop", order: 1 },
    { name: "Talk", slug: "talk", order: 2 },
    { name: "Study Jam", slug: "study-jam", order: 3 },
    { name: "Meetup", slug: "meetup", order: 4 },
  ]
  for (const cat of eventCategoryData) {
    await prisma.eventCategory.create({ data: cat })
  }

  const allEventCategories = await prisma.eventCategory.findMany()
  const eventCatIdByName = Object.fromEntries(
    allEventCategories.map((c) => [c.name, c.id])
  )

  const events = [
    {
      slug: "android-with-compose",
      title: "Building Modern Android Apps with Jetpack Compose",
      description: "A hands-on workshop covering Compose fundamentals, state, and navigation.",
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "What you'll learn" }] },
          { type: "paragraph", content: [{ type: "text", text: "Compose fundamentals, state management, and navigation between screens." }] },
        ],
      },
      categoryId: eventCatIdByName["Workshop"],
      cover: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-02T14:00:00"),
      location: "Online",
      link: "/events/android-with-compose",
      isFeatured: true,
    },
    {
      slug: "intro-to-gemini",
      title: "Getting Started with Gemini APIs",
      description: "Build your first Gemini-powered app and learn how to integrate the API.",
      content: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "In this talk we'll walk through authentication, prompt design, and streaming responses with the Gemini API." }] },
        ],
      },
      categoryId: eventCatIdByName["Talk"],
      cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-12T17:30:00"),
      location: "University of Khartoum",
      link: "/events/intro-to-gemini",
      isFeatured: true,
    },
    {
      slug: "flutter-study-jam",
      title: "Flutter Study Jam: From Zero to First App",
      description: "A beginner-friendly series where you ship your first Flutter app.",
      content: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Hands-on study jam spanning three sessions. Bring a laptop and we'll build together." }] },
        ],
      },
      categoryId: eventCatIdByName["Study Jam"],
      cover: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-24T16:00:00"),
      location: "Online",
      link: "/events/flutter-study-jam",
      isFeatured: true,
    },
    {
      slug: "gcp-for-students",
      title: "Google Cloud for Students",
      description: "Deploy your first app to Google Cloud and understand the free tier.",
      content: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "We'll cover Cloud Run, Firestore, and how to keep within the student free tier." }] },
        ],
      },
      categoryId: eventCatIdByName["Workshop"],
      cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-11-05T15:00:00"),
      location: "Online",
      link: "/events/gcp-for-students",
      isFeatured: false,
    },
    {
      slug: "community-meetup-nov",
      title: "Community Meetup: Show & Tell",
      description: "Members share what they've been building. Casual, friendly, and open to all.",
      content: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Bring a project, a question, or just yourself. Snacks provided." }] },
        ],
      },
      categoryId: eventCatIdByName["Meetup"],
      cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-11-20T18:00:00"),
      location: "University of Khartoum",
      link: "/events/community-meetup-nov",
      isFeatured: false,
    },
  ]
  for (const event of events) {
    await prisma.event.create({ data: event })
  }

  // ================= Courses + Categories =================
  // Order matters: delete courses first (FK), then categories
  await prisma.course.deleteMany()
  await prisma.courseCategory.deleteMany()

  const categoryData = [
    { name: "Web", slug: "web", order: 1 },
    { name: "Android", slug: "android", order: 2 },
    { name: "AI", slug: "ai", order: 3 },
    { name: "Flutter", slug: "flutter", order: 4 },
    { name: "Google Workspace", slug: "google-workspace", order: 5 },
    { name: "Career", slug: "career", order: 6 },
  ]
  for (const cat of categoryData) {
    await prisma.courseCategory.create({ data: cat })
  }

  const allCategories = await prisma.courseCategory.findMany()
  const catIdByName = Object.fromEntries(allCategories.map((c) => [c.name, c.id]))

  const courses = [
    {
      slug: "google-workspace-essentials",
      title: "Google Workspace Essentials",
      description: "Learn how to effectively use Google Workspace tools for productivity, collaboration, and learning.",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["Google Workspace"],
      order: 1,
    },
    {
      slug: "intro-to-web-development",
      title: "Introduction to Web Development",
      description: "Build your first web pages with HTML, CSS, and JavaScript - from structure to styling to interactivity.",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["Web"],
      order: 2,
    },
    {
      slug: "android-with-kotlin",
      title: "Android Development with Kotlin",
      description: "Get started building native Android apps using Kotlin, Jetpack Compose, and modern Android tooling.",
      cover: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["Android"],
      order: 3,
    },
    {
      slug: "flutter-fast-track",
      title: "Flutter Fast Track",
      description: "Create beautiful cross-platform mobile apps with Flutter and Dart, from widgets to state management.",
      cover: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["Flutter"],
      order: 4,
    },
    {
      slug: "ml-foundations",
      title: "Machine Learning Foundations",
      description: "Understand the core concepts behind machine learning and train your first models with Python.",
      cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["AI"],
      order: 5,
    },
    {
      slug: "career-in-tech",
      title: "Building a Career in Tech",
      description: "Practical guidance on CVs, portfolios, internships, and preparing for your first technical interview.",
      cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      categoryId: catIdByName["Career"],
      order: 6,
    },
  ]
  for (const course of courses) {
    await prisma.course.create({ data: course })
  }

  // ================= Articles + Categories =================
  // Order matters: delete articles first (FK), then categories
  await prisma.article.deleteMany()
  await prisma.articleCategory.deleteMany()

  const articleCategoryData = [
    { name: "Web Dev", slug: "web-dev", order: 1 },
    { name: "Mobile", slug: "mobile", order: 2 },
    { name: "AI/ML", slug: "ai-ml", order: 3 },
    { name: "Cloud", slug: "cloud", order: 4 },
    { name: "DevOps", slug: "devops", order: 5 },
    { name: "Events", slug: "events", order: 6 },
  ]
  for (const cat of articleCategoryData) {
    await prisma.articleCategory.create({ data: cat })
  }

  const allArticleCategories = await prisma.articleCategory.findMany()
  const articleCatIdByName = Object.fromEntries(
    allArticleCategories.map((c) => [c.name, c.id])
  )

  const articles = [
    {
      slug: "ai-workshop-recap",
      title: "Recap: Our First GenAI Workshop",
      description: "Over 100 students joined us to build their first Gemini-powered chatbot. Here's what we covered and what's coming next.",
      author: "GDG Team",
      authorRole: "Community",
      cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["AI/ML"],
      readingTime: 5,
      featured: true,
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "We had over 100 students join us to build their first Gemini-powered chatbot. Stay tuned for the next session!" },
            ],
          },
        ],
      },
    },
    {
      slug: "intro-to-cloud-2026",
      title: "Getting Started with Google Cloud Platform",
      description: "Learn how students can start building scalable applications using Google Cloud - from your first project to your first deploy.",
      author: "Baboshi",
      authorRole: "Cloud Contributor",
      cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["Cloud"],
      readingTime: 6,
      featured: false,
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Why GCP for Students?" }] },
          { type: "paragraph", content: [{ type: "text", text: "Google Cloud offers powerful tools like App Engine and Cloud Functions. For GDSC members, mastering these is the first step toward scalable apps." }] },
        ],
      },
    },
    {
      slug: "flutter-vs-react-native",
      title: "Flutter or React Native in 2026?",
      description: "A practical comparison of the two leading cross-platform frameworks - performance, ecosystem, and which one to pick for your next project.",
      author: "Sarah Dev",
      authorRole: "Mobile Developer",
      cover: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["Mobile"],
      readingTime: 7,
      featured: false,
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "The debate continues! While " },
              { type: "text", marks: [{ type: "bold" }], text: "Flutter" },
              { type: "text", text: " dominates in performance, React Native wins in community libraries." },
            ],
          },
        ],
      },
    },
    {
      slug: "solution-challenge-tips",
      title: "Winning the 2026 Solution Challenge",
      description: "A field guide for GDG UofK teams entering the Solution Challenge - from problem selection to demo day.",
      author: "Lead Amir",
      authorRole: "Events Lead",
      cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["Events"],
      readingTime: 8,
      featured: false,
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Step 1: Identify a Problem" }] },
          { type: "paragraph", content: [{ type: "text", text: "Focus on the UN Sustainable Development Goals. Impact is more important than complex code." }] },
        ],
      },
    },
    {
      slug: "git-workflow-best-practices",
      title: "Git Branching Strategy for GDG Teams",
      description: "Stop pushing to main. A simple, practical branching model for student teams collaborating on real projects.",
      author: "Tech Team",
      authorRole: "Engineering",
      cover: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["DevOps"],
      readingTime: 5,
      featured: false,
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Stop pushing to main! Use " },
              { type: "text", marks: [{ type: "code" }], text: "feature-branching" },
              { type: "text", text: " to keep your project stable during collaborations." },
            ],
          },
        ],
      },
    },
    {
      slug: "anghami-api-integration",
      title: "Integrating Music APIs into Web Apps",
      description: "How to authenticate with OAuth 2.0 and pull user playlists from Anghami into your own web application.",
      author: "Baboshi",
      authorRole: "Web Developer",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
      categoryId: articleCatIdByName["Web Dev"],
      readingTime: 9,
      featured: false,
      content: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "As a fan of Anghami, I explored how to fetch user playlists via API. Here is how you can use OAuth 2.0 to authenticate listeners." }] },
        ],
      },
    },
  ]
  for (const article of articles) {
    await prisma.article.create({ data: article })
  }

  console.log(`✅ Seeded ${categoryData.length} course categories`)
  console.log(`✅ Seeded ${courses.length} courses`)
  console.log(`✅ Seeded ${eventCategoryData.length} event categories`)
  console.log(`✅ Seeded ${teamMembers.length} team members`)
  console.log(`✅ Seeded ${articleCategoryData.length} article categories`)
  console.log(`✅ Seeded ${articles.length} articles`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
