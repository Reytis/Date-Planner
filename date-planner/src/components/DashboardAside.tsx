import { useAccount } from "@/hooks/useAccount"
import { Separator, SeparatorAspect } from "./Misc/Separator"
import { CtaPrimary } from "./Buttons/Cta"
import { Gallery, Logo, Plane, Plus, Profile, Settings } from "@/assets/icons/index"
import { useRouter } from "next/navigation"
import { NavButton } from "./Buttons/NavButton"
import { Avatar } from "./Misc/Avatar"

export enum DashboardPages {
  trips = 0,
  profile = 1,
  browse = 2,
  settings = 3
}

export const DashboardAside = ({
  current,
}: {
  current: DashboardPages
}) => {
  const { account } = useAccount()
  const router = useRouter() // gte router to handle back button adn history version

  return <aside className="flex flex-col gap-8 px-6 py-12 bg-background-2 border-l border-background-3 h-screen sticky left-0 top-0 min-w-80">
    <div className="flex items-center gap-2">
      <Avatar image={account?.image} name={account ? account.name : ""} /> {/*Display User Avatar Or Initial */}
      <p className="h4">{account?.name}</p>
    </div>
    <Separator aspect={SeparatorAspect.h} />
    <CtaPrimary onClick={() => router.push("/trip")} >
      <Plus className="size-6" />
      Create new trip
    </CtaPrimary>
    <nav className="flex flex-col flex-1">
      <NavButton selected={current === DashboardPages.trips ? true : false} direction={"/dashboard/trips"} >
        <Plane className="size-8" />
        Trips
      </NavButton>
      <NavButton selected={current === DashboardPages.profile ? true : false} direction={"/dashboard/profile"}>
        <Profile className="size-8" />
        Profile
      </NavButton>
      <NavButton selected={current === DashboardPages.browse ? true : false} direction={"/dashboard/browse"}>
        <Gallery className="size-8" />
        Browse trips
      </NavButton>
      <NavButton selected={current === DashboardPages.settings ? true : false} direction={"/dashboard/settings"}>
        <Settings className="size-8" />
        Settings
      </NavButton>
    </nav>
    <div className="text-background-4 h4">
      <Logo className="size-16" />
      Viati Dashboard
    </div>
  </aside>
}