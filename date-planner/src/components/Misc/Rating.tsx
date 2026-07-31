import { Star } from "@/assets/icons/index"

export const Rating = ({
}: {
}) => {

  return <div className="px-2 py-1 w-fit flex items-center gap-0.5 rounded-md bg-background-2 shadow-md">
    <Star className="size-5" />
    <Star className="size-5" />
    <Star className="size-5" />
    <Star className="size-5" />
    <Star className="size-5" />
  </div>
}