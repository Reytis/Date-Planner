import { Down, Filter, LockOFF, LockON, Trash } from "@/assets/icons/index"
import { CtaGhost, CtaIcon } from "@/components/Buttons/Cta"
import { SearchBar } from "@/components/forms/SearchBar"
import { FilterDropDown } from "@/components/dropdown/FilterDropDown"
import { useState } from "react"
import { PopOver } from "@/components/dropdown/PopOver"
import { Separator, SeparatorAspect } from "@/components/Misc/Separator"
import { CheckboxInput } from "@/components/forms/inputs/Checkbox"
import { ToggleInput } from "@/components/forms/inputs/Toggle"
import { Label } from "@/components/forms/Label"

export const ActionsBar = () => {
  const [searchValue, setSearch] = useState("")

  return <div className="flex items-center justify-between bg-background-4 rounded-full px-4 py-3 pr-8">
    <div className="flex items-center gap-4">
      <SearchBar value={searchValue} onChange={(v) => setSearch(v)} />
      <PopOver ClassName="rounded-xl shadow-lg border border-background-3 min-w-80 bg-background-2" trigger={<CtaIcon onClick={() => {}}><Filter className="size-10" /></CtaIcon>}>
        {({ close }) => <FilterDropDown onClick={close}/>}
      </PopOver>
    </div>
    <div className="flex items-center gap-4">
      <PopOver trigger={<span className="cursor-pointer flex items-center gap-2 cta"><Down className="size-6" />Action</span>}>
        {({ close }) => <div className="rounded-lg shadow-lg bg-background-2 w-max p-6">
          <CtaGhost onClick={close}>
            <LockON className="size-6" />
            Make Private
          </CtaGhost>
          <Separator aspect={SeparatorAspect.h} />
          <CtaGhost onClick={close}>
            <LockOFF className="size-6" />
            Make Public
          </CtaGhost>
          <Separator aspect={SeparatorAspect.h} />
          <CtaGhost color="err" onClick={close}>
            <Trash className="size-6" />
            Delete Batch
          </CtaGhost>
        </div>}
      </PopOver>
      <ToggleInput checked={false} onClick={() => {}} after={<Label>Only passed trips</Label>} />
      <CheckboxInput checked={false} label={"Select all"} onChange={() => {}} />
    </div>
  </div>
}