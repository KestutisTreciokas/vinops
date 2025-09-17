import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() });
}

export function HEAD() {
  return new Response(null, { status: 204 });
}
