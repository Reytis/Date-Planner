import { useState } from "react";
import { Button } from "./Button"
import { CheckboxInput, DateTimeInput, FileInput, StringInput, StringType, TimeInput } from "./Inputs"
import { Label, LabelSize } from "./Label"
import { StopForm, TripFormType, TripPayload } from "@/types/tripform";
import { Stop } from "./Stop";
import { useAuth } from "@/hooks/useAuth";
import { dateToMinutes } from "@/functions/dateToInt";

export const TripForm = () => {
  const { account } = useAuth();

  const [trip, setTrip] = useState<TripFormType>({
    Title: "",
    StartTime: new Date(),
    Stops: [],
    isPublic: true,
    coverImage: null
  });

  const [stop, setStop] = useState({
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
    startTime: new Date(),
  } as StopForm);

  const addStop = () => {
    setTrip({...trip, Stops: [...trip.Stops, stop]});
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
      startTime: new Date(),
    } as StopForm);
  }

  const removeStop = (index: number) => {
    setTrip({...trip, Stops: trip.Stops.filter((_, i) => i !== index)});
  }

  const uploadFile = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Upload failed");
    }

    return json.url;
  };

  const createTrip = async () => {
    if (!account) {
      alert("You must be logged in to create a trip");
      return;
    }

    try {
      const coverUrl = await uploadFile(trip.coverImage);
      const stops = await Promise.all(
        trip.Stops.map(async (stop) => {
          const ticketUrl = await uploadFile(stop.Ticket);
          return {
            Title: stop.Title,
            Address: stop.Address,
            Price: stop.Price,
            DurationMinutes: dateToMinutes(stop.Duration),
            TicketUrl: ticketUrl,
            startTime: stop.startTime ? stop.startTime.toISOString() : null,
          };
        })
      );

      const payload: TripPayload = {
        Title: trip.Title,
        StartTime: trip.StartTime ? trip.StartTime.toISOString() : null,
        isPublic: trip.isPublic,
        coverUrl: coverUrl,
        Stops: stops,
      };

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

      setTrip({
        Title: "",
        StartTime: new Date(),
        Stops: [],
        isPublic: true,
        coverImage: null,
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
      <div>
        <Label> Add Stop</Label>
        <div>
          <div>
            <Label size={LabelSize.s} >Name</Label>
            <StringInput
              placeholder="Name"
              value={stop.Title}
              onChange={(v) => setStop({ ...stop, Title: v })}
              type={StringType.Text}
            />
          </div>
          <div>
            <Label size={LabelSize.s} >Start Time</Label>
            <DateTimeInput
              placeholder="Start Time"
              value={stop.startTime}
              onChange={(v) => setStop({ ...stop, startTime: v })}
            />
          </div>
          <div>
            <Label size={LabelSize.s} >Adresse</Label>
            <div>
              <div>
                <Label size={LabelSize.xs}>N*, Street</Label>
                <StringInput
                  placeholder="N*, Street"
                  value={stop.Address.Street}
                  onChange={(v) => { setStop({...stop, Address: {...stop.Address, Street: v}})}}
                  type={StringType.Text}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <Label size={LabelSize.xs}>City</Label>
                  <StringInput
                    placeholder="City"
                    value={stop.Address.City}
                    onChange={(v) => { setStop({...stop, Address: {...stop.Address, City: v}})}}
                    type={StringType.Text}
                  />
                </div>
                <div>
                  <Label size={LabelSize.xs}>Postal Code</Label>
                  <StringInput
                    placeholder="Postal Code"
                    value={stop.Address.PostalCode}
                    onChange={(v) => { setStop({...stop, Address: {...stop.Address, PostalCode: v}})}}
                    type={StringType.Text}
                  />
                </div>
              </div>
              <div>
                <Label size={LabelSize.xs}>Country</Label>
                <StringInput
                  placeholder="Country"
                  value={stop.Address.Country}
                  onChange={(v) => { setStop({...stop, Address: {...stop.Address, Country: v}})}}
                  type={StringType.Text}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label size={LabelSize.s}>Price</Label>
              <StringInput
                placeholder="Price"
                value={stop.Price.toString()}
                onChange={(v) => {
                  const price = parseFloat(v);
                  if (!isNaN(price)) {
                    setStop({...stop, Price: price});
                  }
                }}
                type={StringType.Text}
              />
            </div>
            <div>
              <Label size={LabelSize.s}>Duration</Label>
              <TimeInput
                placeholder="Duration"
                value={stop.Duration}
                onChange={(v) => setStop({...stop, Duration: v})}
              />
            </div>
          </div>
          <div>
            <Label size={LabelSize.s}>Ticket</Label>
            <FileInput
              placeholder="Ticket"
              value={stop.Ticket}
              onChange={(v) => setStop({ ...stop, Ticket: v })} 
              acceptedTypes={["image/jpeg","image/png"]} 
            />
          </div>
          <Button onClick={addStop}>Add Stop</Button>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-2xl">Stops</h3>
      {trip.Stops.map((stop, index) => <Stop key={index} stop={stop} onDelete={() => removeStop(index)} />)}
    </div>
    <Button onClick={createTrip}>Save Trip</Button>
  </div>
}