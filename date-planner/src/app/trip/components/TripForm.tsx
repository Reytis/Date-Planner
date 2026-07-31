import { useState } from "react";
import { CtaGhost, CtaIcon, CtaPrimary, CtaSecondary } from "../../../components/Buttons/Cta"
import { StopForm, TripFormType, TripPayload } from "@/types/tripform";
import { Stop } from "./Stop";
import { useAuth } from "@/hooks/useAuth";
import { dateToMinutes } from "@/functions/dateToInt";
import { StopFormComponent } from "./StopModal";
import { uploadFile } from "@/functions/upload";
import { DateTimeInput } from "../../../components/forms/inputs/DateInput";
import { FileInput } from "../../../components/forms/inputs/FileInput";
import { StringInput, StringType } from "../../../components/forms/inputs/StringInput";
import { Input } from "@/components/forms/Input";
import { Cross, Left, Plus } from "@/assets/icons/index";
import { ToggleInput } from "@/components/forms/inputs/Toggle";
import { useRouter } from "next/navigation";


export const TripForm = () => {
  const { account } = useAuth(); // get account if user is connected
  const router = useRouter(); // get router to redirect if user dont want to create trip

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

  const [modal, setModal] = useState<"AddStop" | "editStop" | null>(null); // modal to add for adding/editing stop
  const [EditStopIndex, setEditStopIndex] = useState<number | null>(null); // index to know wich stop to display when editing

  // handle edition of a stop, open the modal and set the current stop to the one being edited
  const handleEditStop = (index: number) => {
    setEditStopIndex(index);
    setModal("editStop");
  }

  // add the stop to the trip 
  const addStop = (stop: StopForm, id?: number) => {
    if (id !== undefined) { // if id is defined, we are editing an existing stop
      const updatedStops = [...trip.Stops];
      updatedStops[id] = stop;
      setTrip({ ...trip, Stops: updatedStops });
      setEditStopIndex(null); // reset the edit index after editing
    } else { // if id is not defined, we are adding a new stop
      setTrip({ ...trip, Stops: [...trip.Stops, stop] });
    }

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

    // Close modal after adding a stop
    setModal(null)
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

      router.push("/dashboard/trips")
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  }

  return <div className="min-h-screen max-h-screen max-w-md p-2 bg-background gap-6 flex flex-col relative">
    <div className="flex flex-col gap-4">
      <div className="max-w-lg flex justify-between items-center">
        <CtaGhost onClick={() => router.back()}><Left className="size-6" /> Cancel Trip</CtaGhost>
        <ToggleInput
          before="Private trip ?"
          checked={!trip.isPublic}
          onClick={() => setTrip({ ...trip, isPublic: !trip.isPublic })}
        />
      </div>
      <Input label="Trip Name">
        <StringInput 
          placeholder="Trip Name" 
          value={trip.Title} 
          onChange={(v) => setTrip({ ...trip, Title: v })} 
          type={StringType.Text}
        />
      </Input>
      <Input label="Start Time">
        <DateTimeInput
          placeholder="Start Time"
          value={trip.StartTime}
          onChange={(v) => setTrip({...trip, StartTime: v})}
        />
      </Input>
      <Input label="Cover">
        <FileInput
          placeholder="Cover Image"
          value={trip.coverImage}
          onChange={(v) => setTrip({ ...trip, coverImage: v })} 
          acceptedTypes={["image/jpeg","image/png"]}
        />
      </Input>
    </div>
    <div className="gap-2 flex flex-col bg-background-2 rounded-xl max-h-full overflow-y-scroll no-scrollbar pb-24">
      <div className="flex flex-col gap-2 p-2 bg-background-2 rounded-xl sticky top-0">
        {/*Open a Modal to use the form to add a Stop*/}
        <CtaSecondary onClick={() => setModal("AddStop")}><Plus className="size-6" /> Create new stop</CtaSecondary> 
        {/* <CtaSecondary onClick={() => setModal("night")}><Sleep className="size-6" /> Add night stop</CtaSecondary> */}
      </div>


      {/* LIST the current added stop */}
      {trip.Stops.map((stop, index) => <Stop 
        key={index} 
        index={index} 
        editable 
        stop={stop} 
        onClick={() => handleEditStop(index)} 
        onDelete={() => removeStop(index)} 
        onEdit={() => handleEditStop(index)} />)
      }

      {trip.Stops.length === 0 && 
      <p className="small-p text-foreground-4 self-center text-center m-6">
        No stop added yet. <br />
        click on "Create new stop" to add one.
      </p>}
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t-2 border-background-3">
      <CtaPrimary onClick={createTrip}>Save Trip</CtaPrimary>
    </div>

    {modal && <div className="fixed w-full h-full flex items-center justify-center" onClick={() => setModal(null)}> 
      <div 
        className="bg-background rounded-xl shadow-2xl w-sm min-h-96 relative" 
        onClick={(e) => e.stopPropagation()}> {/* prevent click on modal to close it */}

        <div className="absolute top-4 right-4">
          <CtaIcon onClick={() => setModal(null)}><Cross className="size-6" /></CtaIcon>
        </div>

        {modal === "AddStop" && 
          <StopFormComponent addStop={addStop} stop={stop} setStop={setStop} />
        }
        {modal === "editStop" && 
          <StopFormComponent ActualStop={trip.Stops[EditStopIndex!]} id={EditStopIndex!} addStop={addStop} />
        }
      </div>
    </div>}
  </div>
}