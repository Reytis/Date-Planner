"use client";

export const InputText = ({ type,placeholder, value, onChange }: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return <input
      className="
        font-mono
        text-2xl
        pt-3 pb-3 pl-4 pr-4
        border-2
        border-gray-500
        rounded
        w-full
      "
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
};