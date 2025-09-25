export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';
import inquirySnapshot from '@/fallback/inquiry.json';

// GET - 문의 목록 조회
export async function GET() {
  console.log('🔍 문의 목록 API 호출됨');
  console.log('📊 런타임 모드:', READ_MODE);
  console.log('📊 DB 사용 가능:', CAN_USE_DB);

  // 스냅샷 모드이거나 DB 사용 불가능하면 스냅샷 데이터 반환
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    console.log('📸 스냅샷 모드 - 스냅샷 데이터 반환');
    const items = (inquirySnapshot as any[]).map(x => ({ 
      ...x, 
      status: x?.Reply?.length ? '답변완료' : '대기' 
    }));
    return NextResponse.json({ items, total: items.length, note: 'snapshot' });
  }

  try {
    console.log('🔍 데이터베이스 쿼리 시도...');
    const items = await prisma.inquiry.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      include: { Reply: { select: { id: true } } }
    });
    
    console.log(`✅ 데이터베이스 쿼리 성공: ${items.length}개 문의 조회`);
    
    const mapped = items.map(x => ({ 
      ...x, 
      status: x.Reply.length ? '답변완료' : '대기' 
    }));
    
    console.log('✅ 정상 데이터 반환');
    return NextResponse.json({ items: mapped, total: mapped.length, note: 'db' });
  } catch (e: any) {
    console.error('❌ 데이터베이스 오류:', e.message);
    console.log('⚠️ DB 오류 - 스냅샷 데이터 반환');
    const snap = (inquirySnapshot as any[]).map(x => ({ 
      ...x, 
      status: x?.Reply?.length ? '답변완료' : '대기' 
    }));
    return NextResponse.json({ items: snap, total: snap.length, note: 'db-error-snapshot' });
  }
}

// POST - 문의 작성 (스냅샷 모드/DB 미연결 시 503으로 안내)
export async function POST(req: Request) {
  console.log('🔍 문의 작성 API 호출됨');
  console.log('📊 런타임 모드:', READ_MODE);
  console.log('📊 DB 사용 가능:', CAN_USE_DB);

  // 스냅샷 모드이거나 DB 사용 불가능하면 503 에러 반환
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    console.log('📸 스냅샷 모드 - 문의 작성 차단');
    return NextResponse.json({ 
      error: '현재 점검 중입니다. 문의는 이메일로 부탁드립니다.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  // TODO: DB 사용 가능해지면 Zod 검증 + bcrypt 해시 저장 로직 활성화
  return NextResponse.json({ error: 'Not Implemented' }, { status: 501 });
}