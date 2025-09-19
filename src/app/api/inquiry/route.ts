export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    return NextResponse.json({ items: [], total: 0, error: e?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const saved = await prisma.inquiry.create({ data });
    return NextResponse.json(saved, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 400 });
  }
}