import { useEffect, useState } from "react"
import { Avatar } from "../Misc/Avatar"
import { CtaSecondary } from "../Buttons/Cta"
import { Separator, SeparatorAspect } from "../Misc/Separator"

export const ProfileCard = ({
  userId
} : {
  userId: string // ID of user to display
}) => {
  const [user, setUser] = useState<UserCard | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userId}/card?viewerId=${userId}`)

      if (!res.ok) return;

      const data = await res.json()
      setUser(data)
    };

    fetchUser()
  }, [userId])

  if (!user) {
    return <div className="">chargement ...</div>
  }

  return <div className="flex items-center py-2 px-4 justify-between w-full bg-background-2 border border-background-3 rounded-lg shadow-md">
    <div className="flex gap-1 items-center">
      <Avatar image={user.image} name={user.username} />
      <div className="flex flex-col">
        <p className="p">{user.username}</p>
        <span className="small-caption flex items-center">{user.tripsCount} Trips <Separator aspect={SeparatorAspect.d} /> {user.followersCount} Followers</span>
      </div>
    </div>
    {!user.isMe && <CtaSecondary width="w-auto" onClick={() => {}}>Follow</CtaSecondary>}
  </div>
}