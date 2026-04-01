import { prisma } from "@/lib/db";

// Add a new stop to a trip
export const addStop = async (data: {
  tripId: string;
  name: string;
  adress: string;
  lat: number;
  lng: number;
  price: number;
  duration: number;
  startTime: Date;
}) => {
  return prisma.stop.create({
    data,
  });
};

// Delete a stop by its ID
export const deleteStop = async (id: string) => {
  return prisma.stop.delete({
    where: { id },
  });
};

// Update a stop by its ID
export const updateStop = async (id: string, data: Partial<{
  name: string;
  adress: string;
  lat: number;
  lng: number;
  price: number;
  duration: number;
  startTime: Date;
}>) => {
  return prisma.stop.update({
    where: { id },
    data,
  });
};

// Get all stops for a specific trip, ordered by start time
export const getStopsByTripId = async (tripId: string) => {
  return prisma.stop.findMany({
    where: { tripId },
    orderBy: { startTime: "asc" }, // Order by start time ascending
  });
};
