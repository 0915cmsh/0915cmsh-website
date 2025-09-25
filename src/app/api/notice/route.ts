export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ JSON/경로 임포트에 의존하지 않는 인라인 Fallback
const FALLBACK_ITEMS = [
  {
    id: 270,
    title: 'CMSH 2025년 신규 AI 기반 인재 매칭 서비스 런칭',
    content: '임시 본문: AI 기반 인재 매칭의 주요 기능 소개(24시간 실시간 매칭, 역량/성향 기반 추천, 채용 리드타임 단축 등).',
    author: '관리자',
    published: true,
    createdAt: '2025-09-01T00:00:00.000Z',
    updatedAt: '2025-09-01T00:00:00.000Z',
  }
];

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.get('debug') === '1';

  // 🚨 임시 해결책: 항상 Fallback 데이터 반환 (Vercel 배포 문제 해결 전까지)
  console.log('🔍 API 호출됨 - Fallback 모드로 응답');
  return NextResponse.json({ 
    items: FALLBACK_ITEMS, 
    total: FALLBACK_ITEMS.length, 
    note: 'temporary-fallback-mode' 
  }, { status: 200 });

  // 아래 코드는 Vercel 문제 해결 후 활성화
  /*
  // 1) DB URL 자체가 없으면 즉시 Fallback
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ items: FALLBACK_ITEMS, total: FALLBACK_ITEMS.length, note: 'no-database-url' }, { status: 200 });
  }

  try {
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    // 2) DB 연결 OK이나 빈 DB → 임시 Fallback 허용(운영상 선택)
    if (process.env.NOTICE_FALLBACK === '1' && items.length === 0) {
      return NextResponse.json({ items: FALLBACK_ITEMS, total: FALLBACK_ITEMS.length, note: 'fallback-empty-db' }, { status: 200 });
    }

    return NextResponse.json({ items, total: items.length });
  } catch (e:any) {
    // 3) DB 에러/쿼리 에러 → 화면은 살린다
    if (process.env.NOTICE_FALLBACK === '1') {
      return NextResponse.json(
        { items: FALLBACK_ITEMS, total: FALLBACK_ITEMS.length, note: 'fallback-error', error: debug ? String(e?.message) : undefined },
        { status: 200 },
      );
    }
    return NextResponse.json({ items: [], total: 0, error: debug ? String(e?.message) : undefined }, { status: 500 });
  }
  */
}