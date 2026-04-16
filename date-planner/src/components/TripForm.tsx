import { useState } from "react";
import { Button } from "./Button"
import { CheckboxInput, DateTimeInput, FileInput, StringInput, StringType } from "./Inputs"
import { Label } from "./Label"
import { StopForm, TripFormType, TripPayload } from "@/types/tripform";
import { Stop } from "./Stop";
import { useAuth } from "@/hooks/useAuth";
import { dateToMinutes } from "@/functions/dateToInt";
import { StopFormComponent } from "./StopForm";
import { uploadFile } from "@/functions/upload";

export const TripForm = () => {
  const { account } = useAuth(); // get account if user is connected

  const [trip, setTrip] = useState<TripFormType>({ // current trip the user is creating
    Title: "",
    StartTime: new Date(),
    Stops: [],
    isPublic: true,
    coverImage: null,
    coverPublicId: null,
  });

  const [stop, setStop] = useState({ // current stop the user is creating
    Title: "",
    Address: {
      Street: "",
      PostalCode: "",
      City: "",
      Country: ""
    },
    Price: 0,
    Duration: null,
    Ticket: null,
    TicketPublicId: null,
    startTime: new Date(),
  } as StopForm);

  // add the stop to the trip 
  const addStop = () => {
    setTrip({...trip, Stops: [...trip.Stops, stop]});

    // reset after adding stop to trip
    setStop({
      Title: "",
      Address: {
        Street: "",
        PostalCode: "",
        City: "",
        Country: ""
      },
      Price: 0,
      Duration: null,
      Ticket: null,
      TicketPublicId: null,
      startTime: new Date(),
    } as StopForm);
  }

  // remove a stop 
  const removeStop = (index: number) => {
    setTrip({...trip, Stops: trip.Stops.filter((_, i) => i !== index)});
  }

  // create the trip and add it to db
  const createTrip = async () => {
    if (!account) {
      alert("You must be logged in to create a trip");
      return;
    }

    try {
      const cover = await uploadFile(trip.coverImage); // upload the cover and return {url, id}

      //process all stops in the trip
      const stops = await Promise.all(
        trip.Stops.map(async (stop) => {
          const ticket = await uploadFile(stop.Ticket); // upload the ticket and return {url, id}
          return {
            Title: stop.Title,
            Address: stop.Address,
            Price: stop.Price,
            DurationMinutes: dateToMinutes(stop.Duration),
            TicketUrl: ticket?.url,
            TicketPublicId: ticket?.publicId,
            startTime: stop.startTime ? stop.startTime.toISOString() : null,
          };
        })
      );

      // formated object to send to API to create type
      const payload: TripPayload = {
        Title: trip.Title,
        StartTime: trip.StartTime ? trip.StartTime.toISOString() : null,
        Stops: stops,
        isPublic: trip.isPublic,
        coverUrl: cover ? cover.url : null,
        coverPublicId: cover ? cover.publicId : null,
      };

      // fetch POST to add trip to DB
      await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: account.id,
          data: payload,
        }),
      });

      // reset after succes
      setTrip({
        Title: "",
        StartTime: new Date(),
        Stops: [],
        isPublic: true,
        coverImage: null,
        coverPublicId: null,
      });
      console.log("Trip created successfully");
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  }

  return <div className="min-h-screen">
    <h2 className="text-4xl">Create Trip</h2>
    <div>
      <div>
        <Label>Trip Name</Label>
        <StringInput 
          placeholder="Trip Name" 
          value={trip.Title} 
          onChange={(v) => setTrip({ ...trip, Title: v })} 
          type={StringType.Text}
        />
      </div>
      <div>
        <Label> Start Time</Label>
        <DateTimeInput
          placeholder="Start Time"
          value={trip.StartTime}
          onChange={(v) => setTrip({...trip, StartTime: v})}
        />
      </div>
      <div>
        <Label> Cover Image</Label>
        <FileInput
          placeholder="Cover Image"
          value={trip.coverImage}
          onChange={(v) => setTrip({ ...trip, coverImage: v })} 
          acceptedTypes={["image/jpeg","image/png"]}
        />
      </div>
      <div className="flex items-center gap-4 w-full">
        <Label>Private trip ?</Label>
        <CheckboxInput
          checked={!trip.isPublic}
          onChange={(v) => setTrip({...trip, isPublic: !v})}
        />
      </div>
      {/* separated form to add stop assure DRY */}
      <StopFormComponent addStop={addStop} stop={stop} setStop={setStop} />
    </div>
    <div>
      {/* LIST the current added stop */}
      <h3 className="text-2xl">Stops</h3>
      {trip.Stops.map((stop, index) => <Stop key={index} stop={stop} onDelete={() => removeStop(index)} />)}
    </div>
    <Button onClick={createTrip}>Save Trip</Button>
  </div>
}