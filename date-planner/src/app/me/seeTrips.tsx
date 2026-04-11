"use client";

import { Card } from "@/components/Card";
import { ListItem } from "@/components/ListItem";
import { useAccount } from "@/hooks/useAccount";
import { useState } from "react";

export const SeeTrips = () => {
  const [mode, setMode] = useState(true); // State to toggle between grid and list view
  const { trips } = useAccount(); // Get the user's trips from the useAccount hook

  return <div className="min-h-screen">
      <div className="max-w-lg mx-auto pt-12">
      <div className=" rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-8 font-mono ">Your Trips</h2>

        {/* Change the display view from grid to list and vice versa */}
        <button onClick={() => setMode(true)}>Grid</button>
        <button onClick={() => setMode(false)}>List</button>


        {
          trips.length === 0 ? 
            /* If the user has no trips, display a message prompting them to create one */
            <p>You have no trips yet. Create one to get started!</p> : 
            mode ? 

              /* If the user has trips and is in grid mode, display the trips in a grid layout using the Card component */
              <div className="grid grid-cols-1 gap-4">
                {trips.map((trip: any) => (
                  <Card key={trip.id} tipId={trip.id}>
                    <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                    <p>{trip.stops.length} stops</p>
                  </Card>
                ))}
              </div> : 

              /* If the user has trips and is in list mode, display the trips in a list layout using the ListItem component */
              <ul className="space-y-4">
                {trips.map((trip: any) => (
                  <ListItem key={trip.id} tripId={trip.id}>
                    <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                    <p>{trip.stops.length} stops</p>
                  </ListItem>
                ))}
              </ul>
        }
      </div>
    </div>
  </div>
}