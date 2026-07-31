
export const DataPill = ({
  children,
  tooltip
}: {
  children : React.ReactNode;
  tooltip: string;
}) => {

  return <div className="px-2 py-1 flex items-center gap-1 rounded-md bg-background-2 shadow-md">
    {children}
    <span className="text-foreground-3">{tooltip}</span>
  </div>
}