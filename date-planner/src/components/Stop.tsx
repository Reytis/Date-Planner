import { StopForm } from "@/types/tripform"
import { Button } from "./Button"
import { dateToMinutes, minutesToTimeString } from "@/functions/dateToInt";

// display Stop components
export const Stop = ({ stop, onDelete }: { stop: StopForm; onDelete: () => void }) => {
  return <div>
    <h4>{stop.Title}</h4>
    <p>{stop.Address.Street}, {stop.Address.PostalCode} {stop.Address.City}</p>
    <p>Price: {stop.Price}</p>
    <p>Duration: {minutesToTimeString(dateToMinutes(stop.Duration))}</p>
    <p>Ticket: {stop.Ticket ? stop.Ticket.name : "No ticket"}</p>
    <Button onClick={onDelete}>Delete Stop</Button>
  </div>
}