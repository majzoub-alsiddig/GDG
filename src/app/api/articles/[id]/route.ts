import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { slug: id } });
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const data = await request.json();
    const article = await prisma.article.update({
      where: { slug: id }, // match the GET lookup by slug
      data,
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.article.delete({ where: { slug: id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}