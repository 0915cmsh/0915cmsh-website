import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 개별 문의 조회
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { replies: true },
    });

    if (!inquiry) {
      return NextResponse.json({ error: '문의를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (e) {
    console.error('Error fetching inquiry:', e);
    return NextResponse.json({ error: '문의 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 개별 문의 수정
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await req.json();
    const { title, message, name, phone, email } = body;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        title,
        message,
        name,
        phone,
        email: email ?? null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (e) {
    console.error('Error updating inquiry:', e);
    return NextResponse.json({ error: '문의 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 개별 문의 삭제
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Error deleting inquiry:', e);
    return NextResponse.json({ error: '문의 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}