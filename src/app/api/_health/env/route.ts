export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.DATABASE_URL || '';
  const masked = url ? url.replace(/:\w+@/, '://***@').replace(/(api_key=)[^&]+/, '$1***') : '';
  return NextResponse.json({
    runtime: 'nodejs',
    vercelEnv: process.env.VERCEL_ENV || 'unknown',    // production | preview | development
    hasDATABASE_URL: !!process.env.DATABASE_URL,
    databaseUrlMasked: masked,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}