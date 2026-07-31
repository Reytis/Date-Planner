import { Down, Filter } from "@/assets/icons/index"
import { CtaPrimary } from "../Buttons/Cta"
import { Input } from "../forms/Input"
import { NumberInput } from "../forms/inputs/NumberInput"
import { StringInput, StringType } from "../forms/inputs/StringInput"
import { PopOver } from "./PopOver"
import { SelectionDropDown } from "./SelectionDropDown"
import { useState } from "react"

const orders = [
  "Most Recent",
  "Most Expensive",
  "Longest",
  "Date"
]

export const FilterDropDown = ({
  onClick
}: {
  onClick: () => void
}) => {
  const [order, setOrder] = useState(orders[0])


  return <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <p className="caption">Order By:</p>
        <PopOver trigger={<span className="cursor-pointer flex items-center gap-2 small-caption">{order}<Down className="size-4" /></span>}>
          {({ close }) => <SelectionDropDown onClick={(e: string) => {setOrder(e); close()}} selection={orders} current={order}/>}
        </PopOver>
      </div>
      <div className="flex gap-1 items-end">
        <Input label="Price">
          <NumberInput value={0} onChange={() => {}} />
        </Input>
        <Input>
          <NumberInput value={0} onChange={() => {}} />
        </Input>
      </div>
      <div className="flex gap-1 items-end">
        <Input label="Duration">
          <NumberInput value={0} onChange={() => {}} />
        </Input>
        <Input>
          <NumberInput value={0} onChange={() => {}} />
        </Input>
      </div>
      <div className="flex gap-1 items-end">
        <Input label="Number of Stop">
          <NumberInput value={0} onChange={() => {}} />
        </Input>
        <Input>
          <NumberInput value={0} onChange={() => {}} />
        </Input>
      </div>
      <div className="flex gap-1 items-end">
        <Input label="Country">
          <StringInput value={""} onChange={() => { } } type={StringType.Text} />
        </Input>
      </div>
      <div className="flex gap-1 items-end">
        <Input label="Creator">
          <StringInput value={""} onChange={() => { } } type={StringType.Text} />
        </Input>
      </div>
      <CtaPrimary onClick={() => onClick()}>
        <Filter className="size-6" />
        Apply Filters
      </CtaPrimary>
    </div>
}