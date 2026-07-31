import { useEffect, useState } from "react";
import { CtaGhost, CtaIcon, CtaPrimary, CtaSecondary } from "../../../components/Buttons/Cta"
import { Stop } from "./Stop";
import { useAuth } from "@/hooks/useAuth";
import { Bookmark, Calendar, Copy, Cross, Eye, Left, MapPin, Money, Redirect, Star, Timer } from "@/assets/icons/index";
import { useRouter } from "next/navigation";
import { TripData, TripType } from "@/types/trip";
import { getTotal, stopToForm } from "@/functions/utils";
import { Pill } from "@/components/Misc/Pill";
import { Separator, SeparatorAspect } from "@/components/Misc/Separator";
import { minutesToTimeString } from "@/functions/dateToInt";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { DataPill } from "@/components/Misc/DataPill";
import { Rating } from "@/components/Misc/Rating";


export const TripView = ({
  trip,
  isOwner
}: {
  trip: TripType;
  isOwner: boolean;
}) => {
  const { account } = useAuth(); // get account if user is connected
  const router = useRouter(); // get router to redirect if user dont want to create trip

  const [modal, setModal] = useState<"SeeStop" | null>(null); // modal to add for adding/editing stop
  const [OpenStopIndex, setOpenStopIndex] = useState<number>(0); // index to know wich stop to display when editing
  const [tripData, setTripData] = useState<TripData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/trips/${trip.id}/datas`)

      if (!res.ok) return;

      const data = await res.json()
      setTripData(data)
    }

    fetchData()
  }, [trip.id])

  const handleSeeStop = (index: number) => {
    setOpenStopIndex(index)
    setModal("SeeStop")
  }

  const {title, isPublic, stops, userId } = trip
  const {name, adress, startTime, duration, price } = stops[OpenStopIndex]
  const totalDuration = getTotal(stops, "duration")
  const totalPrice = getTotal(stops, "price")
  return <div className="min-h-screen max-h-screen max-w-md p-2 bg-background gap-6 flex flex-col relative">
    <div className="flex flex-col gap-2">
      <div className="max-w-lg flex justify-between items-center">
        <CtaGhost onClick={() => router.back()}><Left className="size-6" /> Back</CtaGhost>
        <Pill color="bg-foreground">{isPublic ? "Public" : "Private"}</Pill>
      </div>
      <h2 className="h2">{title}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DataPill tooltip={`(${tripData?.ratingsCount} reviews)`}><Star className="size-5" /> {tripData?.averageRating}</DataPill>
          <DataPill tooltip={"saves"}><Bookmark className="size-5" /> {tripData?.favoritesCount}</DataPill>
        </div>
        <Rating />
      </div>
      <ProfileCard userId={userId} />
      <div className="flex gap-1">
        <CtaSecondary onClick={() => {}}><Redirect className="size-6" /> Share</CtaSecondary>
        <CtaSecondary onClick={() => {}}><Copy className="size-6" /> Clone</CtaSecondary>
      </div>
    </div>
    <div className="relative gap-2 flex flex-col bg-background-2 rounded-xl max-h-full overflow-y-scroll no-scrollbar pb-24">

      {/* LIST the current added stop */}
      {stops.map((stop, index) => <Stop 
        key={index} 
        index={index} 
        editable 
        stop={stopToForm(stop)} 
        onClick={() => handleSeeStop(index)}/>)
      }

      {stops.length === 0 && 
      <p className="small-p text-foreground-4 self-center text-center m-6">
        No stop added yet. <br />
        Wich is pretty weird on a trip
      </p>}

      <div className=" flex items-center justify-between w-full bg-background-2 border-t border-background-3 absolute bottom-0 p-4">
        <div>
          <h4 className="overlined text-foreground-3">Total estimated</h4>
          <div className="flex items-center h3">{minutesToTimeString(totalDuration)} Hours <Separator aspect={SeparatorAspect.d} /> {totalPrice} €</div>
        </div>
        {isOwner && <CtaPrimary width="w-auto" onClick={() => {}}>Edit</CtaPrimary>}
      </div>
    </div>

    {/* faudra rajouter ca le sang
    <div>
      la tas les commentaires le sang
    </div> */}

    {modal && <div className="fixed w-full h-full flex items-center justify-center" onClick={() => setModal(null)}> 
      <div 
        className="bg-background rounded-xl shadow-2xl w-sm min-h-96 relative" 
        onClick={(e) => e.stopPropagation()}> {/* prevent click on modal to close it */}

        <div className="absolute top-4 right-4">
          <CtaIcon onClick={() => setModal(null)}><Cross className="size-6" /></CtaIcon>
        </div>

        {modal === "SeeStop" && 
          <div className="p-4 flex flex-col justify-between h-96">
            <div className="flex flex-col gap-1">
              <h3 className="h3">{name}</h3>
              <p className="small-caption flex items-center gap-0.5"><MapPin className="size-4" /> {adress}</p>
              <p className="small-caption flex items-center gap-0.5"><Calendar className="size-4" /> {startTime && new Date(startTime).toLocaleDateString()}</p>
              <div className="flex items-center gap-2">
                <p className="small-caption flex items-center gap-0.5"><Timer className="size-4" /> {minutesToTimeString(duration)}h</p>
                <p className="small-caption flex items-center gap-0.5"><Money className="size-4" /> {price}€</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <CtaSecondary onClick={() => {}}><Eye className="size-6" /> View Ticket</CtaSecondary>
              <CtaSecondary onClick={() => {}}><Cross className="size-6" /> Mark as cencelled</CtaSecondary>
              <CtaPrimary onClick={() => {}}>Open itinerary</CtaPrimary>
            </div>
          </div>
        }
      </div>
    </div>}
  </div>
}