import { Profile } from "@/assets/icons/index"
import { CheckboxInput } from "@/components/forms/inputs/Checkbox"
import { getUsername } from "@/functions/users"
import { TripType } from "@/types/trip"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const ActionTripCard = ({
  trip,
}: {
  trip: TripType
}) => {
  const [author, setAuthor] = useState<string>("")
  const router = useRouter() // get router to handle back button and history version
  
  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(trip.userId);
      setAuthor(username);
    };
    
    fetchUsername();
  }, [trip.userId]);

  return <div onClick={() => router.push("/trip?id=" + trip.id)} className="group relative rounded-xl w-sm h-56 overflow-hidden flex flex-col cursor-pointer justify-center items-center">
    {trip.cover && <img className="w-full h-full object-cover" src={trip.cover} alt={trip.title} />}
    <div className="text-saved-white absolute left-4 bottom-4 translate-y-20 transition-all duration-200 group-hover:translate-y-0">
      <h4 className="h4">{trip.title}</h4>
      <div className="flex items-center">
        <Profile className="size-4" />
        <p>{author}</p>
      </div>
    </div>
    <div className="absolute bg-background rounded-lg top-4 right-4 -translate-y-20 px-2 transition-all duration-200 group-hover:translate-y-0">
      <CheckboxInput label="Select" checked={false} onChange={() => {}} />
    </div>
  </div>
}