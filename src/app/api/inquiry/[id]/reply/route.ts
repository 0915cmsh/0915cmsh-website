import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const { content, author } = await req.json();

  await prisma.reply.create({ data: { inquiryId: id, content, author: author ?? '관리자' } });
  await prisma.inquiry.update({ where: { id }, data: { status: '답변완료' } });

  return NextResponse.json({ ok:true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const { replyId } = await req.json();

  if (replyId) {
    // 특정 답변 삭제
    await prisma.reply.delete({ where: { id: replyId } });
  } else {
    // 가장 최근 답변 1개 삭제 (기존 방식)
    const last = await prisma.reply.findFirst({ where: { inquiryId: id }, orderBy: { createdAt: 'desc' } });
    if (last) await prisma.reply.delete({ where: { id: last.id } });
  }

  const count = await prisma.reply.count({ where: { inquiryId: id } });
  await prisma.inquiry.update({ where: { id }, data: { status: count > 0 ? '답변완료' : '대기' } });

  return NextResponse.json({ ok:true });
}