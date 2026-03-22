import {prisma} from "@/lib/db";
import bcrypt from "bcrypt";
import {signToken} from "@/lib/auth";
import { NextResponse } from "next/server.js";
import z from "zod";

export async function POST(req: Request) {
  const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const body = await req.json();
  const parsed = authSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400});
  }
  const {email, password} = parsed.data;

  const user = await prisma.user.findUnique({where: {email}});

  if (!user) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400});
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return new Response(JSON.stringify({error: "Invalid email or password"}), {status: 400});
  }

  const token = signToken(user.id);
  
  const res = NextResponse.json({success: true});

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}