import { ReactNode, useEffect, useRef, useState } from "react";

export const PopOver = ({
  children,
  ClassName,
  trigger,
}: {
  children: | ReactNode | ((props: { close: () => void}) => ReactNode);
  ClassName?: string;
  trigger: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

        document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, [])

  return <div ref={ref} className="relative">
    <div onClick={() => setIsOpen((v) => !v)}>
      {trigger}
    </div>
    {isOpen && <div className="absolute top-full right-0 mt-2 z-50">
      <div className={`${ClassName} z-50 p-4  w-fit `}>
        {typeof children === "function" ? 
          children({
            close: () => setIsOpen(false),
          }) :
            children
        }
      </div>
    </div>}
  </div>
}
