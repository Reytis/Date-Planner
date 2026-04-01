import { NextResponse } from "next/server";
import { getTrips, createTrip } from "@/services/trip.service.js";

// Fetch all trips for a user
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // Identify the user ID from the request body or authentication context
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const trips = await getTrips(userId);

    return NextResponse.json(trips);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
};

// Create a new trip for a user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const trip = await createTrip({
      title: body.title,
      userId: body.userId, // Identify the user ID from the request body or authentication context
    });
    return NextResponse.json(trip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
};