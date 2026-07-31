
export enum SeparatorAspect {
  h = "horizontal",
  v = "vertical",
  d = "dot"
}
export const Separator = ({
  aspect
}: {
  aspect: SeparatorAspect;
}) => {
  let CSS = ""
  switch (aspect) {
    case SeparatorAspect.h:
      CSS = "flex w-full h-0.5 my-1"
      break
    case SeparatorAspect.v:
      CSS = "flex w-0.5 h-full mx-1 my-2"
      break
    default:
      CSS = "flex w-1 h-1 mx-2 my-1"
      break
  }

  return <span className={`${CSS} bg-foreground-3 text-foreground-3 rounded-full`}>
  </span>
}