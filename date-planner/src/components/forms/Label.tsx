"use client";

// handle size of the text
export enum LabelSize {
  m = "p",
  s = "small-p",
  xs = "small-caption",
}

// label component
export const Label = ({ children, size }: { children: React.ReactNode; size?: LabelSize }) => {
  return <label className={`${size || LabelSize.m}`}>
    {children}
  </label>
}