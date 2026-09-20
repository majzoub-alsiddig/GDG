import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const onlyPublished = searchParams.get("published") !== "false";
  const featured = searchParams.get("featured");

  const events = await prisma.event.findMany({
    where: {
      ...(onlyPublished && { published: true }),
      ...(featured === "true" && { isFeatured: true }),
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({
      data: {
        ...data,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}