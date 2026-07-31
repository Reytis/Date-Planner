import { NextResponse } from "next/server";
import { getUserCard } from "@/services/user.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const viewerId = searchParams.get("viewerId");

    if (!viewerId) {
      return NextResponse.json(
        { error: "viewerId is required" },
        { status: 400 }
      );
    }

    const user = await getUserCard(id, viewerId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user card" },
      { status: 500 }
    );
  }
}