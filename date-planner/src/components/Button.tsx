"use client";

export const Button = ({ onClick, children }: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return <button 
    className="
      font-mono 
      font-bold 
      text-3xl 
      pt-3 pb-3 pl-4 pr-4 
      bg-blue-400
      rounded
      hover:bg-blue-500
      transition-colors
      w-full
    "
    onClick={onClick}>
      {children}
  </button>
}