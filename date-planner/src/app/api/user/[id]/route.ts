import { NextResponse } from "next/server";
import { getUserById } from "@/services/user.service";

// API route to get user details by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string}>}) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
};