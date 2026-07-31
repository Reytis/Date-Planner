"use client";

// CTA Primary Component
export const CtaPrimary = ({ onClick, children, width = "w-full" }: {
  onClick: () => void;
  children: React.ReactNode;
  width?: string
}) => {
  return <button 
    className={`${width} max-w-xl cursor-pointer flex flex-row items-center justify-center gap-1 cta bg-main hover:bg-main-light text-cta-fg px-4 py-2 rounded-xl border-2 border-main-dark hover:border-main transition-all duration-200 ease-in`}
    onClick={onClick}>
      {children}
  </button>
}

// CTA Secondary Component
export const CtaSecondary = ({ onClick, children, width = "w-full" }: {
  onClick: () => void;
  children: React.ReactNode;
  width?: string
}) => {
  return <button 
    className={`${width} max-w-xl cursor-pointer flex flex-row items-center justify-center gap-1 cta hover:bg-background-transparent px-4 py-2 rounded-xl border-2 border-foreground transition-all duration-200 ease-in`}
    onClick={onClick}>
      {children}
  </button>
}

// CTA Ghost Component
export const CtaGhost = ({ onClick, children, color= "foreground" }: {
  onClick: () => void;
  children: React.ReactNode;
  color?: String
}) => {
  return <button 
    className={`text-${color} cursor-pointer flex flex-row gap-2 items-center justify-center w-fit cta px-4 py-2 rounded-xl transition-all duration-200 ease-in relative after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0 after:-translate-x-1/2 after:-translate-y-2 after:bg-${color} after:transition-all after:duration-200 hover:after:w-1/2`}
    onClick={onClick}>
      {children}
  </button>
}

// CTA Icon Component
export const CtaIcon = ({ onClick, children }: {
  onClick: () => void ;
  children: React.ReactNode;
}) => {
  return <button 
    className="cursor-pointer cta w-fit aspect-square text-cta-fg hover:bg-background-transparent px-2 py-2 rounded-full transition-all duration-200 ease-in"
    onClick={onClick}>
      {children}
  </button>
}