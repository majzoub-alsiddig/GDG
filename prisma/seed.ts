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
