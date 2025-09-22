export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [noticeCount, inquiryCount] = await Promise.all([
      prisma.notice.count(),
      prisma.inquiry.count(),
    ]);
    
    return NextResponse.json({ 
      ok: true, 
      noticeCount, 
      inquiryCount,
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (e: any) {
    return NextResponse.json({ 
      ok: false, 
      error: e?.message,
      timestamp: new Date().toISOString(),
      database: 'error'
    }, { status: 500 });
  }
}
