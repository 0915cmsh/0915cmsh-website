export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';
import inquirySnapshot from '@/fallback/inquiry.json';

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

// GET - 문의 목록 조회
export async function GET() {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const items = (inquirySnapshot as any[]).map(x => ({ 
      ...x, 
      status: x?.Reply?.length ? '답변완료' : '대기' 
    }));
    return NextResponse.json({ items, total: items.length, note: 'snapshot' });
  }

  try {
    const prisma = await getPrisma();
    const items = await prisma.inquiry.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      include: { Reply: { select: { id: true } } }
    });
    
    const mapped = items.map(x => ({ 
      ...x, 
      status: x.Reply.length ? '답변완료' : '대기' 
    }));
    
    return NextResponse.json({ items: mapped, total: mapped.length, note: 'db' });
  } catch (e: any) {
    const snap = (inquirySnapshot as any[]).map(x => ({ 
      ...x, 
      status: x?.Reply?.length ? '답변완료' : '대기' 
    }));
    return NextResponse.json({ 
      items: snap, 
      total: snap.length, 
      note: 'db-error-snapshot', 
      error: String(e?.message || e) 
    }, { status: 200 });
  }
}

// POST - 문의 작성 (스냅샷 모드/DB 미연결 시 503으로 안내)
export async function POST(req: Request) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 점검 중입니다. 문의는 이메일로 부탁드립니다.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  return NextResponse.json({ error: 'Not Implemented' }, { status: 501 });
}