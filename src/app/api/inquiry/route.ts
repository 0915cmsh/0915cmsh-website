import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendInquiryMail } from '@/lib/email';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = Number(searchParams.get('pageSize') ?? 10);
  const skip = Math.max(0, (page - 1) * pageSize);

  const [total, items] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      skip, take: pageSize,
      include: { replies: true },
    }),
  ]);

  // 상태를 replies 배열의 존재 여부에 따라 올바르게 계산
  const itemsWithCorrectStatus = items.map(item => ({
    ...item,
    status: item.replies && item.replies.length > 0 ? '답변완료' : '대기'
  }));

  return NextResponse.json({ items: itemsWithCorrectStatus, total });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, title, name, phone, email, content, password } = body ?? {};

    if (!type || !title || !name || !phone || !content || !password) {
      return NextResponse.json({ ok:false, message:'필수값 누락' }, { status: 400 });
    }

    // 1) DB 저장 (오늘 날짜)
    const saved = await prisma.inquiry.create({
      data: {
        type, title, name, phone, email: email ?? null, password,
        message: content, status: '대기', createdAt: new Date(),
      },
    });

    // 2) 이메일 발송 (실패해도 저장은 유지)
    let emailSent = true;
    try {
      await sendInquiryMail({ type, title, name, phone, email, content });
    } catch (e) {
      emailSent = false;
      console.error('Email send failed:', e);
    }

    return NextResponse.json({ ok:true, item: saved, emailSent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok:false, message:'SERVER_ERROR' }, { status: 500 });
  }
}