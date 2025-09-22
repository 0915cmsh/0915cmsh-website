export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fallback from '@/data/fallback/notices.json';

export async function GET() {
  try {
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // 데이터가 없고 Fallback 모드가 활성화된 경우
    if (process.env.NOTICE_FALLBACK === '1' && items.length === 0) {
      return NextResponse.json({ 
        items: fallback, 
        total: fallback.length, 
        note: 'fallback-mode-active' 
      });
    }
    
    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    // 에러 발생 시 Fallback 모드가 활성화된 경우
    if (process.env.NOTICE_FALLBACK === '1') {
      return NextResponse.json({ 
        items: fallback, 
        total: fallback.length, 
        error: e?.message, 
        note: 'fallback-due-to-error' 
      }, { status: 200 });
    }
    
    return NextResponse.json({ items: [], total: 0, error: e?.message }, { status: 500 });
  }
}