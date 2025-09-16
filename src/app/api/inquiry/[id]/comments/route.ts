import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 댓글 조회
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const inquiryId = parseInt(resolvedParams.id);
    
    const comments = await prisma.reply.findMany({
      where: { inquiryId },
      orderBy: { createdAt: 'asc' }
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// 댓글 작성
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const inquiryId = parseInt(resolvedParams.id);
    const body = await request.json();
    const { author, content, isAdmin = false } = body;

    const comment = await prisma.reply.create({
      data: {
        inquiryId,
        author,
        content
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}