"use client";

import { isoStringToDate } from "@/functions/dateToInt";
import { Label, LabelSize } from "./Label";

// Formate Date value to prevent invalid data issue
export const formatDateValue = (value: Date | string, type: "date" | "datetime-local" | "time") => {
  if (!value) return "" //return if no value

  const date = value instanceof Date ? value : isoStringToDate(value) // if value is string date convert into date

  if (isNaN(date!.getTime())) return ""; // return if string value is not date

  // get all part of a Date
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date!.getFullYear();
  const month = pad(date!.getMonth() + 1);
  const day = pad(date!.getDate());
  const hours = pad(date!.getHours());
  const minutes = pad(date!.getMinutes());

  if (type === "datetime-local") {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  if (type === "time") {
    return `${hours}:${minutes}`;
  }

  return `${year}-${month}-${day}`;
};

export const Input = ({
  label,
  labelWeight,
  message,
  tooltip,
  onClick,
  children,
}: {
  label?: string;
  labelWeight?: LabelSize;
  message?: string;
  tooltip?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return <div className="flex flex-col gap-2 justify-center w-full">
    {label && <Label size={labelWeight}>{label}</Label>}
    {children}
    {message && <p className="small-caption">{message}</p>}
    {tooltip && <p className="small-caption underline cursor-pointer self-end" onClick={onClick}>{tooltip}</p>}
  </div>
}