export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    return NextResponse.json({ items: [], total: 0, error: e?.message }, { status: 500 });
  }
}