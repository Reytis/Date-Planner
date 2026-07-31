
export const SelectionDropDownButton = ({
  selected,
  children,
  onClick
}: {
  selected?: Boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  let CSS = selected ? "text-foreground bg-background-2" : "text-foreground-3"

  return <button onClick={() => onClick()} className={`flex items-center transition-all w-full duration-200 cursor-pointer ${CSS} rounded-sm hover:bg-background-2 text-foreground-2`}>
    {children}
  </button>
}