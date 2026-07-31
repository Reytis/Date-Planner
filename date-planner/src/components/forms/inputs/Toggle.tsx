import { ReactNode } from "react";

// toggle input
export const ToggleInput = ({
  checked,
  disabled,
  onClick,
  after,
  before,
}: {
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
  after?: ReactNode;
  before?: ReactNode;
}) => {
  let CSS = ""
  if (disabled) {
    CSS = "bg-background-4"
  } else if (checked) {
    CSS = "bg-main justify-end"
  } else {
    CSS = "bg-background-3"
  }
  
  return <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
    {before}
    <div className={`flex ${CSS} items-center w-16 h-8 p-1 rounded-full transition-all duration-200`}>
      {!disabled && <span className="w-6 h-6 flex bg-background rounded-full"></span>}
    </div>
    {after}
  </div>
}