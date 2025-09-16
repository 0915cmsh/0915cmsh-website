import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: notice });
  } catch (e) {
    console.error('Error fetching notice:', e);
    return NextResponse.json({ error: '공지사항 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await req.json();
    
    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        author: body.author || '관리자',
        published: body.published ?? true,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ ok: true, item: updated });
  } catch (e) {
    console.error('Error updating notice:', e);
    return NextResponse.json({ error: '공지사항 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Error deleting notice:', e);
    return NextResponse.json({ error: '공지사항 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}