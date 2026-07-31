"use client";

import { TripType } from "@/types/trip.js";
import { TripView } from "./components/TripView";

// This page just handle the display of the trip form in its container
export const ViewTrip = ({
  trip,
  author,
  isOwner,
  setMode
}: {
  trip: TripType;
  author: string;
  isOwner: boolean;
  setMode: (mode: string) => void
}) => {

  return <div className="bg-gray-400">
    <TripView trip={trip} isOwner={isOwner} />
  </div>
}