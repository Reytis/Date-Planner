"use client";

export const ListItem = ({ 
  children,
  tripId,
}: { 
  children: React.ReactNode,
  tripId: string, 
}) => {

  const handleClick = () => {
    window.location.href = `/trip?id=${tripId}`;
  };

  return (
    <div className="py-2" onClick={handleClick}>
      {children}
    </div>
  );
}