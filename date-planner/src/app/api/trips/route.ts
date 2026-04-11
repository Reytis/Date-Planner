import { NextResponse } from "next/server";
import { getTrips, createTrip } from "@/services/trip.service";

// Fetch all trips for a user
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // Identify the user ID from the url query parameters
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
    console.log("CREATE TRIP PAYLOAD", JSON.stringify(body));

    if (!body.data) {
      return NextResponse.json(
        { error: "Invalid request payload", details: "data is required" },
        { status: 400 }
      );
    }

    const trip = await createTrip({
      userId: body.userId,
      trip: body.data
    });
    return NextResponse.json(trip);
  } catch (err) {
    console.error("CREATE TRIP ERROR", err);
    return NextResponse.json(
      {
        error: "Failed to create trip",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};