import { Button } from "@/components/Button"
import { StringInput, StringType, FileInput, DateTimeInput, CheckboxInput } from "@/components/Inputs"
import { Label, LabelSize } from "@/components/Label";
import { StopFormComponent } from "@/components/StopForm"
import { isoStringToDate } from "@/functions/dateToInt";
import { TripType } from "@/types/trip";

export const EditTrip = ({
  setMode,
  handleDeleteTrip,
  trip,
  setTrip,
  setNewCover,
  handleSaveStop,
  handleDeleteStop,
  handleSaveTrip,
  newCover
} : {
  setMode: Function;
  handleDeleteTrip: () => void;
  trip: TripType;
  setTrip: (t: TripType) => void;
  setNewCover: (v: File | null) => void;
  handleSaveStop: Function;
  handleDeleteStop: Function;
  handleSaveTrip: Function;
  newCover: File | null;
}) => {

  return <div>
    <Button onClick={() => setMode("view")}>Back to View Trip</Button>
    <Button onClick={handleDeleteTrip}>Delete Trip</Button>
    <StringInput value={trip.title} onChange={(v) => setTrip({ ...trip, title: v })} type={StringType.Text} />
    {trip.cover && <img src={trip.cover} alt="cover of the trip" />}
    <FileInput placeholder="Cover Image" value={null} onChange={(v) => setNewCover(v)} acceptedTypes={["image/jpeg","image/png"]} />
    <DateTimeInput value={isoStringToDate(trip.startDate!)} onChange={(v) => setTrip({ ...trip, startDate: v!.toISOString() })} />
    <h2>Stops</h2>
    {trip.stops.map((stop, index) => (
      <StopFormComponent key={index} ActualStop={stop} addStop={handleSaveStop} id={stop.id} deleteStop={handleDeleteStop} />
    ))}
    <div>
      <Label size={LabelSize.s}>Private ?</Label>
      <CheckboxInput checked={!trip.isPublic} onChange={(v) => setTrip({ ...trip, isPublic: !v })} />
    </div>
    <StopFormComponent addStop={handleSaveStop} />
    <Button onClick={() => handleSaveTrip({ newCover, trip })}>Save Trip</Button>
  </div>
}