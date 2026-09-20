import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.teamMember.deleteMany()
  const teamMembers = [
    {
      name: "Dr. Sara Ahmed",
      role: "Chapter Lead",
      about: "Leads GDG UofK with a passion for community building and empowering students through technology.",
      photo: "https://imags.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      category: "Leadership",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
    {
      name: "Mohammed Ali",
      role: "Co-Organizer",
      about: "Coordinates events and partnerships, connecting students with opportunities across the tech community.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      category: "Leadership",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
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
    },
    {
      name: "Fatima Hassan",
      role: "Android Developer",
      about: "Builds native Android apps with Kotlin and Jetpack Compose, and mentors new mobile developers.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      category: "Technical",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Omar Ibrahim",
      role: "Web Developer",
      about: "Enjoys crafting fast, accessible web experiences and sharing what he learns with the community.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      category: "Technical",
      github: "https://github.com",
      twitter: "https://x.com",
    },
    {
      name: "Layla Mohammed",
      role: "Content Lead",
      about: "Tells the stories of GDG through written and visual content, shaping how the community is seen.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      category: "Media",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Youssef Ahmed",
      role: "Graphic Designer",
      about: "Designs posters, branding, and visuals that bring GDG events and campaigns to life.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      category: "Media",
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
    {
      name: "Aisha Khalid",
      role: "Events Coordinator",
      about: "Organizes workshops, meetups, and study jams that keep the GDG community active and engaged.",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      category: "Operations",
      linkedin: "https://linkedin.com",
    },
  ]
  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member })
  }

  await prisma.event.deleteMany()
  const events = [
    {
      slug: "android-with-compose",
      title: "Building Modern Android Apps with Jetpack Compose",
      description: "A hands-on workshop covering Compose fundamentals, state, and navigation.",
      category: "Workshop",
      cover: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-02"),
      location: "Online",
      link: "/events/android-with-compose",
      isFeatured: true,
    },
    {
      slug: "intro-to-gemini",
      title: "Getting Started with Gemini APIs",
      description: "Build your first Gemini-powered app and learn how to integrate the API.",
      category: "Talk",
      cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-12"),
      location: "University of Khartoum",
      link: "/events/intro-to-gemini",
      isFeatured: true,
    },
    {
      slug: "flutter-study-jam",
      title: "Flutter Study Jam: From Zero to First App",
      description: "A beginner-friendly series where you ship your first Flutter app.",
      category: "Study Jam",
      cover: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-10-24"),
      location: "Online",
      link: "/events/flutter-study-jam",
      isFeatured: true,
    },
    {
      slug: "gcp-for-students",
      title: "Google Cloud for Students",
      description: "Deploy your first app to Google Cloud and understand the free tier.",
      category: "Workshop",
      cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-11-05"),
      location: "Online",
      link: "/events/gcp-for-students",
      isFeatured: false,
    },
    {
      slug: "community-meetup-nov",
      title: "Community Meetup: Show & Tell",
      description: "Members share what they've been building. Casual, friendly, and open to all.",
      category: "Meetup",
      cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      date: new Date("2026-11-20"),
      location: "University of Khartoum",
      link: "/events/community-meetup-nov",
      isFeatured: false,
    },
  ]
  for (const event of events) {
    await prisma.event.create({ data: event })
  }

  await prisma.course.deleteMany()
  const courses = [
    {
      slug: "google-workspace-essentials",
      title: "Google Workspace Essentials",
      description: "Learn how to effectively use Google Workspace tools for productivity, collaboration, and learning.",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "Google Workspace",
      order: 1,
    },
    {
      slug: "intro-to-web-development",
      title: "Introduction to Web Development",
      description: "Build your first web pages with HTML, CSS, and JavaScript - from structure to styling to interactivity.",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "Web",
      order: 2,
    },
    {
      slug: "android-with-kotlin",
      title: "Android Development with Kotlin",
      description: "Get started building native Android apps using Kotlin, Jetpack Compose, and modern Android tooling.",
      cover: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "Android",
      order: 3,
    },
    {
      slug: "flutter-fast-track",
      title: "Flutter Fast Track",
      description: "Create beautiful cross-platform mobile apps with Flutter and Dart, from widgets to state management.",
      cover: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "Flutter",
      order: 4,
    },
    {
      slug: "ml-foundations",
      title: "Machine Learning Foundations",
      description: "Understand the core concepts behind machine learning and train your first models with Python.",
      cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "AI",
      order: 5,
    },
    {
      slug: "career-in-tech",
      title: "Building a Career in Tech",
      description: "Practical guidance on CVs, portfolios, internships, and preparing for your first technical interview.",
      cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80",
      link: "https://youtube.com",
      category: "Career",
      order: 6,
    },
  ]
  for (const course of courses) {
    await prisma.course.create({ data: course })
  }

  console.log(`✅ Seeded ${courses.length} courses`)

  console.log(`✅ Seeded ${events.length} events`)

  console.log(`✅ Seeded ${teamMembers.length} team members`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
