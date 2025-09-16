import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('pageSize') || '10');

  // published가 true인 공지사항만 조회
  const where = {
    published: true
  };

  const [total, items] = await Promise.all([
    prisma.notice.count({ where }),
    prisma.notice.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.notice.create({
    data: {
      title: body.title,
      content: body.content,
      author: body.author || '관리자',
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ id: created.id }, { status: 201 });
}