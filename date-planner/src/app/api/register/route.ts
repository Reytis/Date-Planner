import {prisma} from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

export async function POST(req: Request) {
  const authSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const body = await req.json();
  const parsed = authSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({error: "Invalid "}), {status: 400});
  }
  const {email, password} = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return Response.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return Response.json({ success: true, userId: user.id });
}
