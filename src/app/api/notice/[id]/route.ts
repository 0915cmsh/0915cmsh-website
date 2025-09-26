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
    const mod = await import('@/fallback/notice.json');
    const arr = (mod as any).default ?? mod;
    return (arr as Notice[]).filter(n => n.published !== false);
  } catch (error) {
    console.error('Error loading snapshot:', error);
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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const snap = await loadSnapshot();
    const item = snap.find(n => n.id === id);
    return item ? NextResponse.json({ ok: true, item, note: 'snapshot' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  try {
    const prisma = await getPrisma();
    const item = await prisma.notice.findUnique({ where: { id } });
    return item ? NextResponse.json({ ok: true, item, note: 'db' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  } catch (e: any) {
    const snap = await loadSnapshot();
    const fall = snap.find(n => n.id === id);
    return fall
      ? NextResponse.json({ ok: true, item: fall, note: 'db-error-snapshot' })
      : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}

// PUT - 공지사항 수정
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 스냅샷 모드입니다. 공지사항 수정을 위해서는 DB 모드로 전환해주세요.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  try {
    const id = Number(params.id);
    const body = await req.json();
    const prisma = await getPrisma();
    
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
  } catch (e: any) {
    console.error('Error updating notice:', e);
    return NextResponse.json({ error: e?.message || '공지사항 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE - 공지사항 삭제
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 스냅샷 모드입니다. 공지사항 삭제를 위해서는 DB 모드로 전환해주세요.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  try {
    const id = Number(params.id);
    const prisma = await getPrisma();
    
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Error deleting notice:', e);
    return NextResponse.json({ error: e?.message || '공지사항 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
}