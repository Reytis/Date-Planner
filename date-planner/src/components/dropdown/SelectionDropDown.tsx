import { SelectionDropDownButton } from "../Buttons/SelectionDropDownButton";

export const SelectionDropDown = ({
  onClick,
  selection,
  current,
}: {
  onClick: (e: string) => void;
  selection: string[];
  current: string;
}) => {

  return <div className="rounded-sm p-1 border border-foreground bg-background w-max">
    {selection.map((s, i) => <SelectionDropDownButton key={i} onClick={() => onClick(s)} selected={current === s ? true : false}>
      {s}
    </SelectionDropDownButton>)}
  </div>
}