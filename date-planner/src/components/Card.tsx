"use client";

export const Card = ({ 
  children,
  tipId,
}: { 
  children: React.ReactNode,
  tipId: string,
}) => {

  const handleClick = () => {
    window.location.href = `/trip?id=${tipId}`;
  }

  return (
    <div className="bg-blue-400 rounded-lg shadow p-6" onClick={handleClick}>
      {children}
    </div>
  );
}