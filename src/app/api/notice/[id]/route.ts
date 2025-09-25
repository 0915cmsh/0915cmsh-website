export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';
import noticeSnapshot from '@/fallback/notice.json';

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
  
  console.log('🔍 개별 공지사항 API 호출됨 - ID:', id);
  console.log('📊 런타임 모드:', READ_MODE);
  console.log('📊 DB 사용 가능:', CAN_USE_DB);

  // 스냅샷 모드이거나 DB 사용 불가능하면 스냅샷에서 검색
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    console.log('📸 스냅샷 모드 - 스냅샷에서 검색');
    const item = SNAP.find(n => n.id === id);
    if (item) {
      console.log('✅ 스냅샷에서 공지사항 발견');
      return NextResponse.json({ ok: true, item, note: 'snapshot' });
    } else {
      console.log('❌ 스냅샷에서 공지사항을 찾을 수 없음');
      return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
    }
  }

  try {
    console.log('🔍 데이터베이스에서 검색 시도...');
    const item = await prisma.notice.findUnique({ where: { id } });
    
    if (item) {
      console.log('✅ 데이터베이스에서 공지사항 발견');
      return NextResponse.json({ ok: true, item, note: 'db' });
    } else {
      console.log('❌ 데이터베이스에서 공지사항을 찾을 수 없음 - 스냅샷에서 재검색');
      // DB에서 찾을 수 없으면 스냅샷에서 재검색
      const fall = SNAP.find(n => n.id === id);
      if (fall) {
        console.log('✅ 스냅샷에서 공지사항 발견');
        return NextResponse.json({ ok: true, item: fall, note: 'db-not-found-snapshot' });
      } else {
        console.log('❌ 스냅샷에서도 공지사항을 찾을 수 없음');
        return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
      }
    }
  } catch (e: any) {
    console.error('❌ 데이터베이스 오류:', e.message);
    console.log('⚠️ DB 오류 - 스냅샷에서 재검색');
    const fall = SNAP.find(n => n.id === id);
    if (fall) {
      console.log('✅ 스냅샷에서 공지사항 발견');
      return NextResponse.json({ ok: true, item: fall, note: 'db-error-snapshot' });
    } else {
      console.log('❌ 스냅샷에서도 공지사항을 찾을 수 없음');
      return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
    }
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