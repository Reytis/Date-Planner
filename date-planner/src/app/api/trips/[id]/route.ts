import { deleteTrip, updateTrip, getTrip } from "@/services/trip.service";
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

export async function PATCH(req: Request , context: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { id: tripId } = await context.params; // Identify the trip ID from URL path parameters
    const updateData = body.updateData; // Identify the update data from the request body

    // Call the updateTrip function from the trip service
    const updatedTrip = await updateTrip(tripId, updateData);
    if (!updatedTrip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTrip);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}
