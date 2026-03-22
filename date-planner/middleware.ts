import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isPublic = 
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/api");

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const user = verifyToken(token);

    if (!user && !isPublic) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}