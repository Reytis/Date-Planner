import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value; // Retrieve the session token from the cookies of the incoming request

  // Define a boolean variable to determine if the requested path is public (e.g., authentication routes or API routes) that do not require authentication
  const isPublic = 
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname.startsWith("/api");

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token) {
    const user = verifyToken(token);

    if (!user && !isPublic) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}