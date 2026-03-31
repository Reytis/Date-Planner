import { NextResponse } from "next/server";
import { getTrips, createTrip } from "@/services/trip.service.js";

export async function GET() {
  try {
    const userId = "demo-user-id"; // Replace with actual user ID retrieval logic
    const trips = await getTrips(userId);

    return NextResponse.json(trips);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const trip = await createTrip({
      title: body.title,
      userId: "demo-user-id", // Replace with actual user ID retrieval logic
    });
    return NextResponse.json(trip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
};