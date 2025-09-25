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

function fromSnapshot(): Notice[] {
  return (noticeSnapshot as Notice[]).filter(n => n.published !== false);
}

export async function GET() {
  console.log('🔍 공지사항 API 호출됨');
  console.log('📊 런타임 모드:', READ_MODE);
  console.log('📊 DB 사용 가능:', CAN_USE_DB);

  // 스냅샷 모드이면 즉시 스냅샷 데이터 반환
  if (READ_MODE === 'snapshot') {
    console.log('📸 스냅샷 모드 - 스냅샷 데이터 반환');
    const items = fromSnapshot();
    return NextResponse.json({ items, total: items.length, note: 'snapshot' });
  }

  // DB 사용 불가능하면 스냅샷 데이터 반환
  if (!CAN_USE_DB) {
    console.log('❌ DB 사용 불가 - 스냅샷 데이터 반환');
    const items = fromSnapshot();
    return NextResponse.json({ items, total: items.length, note: 'no-db-snapshot' });
  }

  try {
    console.log('🔍 데이터베이스 쿼리 시도...');
    const items = await prisma.notice.findMany({ 
      where: { published: true }, 
      orderBy: { createdAt: 'desc' } 
    });
    
    console.log(`✅ 데이터베이스 쿼리 성공: ${items.length}개 공지사항 조회`);
    
    // DB가 비어있으면 스냅샷 데이터 반환
    if (!items.length) {
      console.log('⚠️ DB가 비어있음 - 스냅샷 데이터 반환');
      const snap = fromSnapshot();
      return NextResponse.json({ items: snap, total: snap.length, note: 'empty-db-snapshot' });
    }
    
    console.log('✅ 정상 데이터 반환');
    return NextResponse.json({ items, total: items.length, note: 'db' });
  } catch (e: any) {
    console.error('❌ 데이터베이스 오류:', e.message);
    console.log('⚠️ DB 오류 - 스냅샷 데이터 반환');
    const snap = fromSnapshot();
    return NextResponse.json({ items: snap, total: snap.length, note: 'db-error-snapshot' });
  }
}