import {prisma} from "@/lib/db";
import bcrypt from "bcrypt";
import {signToken} from "@/lib/auth";
import { NextResponse } from "next/server";
import z from "zod";

// API route handler for logging in the user by validating the provided email and password, generating a session token, and setting it in a cookie
export async function POST(req: Request) {
  const authSchema = z.object({
    email: z.email(),// Validate that the email is a valid email address
    password: z.string().min(8),// Validate that the password is at least 8 characters long
  });

  const body = await req.json();
  const parsed = authSchema.safeParse(body); // Parse and validate the request body against the defined schema

  if (!parsed.success) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400}); // If the validation fails, return a 400 Bad Request response with an error message
  }
  const {email, password} = parsed.data;

  const user = await prisma.user.findUnique({where: {email}}); // Look up the user in the database

  if (!user) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400});// If the user is not found, return a 400 Bad Request response with an error message
  }

  const valid = await bcrypt.compare(password, user.password);// Compare the provided password with the hashed password stored in the database using bcrypt

  if (!valid) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400});// If the password is invalid, return a 400 Bad Request response with an error message
  }

  const token = signToken(user.id); // If the login is successful, generate a session token using the user's ID and the signToken function
  
  // Create a JSON response containing the success status and the user data (excluding the password) to be sent back to the client
  const res = NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email }
  });

  // Set the session token in a cookie with appropriate options such as httpOnly, sameSite, path, expiration, and secure flag based on the environment
  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}