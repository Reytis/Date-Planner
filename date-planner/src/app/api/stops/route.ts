import { NextResponse } from "next/server";
import { addStop } from "@/services/stop.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const stop = await addStop({
      ...body,
      startTime: new Date(body.startTime),
    });

    return NextResponse.json(stop);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add stop" },
      { status: 500 }
    );
  }
};