import { StopDot } from "@/assets/icons/index"

export const PricingList = ({
  list,
}: {
  list: string[]
}) => {

  return <ol className="flex-1 mb-8">
    {list.map((li, index) => {
      return <li key={index} className="flex flex-row gap-4 px-3 py-2">
        <StopDot className="size-6 text-main" />
        {li}
      </li>
    }
    )}
  </ol>
}