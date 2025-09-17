import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const id = req.headers.get("x-request-id") ?? crypto.randomUUID();
  res.headers.set("x-request-id", id);
  return res;
}

// не трогаем статику
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
