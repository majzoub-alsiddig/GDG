import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const onlyPublished = searchParams.get("published") !== "false";
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const q = searchParams.get("q")?.trim();

  const where: Prisma.ArticleWhereInput = {
    ...(onlyPublished && { published: true }),
    ...(category && category !== "All" && { category }),
    ...(featured === "true" && { featured: true }),
    ...(q && {
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
        { author: { contains: q } },
        { category: { contains: q } },
      ],
    }),
  };

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const article = await prisma.article.create({
      data: {
        ...data,
        content: data.content, // already JSON
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}