import { deleteTrip, updateTrip, getTrip } from "@/services/trip.service";
import { TripUpdateDTO } from "@/types/tripform";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: tripId } = await context.params; // Identify the trip ID from URL path parameters
    if (!tripId) {
      return NextResponse.json({ error: "Trip ID is required" }, { status: 400 });
    }
    const trip = await getTrip(tripId);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json(trip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch trip" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: tripId } = await context.params; // Identify the trip ID from URL path parameters
    if (!tripId) {
      return NextResponse.json({ error: "Trip ID is required" }, { status: 400 });
    }

    // Call the deleteTrip function from the trip service
    const deletedTrip = await deleteTrip(tripId);
    if (!deletedTrip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json(deletedTrip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 });
  }
}

// Update a specific Trip to change his data
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body: TripUpdateDTO = await req.json();
    const { id: tripId } = await context.params;

    const updatedTrip = await updateTrip(tripId, body);

    return NextResponse.json(updatedTrip);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}
