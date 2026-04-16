import { Button } from "@/components/Button"
import { minutesToTimeString } from "@/functions/dateToInt"
import { fileToInline } from "@/functions/utils";
import { TripType } from "@/types/trip"

export const TripView = ({
  trip,
  username,
  handleDeleteTrip,
  setMode,
  isOwner
} : {
  trip: TripType;
  username: String;
  handleDeleteTrip: () => void;
  setMode: Function;
  isOwner: Boolean
}) => {

  console.log(trip)

  return <div>
    {isOwner && <div>
      <Button onClick={() => setMode("edit")}>Edit Trip</Button>
      <Button onClick={handleDeleteTrip}>Delete Trip</Button>
    </div>}
    <h1>{trip.title}</h1>
    {trip.cover && <img src={trip.cover} alt="cover of the trip" />}
    <p>{new Date(trip.startDate).toLocaleString("fr-FR")}</p>
    <p>{username}</p>
    <h2>Stops</h2>
    {trip.stops.map((stop, index) => (
      <div key={index}>
        <h3>{stop.name}</h3>
        <p>{stop.adress}, {stop.postalCode} {stop.city}, {stop.country}</p>
        <p>Price: {stop.price}</p>
        <p>Duration: {minutesToTimeString(stop.duration)}</p>
        <p>Start Time: {stop.startTime ? new Date(stop.startTime).toLocaleString("fr-FR") : "N/A"}</p>
        <p>Ticket: {stop.ticket ? 
          <a href={fileToInline(stop.ticket)} target="_blank" rel="noopener noreferrer">View Ticket</a> : "No ticket"}
        </p>
      </div>
    ))}
    <p>{trip.isPublic ? 'Public' : 'Private'}</p>
  </div>
}