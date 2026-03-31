import { NextResponse } from "next/server";

// API route handler for logging out the user by clearing the session cookie and returning a success response
export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear the session cookie by setting it with an empty value and an expiration date in the past
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // Date passée = cookie expiré
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}