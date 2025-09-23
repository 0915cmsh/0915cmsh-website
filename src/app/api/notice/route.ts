export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 안전한 동적 임포트 (파일 없으면 빈 배열 반환)
async function getFallback() {
  try {
    const mod = await import('@/data/fallback/notices.json');
    return (mod as any).default ?? [];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.get('debug') === '1';

  // 1) DB URL 자체가 없으면 즉시 fallback
  if (!process.env.DATABASE_URL) {
    const fb = await getFallback();
    return NextResponse.json({ items: fb, total: fb.length, note: 'no-database-url' }, { status: 200 });
  }

  try {
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    // 2) DB 연결 OK인데 데이터 0개 + Fallback 모드 켬 → 보정
    if (process.env.NOTICE_FALLBACK === '1' && items.length === 0) {
      const fb = await getFallback();
      return NextResponse.json({ items: fb, total: fb.length, note: 'fallback-empty-db' }, { status: 200 });
    }

    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    // 3) 에러여도 사용자 화면 빈화면 방지
    if (process.env.NOTICE_FALLBACK === '1') {
      const fb = await getFallback();
      return NextResponse.json(
        { items: fb, total: fb.length, note: 'fallback-error', error: debug ? String(e?.message) : undefined },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { items: [], total: 0, error: debug ? String(e?.message) : undefined },
      { status: 500 },
    );
  }
}