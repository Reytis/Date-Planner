
export const Pill = ({
  color,
  children
} : {
  color: string;
  children: React.ReactNode
}) => {

  return <span className={`${color} rounded-full py-2 px-4 text-background`}>
    {children}
  </span>
}