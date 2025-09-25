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
    // alias 문제를 피하려면 상대경로 동적 import 사용
    const mod = await import('../../../fallback/notice.json');
    const arr = (mod as any).default ?? mod;
    return (arr as Notice[]).filter(n => n.published !== false);
  } catch {
    return [];
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