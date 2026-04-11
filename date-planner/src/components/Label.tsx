"use client";

export enum LabelSize {
  m = "text-xl",
  s = "text-lg",
  xs = "text-sm",
}

export const Label = ({ children, size }: { children: React.ReactNode; size?: LabelSize }) => {
  return <label className={`font-mono ${size || LabelSize.m}`}>
    {children}
  </label>
}