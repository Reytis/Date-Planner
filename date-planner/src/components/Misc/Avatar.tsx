export const Avatar = ({
  image,
  name
}: {
  image: string | null;
  name: string | null
}) => {

  return <div className="size-12 border border-foreground text-foreground rounded-full flex justify-center items-center h4 overflow-hidden">
    {image ? <img className="w-full h-full object-cover" src={image} alt="user avatar" /> : name ? name[0] : '?' }
  </div>
}