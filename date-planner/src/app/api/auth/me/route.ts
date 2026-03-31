import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// API route handler for the GET method that retrieves the current authenticated user's information
export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session")?.value; // Get the session token from the request cookies
  if (!sessionToken) {
    return NextResponse.json({ user: null, LoggedIn: false }); // If there is no session token, return a response indicating that the user is not logged in
  }

  const payload = verifyToken(sessionToken); // Verify the session token and extract the payload, which should contain the user ID if the token is valid
  if (!payload) {
    return NextResponse.json({ user: null, LoggedIn: false }); // If the token is invalid (e.g. expired, tampered with), return a response indicating that the user is not logged in
  }

  // If the token is valid, query the database for the user's information using the user ID from the token payload, and return it in the response. If the user is not found (e.g. deleted), return null for the user and indicate that the user is not logged in.
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
    },
  })

  return NextResponse.json({ user: user || null, LoggedIn: !!user });
}