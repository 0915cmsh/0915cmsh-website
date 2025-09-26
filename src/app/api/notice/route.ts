export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';

type Notice = { 
  id: number; 
  title: string; 
  content: string; 
  author?: string; 
  published?: boolean; 
  createdAt: string; 
  updatedAt?: string; 
};

async function loadSnapshot(): Promise<Notice[]> {
  try {
    // Vercel에서 안전한 경로로 수정
    const mod = await import('@/fallback/notice.json');
    const arr = (mod as any).default ?? mod;
    return (arr as Notice[]).filter(n => n.published !== false);
  } catch (error) {
    console.error('Error loading snapshot:', error);
    // fallback 데이터 반환
    return [
      {
        id: 270,
        title: "CMSH 2025년 신규 AI 기반 인재 매칭 서비스 런칭",
        content: "CMSH가 2025년 새로운 AI 기반 인재 매칭 서비스를 런칭합니다.\n\n주요 기능:\n- 24시간 실시간 인재 매칭\n- AI 기반 역량 및 성향 분석\n- 채용 리드타임 50% 단축\n- 맞춤형 인재 추천 시스템",
        author: "관리자",
        published: true,
        createdAt: "2025-09-01T00:00:00.000Z",
        updatedAt: "2025-09-01T00:00:00.000Z"
      },
      {
        id: 269,
        title: "CMSH 파견 서비스 확장 안내",
        content: "CMSH의 파견 서비스가 전국적으로 확장되었습니다.\n\n새로운 지역:\n- 경기권 (수원, 성남, 안양)\n- 충청권 (대전, 천안, 청주)\n- 영남권 (대구, 부산, 울산)",
        author: "관리자",
        published: true,
        createdAt: "2025-08-28T00:00:00.000Z",
        updatedAt: "2025-08-28T00:00:00.000Z"
      }
    ];
  }
}

// lazy prisma helper
type PrismaClientT = typeof import('@prisma/client').PrismaClient;
let _prisma: PrismaClientT | null = null;

async function getPrisma() {
  if (_prisma) return _prisma;
  const mod = await import('@prisma/client');
  _prisma = new mod.PrismaClient({
    log: process.env.VERCEL_ENV === 'production' ? ['error'] : ['warn', 'error'],
  });
  return _prisma;
}

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.get('debug') === '1';

  // 스냅샷 강제 or DB 미가용 → 스냅샷 반환
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const items = await loadSnapshot();
    return NextResponse.json({ items, total: items.length, note: 'snapshot' });
  }

  try {
    const prisma = await getPrisma();
    const items = await prisma.notice.findMany({ 
      where: { published: true }, 
      orderBy: { createdAt: 'desc' } 
    });
    
    if (!items.length) {
      const snap = await loadSnapshot();
      return NextResponse.json({ items: snap, total: snap.length, note: 'empty-db-snapshot' });
    }
    
    return NextResponse.json({ items, total: items.length, note: 'db' });
  } catch (e: any) {
    const snap = await loadSnapshot();
    return NextResponse.json(
      { 
        items: snap, 
        total: snap.length, 
        note: 'db-error-snapshot', 
        error: debug ? String(e?.message || e) : undefined 
      },
      { status: 200 }
    );
  }
}

// POST - 새 공지사항 작성
export async function POST(req: Request) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 스냅샷 모드입니다. 공지사항 작성을 위해서는 DB 모드로 전환해주세요.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  try {
    const prisma = await getPrisma();
    const body = await req.json();
    
    const newNotice = await prisma.notice.create({
      data: {
        title: body.title,
        content: body.content,
        author: body.author || '관리자',
        published: body.published ?? true,
      },
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (e: any) {
    console.error('Error creating notice:', e);
    return NextResponse.json({ error: e?.message || '공지사항 작성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}