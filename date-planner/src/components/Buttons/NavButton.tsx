import { useRouter } from "next/navigation";

export const NavButton = ({
  selected,
  children,
  direction,
}: {
  selected?: Boolean;
  children: React.ReactNode;
  direction: string;
}) => {
  const router = useRouter() // get router to handle history

  let CSS = selected ? "bg-background border-foreground" : "" //Custon CSS if current tab

  return <button onClick={selected ? ()=>{} : () => router.push(direction)} className={`flex items-center px-4 py-2 gap-2 h5 border border-background-2 rounded-xl hover:bg-background-transparent hover:border-background-4 transition-all duration-200 cursor-pointer ${CSS}`}> {/* No onClick redirect if tab is currently selected */}
    {children}
  </button>
}