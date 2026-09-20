import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const members = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(members)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const member = await prisma.teamMember.create({ data })
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}