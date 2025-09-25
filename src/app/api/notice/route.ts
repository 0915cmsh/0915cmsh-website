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

  console.log('🔍 API 호출됨 - 디버깅 모드');
  console.log('📊 환경변수 확인:');
  console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '설정됨' : '없음');
  console.log('  - NOTICE_FALLBACK:', process.env.NOTICE_FALLBACK || '없음');
  console.log('  - NODE_ENV:', process.env.NODE_ENV || '없음');

  // 1) DB URL 자체가 없으면 즉시 Fallback
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL이 설정되지 않음 - Fallback 모드');
    return NextResponse.json({ 
      items: FALLBACK_ITEMS, 
      total: FALLBACK_ITEMS.length, 
      note: 'no-database-url' 
    }, { status: 200 });
  }

  try {
    console.log('🔍 데이터베이스 쿼리 시도...');
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ 데이터베이스 쿼리 성공: ${items.length}개 공지사항 조회`);

    // 2) DB 연결 OK이나 빈 DB → 임시 Fallback 허용(운영상 선택)
    if (process.env.NOTICE_FALLBACK === '1' && items.length === 0) {
      console.log('⚠️ 데이터베이스가 비어있음 - Fallback 모드');
      return NextResponse.json({ 
        items: FALLBACK_ITEMS, 
        total: FALLBACK_ITEMS.length, 
        note: 'fallback-empty-db' 
      }, { status: 200 });
    }

    console.log('✅ 정상 데이터 반환');
    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    console.error('❌ 데이터베이스 오류:', e.message);
    
    // 3) DB 에러/쿼리 에러 → 화면은 살린다
    if (process.env.NOTICE_FALLBACK === '1') {
      console.log('⚠️ 데이터베이스 오류 - Fallback 모드');
      return NextResponse.json(
        { 
          items: FALLBACK_ITEMS, 
          total: FALLBACK_ITEMS.length, 
          note: 'fallback-error', 
          error: debug ? String(e?.message) : undefined 
        },
        { status: 200 },
      );
    }
    
    console.log('❌ Fallback 모드 비활성화 - 500 오류 반환');
    return NextResponse.json({ 
      items: [], 
      total: 0, 
      error: debug ? String(e?.message) : undefined 
    }, { status: 500 });
  }
}