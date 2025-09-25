export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const [noticeCount, inquiryCount] = await Promise.all([
      prisma.notice.count().catch((e)=>({__error:String(e)} as any)),
      prisma.inquiry.count().catch((e)=>({__error:String(e)} as any)),
    ]);
    return NextResponse.json({ ok: true, noticeCount, inquiryCount });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message ?? 'unknown' }, { status:500 });
  }
}