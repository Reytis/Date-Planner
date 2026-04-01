import { NextResponse } from "next/server";
import { deleteStop, updateStop } from "@/services/stop.service";

// Delete a stop by its ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extract the stop ID from the route parameters

    // Call the deleteStop function from the stop service
    await deleteStop(id);
    return NextResponse.json({ message: "Stop deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete stop" }, { status: 500 });
  }
}

// Update a stop by its ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id } = params; // Extract the stop ID from the route parameters

    // Call the updateStop function from the stop service
    const updatedStop = await updateStop(id, {
      ...body,
    });
    return NextResponse.json(updatedStop);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update stop" }, { status: 500 });
  }
}