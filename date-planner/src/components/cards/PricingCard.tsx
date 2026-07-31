
export const PricingCard = ({
  className = "",
  children,
  title,
  price,
}: {
  className: string;
  children: React.ReactNode;
  title: string;
  price: string;
}) => {

  return <article className={`${className} w-80 flex flex-col px-6 py-8 rounded-xl`}>
    <div className="mb-8">
      <p className="h5">{title}</p>
      <div className="flex gap-3 items-end">
        <p className="h1">{price}</p>
        <p className="small-caption text-foreground-3">/years</p>
      </div>
    </div>
    <div className="flex flex-col flex-1">
      {children}
    </div>
  </article>
}