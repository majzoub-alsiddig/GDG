import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const onlyPublished = searchParams.get("published") !== "false";
  const category = searchParams.get("category");

  const courses = await prisma.course.findMany({
    where: {
      ...(onlyPublished && { published: true }),
      ...(category && { category }),
    },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const course = await prisma.course.create({ data });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}