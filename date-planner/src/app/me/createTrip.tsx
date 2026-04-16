"use client";

import { TripForm } from "@/components/TripForm";

// This page just handle the display of the trip form in its container
export const CreateTrip = () => {

  return <div className="min-h-screen">
      <div className="max-w-lg mx-auto pt-12">
      <div className=" rounded-lg shadow p-8">
        <TripForm />
      </div>
    </div>
  </div>
}