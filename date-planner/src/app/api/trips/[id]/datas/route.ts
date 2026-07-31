import { getTripData } from "@/services/trip.service";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: tripId } = await context.params; // Identify the trip ID from URL path parameters
    if (!tripId) {
      return NextResponse.json({ error: "Trip ID is required" }, { status: 400 });
    }
    const trip = await getTripData(tripId);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json(trip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch trip" }, { status: 500 });
  }
}