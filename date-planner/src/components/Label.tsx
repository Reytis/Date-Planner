"use client";

export const Label = ({ children }: {
  children: React.ReactNode;
}) => {
  return <label className="font-mono text-2xl">
    {children}
  </label>
}