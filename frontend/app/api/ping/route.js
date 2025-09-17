export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  return new Response(JSON.stringify({ pong: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
