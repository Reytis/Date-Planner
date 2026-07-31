import { TripType } from "@/types/trip.js"
import { ActionTripCard } from "./components/ActionTripCard"

export const TripGrid = ({
  trips,
  gridName
}: {
  trips: TripType[];
  gridName: string;
}) => {

  return <article className="flex flex-col gap-8">
    <h3 className="h3">{gridName}</h3>
    {trips.length === 0 && <p className="text-foreground-4">No trips found, let's get some !</p>}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {trips.map((trip) => {
        return <ActionTripCard key={trip.id} trip={trip} />
      })}
    </div>
  </article>
}