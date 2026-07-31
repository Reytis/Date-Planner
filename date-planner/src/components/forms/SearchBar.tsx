import { Cross, Filter, Search } from "@/assets/icons/index"
import { CtaIcon } from "../Buttons/Cta"

export const SearchBar = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {

  return <div className="relative w-full min-w-80">
      <Search className="size-6 absolute left-8 top-1/2 -translate-y-1/2" />
      <input className="search-input" type="text" value={value} placeholder="Search..." onChange={(e) => onChange(e.target.value)}/>
      {value && !disabled && (<button className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:bg-background-transparent p-1" onClick={() => onChange("")}> <Cross className="size-6" /> </button>)}
    </div>
}