import { prisma } from "@/lib/db";

// Fetch all trips for a user
export const getTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: { userId },
    include: { stops: true },
  });
};

// Create a new trip for a user
export const  createTrip = async (data: {
  title: string;
  userId: string;
}) => {
  return prisma.trip.create({
    data
  });
};

// Update a trip by ID
export const deleteTrip = async (id: string) => {
  return prisma.trip.delete({
    where: { id },
  });
};

// Update a trip by ID
export const updateTrip = async (id: string, data: { title?: string }) => {
  return prisma.trip.update({
    where: { id },
    data,
  });
};

// Fetch a single trip by ID
export const getTrip = async (id: string) => {
  return prisma.trip.findUnique({
    where: { id },
    include: { stops: true },
  });
}