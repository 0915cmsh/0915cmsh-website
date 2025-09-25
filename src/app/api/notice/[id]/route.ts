export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';
import noticeSnapshot from '@/fallback/notice.json';

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

type Notice = { 
  id: number; 
  title: string; 
  content: string; 
  author?: string; 
  published?: boolean; 
  createdAt: string; 
  updatedAt?: string; 
};

const SNAP = (noticeSnapshot as Notice[]).filter(n => n.published !== false);

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const item = SNAP.find(n => n.id === id);
    return item ? NextResponse.json({ ok: true, item, note: 'snapshot' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  try {
    const prisma = await getPrisma();
    const item = await prisma.notice.findUnique({ where: { id } });
    return item ? NextResponse.json({ ok: true, item, note: 'db' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  } catch (e: any) {
    const fall = SNAP.find(n => n.id === id);
    return fall ? NextResponse.json({ ok: true, item: fall, note: 'db-error-snapshot', error: String(e?.message || e) }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    
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
  } catch (e) {
    console.error('Error updating notice:', e);
    return NextResponse.json({ error: '공지사항 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Error deleting notice:', e);
    return NextResponse.json({ error: '공지사항 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}