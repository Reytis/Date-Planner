import {prisma} from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

// API route handler for user registration and creates a new user in the database.
export async function POST(req: Request) {
  const authSchema = z.object({
    email: z.email(),// Validate that the email is in a valid format
    password: z.string().min(8),// Validate that the password is at least 8 characters long
  });

  const body = await req.json();
  const parsed = authSchema.safeParse(body);// Parse and validate the request body against the defined schema

  if (!parsed.success) {
    return new Response(JSON.stringify({error: "Invalid input"}), {status: 400});
  }
  const {email, password} = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } }); // Check if a user with the provided email already exists in the database

  // If a user with the provided email already exists, return a 400 response with an error message indicating that the user already exists
  if (existing) {
    return Response.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash the provided password using bcrypt with a salt rounds of 10 to securely store the password in the database

  // Create a new user in the database 
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return Response.json({ success: true, userId: user.id });
}
