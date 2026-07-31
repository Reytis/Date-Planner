import { StopForm } from "@/types/tripform"
import { CtaIcon, CtaSecondary } from "@/components/Buttons/Cta"
import { dateToMinutes, minutesToTimeString } from "@/functions/dateToInt";
import { Cross, Money, Timer, MapPin, Valid, StopDot, Drag, Trash, Edit } from "@/assets/icons/index";
import { Separator, SeparatorAspect } from "@/components/Misc/Separator";

// display Stop components
export const Stop = ({
  stop,
  index,
  editable = false,
  onDelete,
  onEdit,
  onClick
}: { 
  stop: StopForm;
  index: number;
  editable?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onClick: () => void
}) => {

  return <div onClick={() => onClick()} className="w-full px-3 py-2 flex gap-2">
    <div>
      <StopDot className="size-6" />
    </div>
    <div className="group w-full flex flex-col px-4 py-2 bg-background-3 rounded-xl transition-all duration-200 hover:bg-background-4 cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {editable && <Drag className="size-6" />}
          <p>{stop.Title}</p>
        </div>
        <p className="caption p-1 bg-background-4 rounded-lg">
          {index + 1}
        </p>
      </div>
      <p className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 small-caption flex items-center gap-2"><MapPin className="size-4" /> {stop.Address.Street}, {stop.Address.PostalCode} {stop.Address.City}</p>
      <Separator aspect={SeparatorAspect.h} />
      <div className="flex min-w-full justify-between items-center">
        <div className="flex gap-1 items-center">
          <p className="flex items-center small-caption"><Money className="size-4" /> {stop.Price} €</p>
          <p className="flex items-center small-caption"><Timer className="size-4" /> {minutesToTimeString(dateToMinutes(stop.Duration))}</p>
        </div>
        <p className="flex items-center small-caption">{stop.Ticket ? <Valid className="size-4" /> : <Cross className="size-4" />} Ticket</p>
      </div>
      {editable && <div onClick={(e) => e.stopPropagation()} className="mt-2 flex gap-2 items-center">
        {onEdit && <CtaSecondary onClick={() => onEdit()}><Edit className="size-6" /> Edit stop</CtaSecondary>}
        {onDelete && <CtaIcon onClick={() => onDelete()}><Trash className="size-6" /></CtaIcon>}
      </div>}
    </div>
  </div>
}