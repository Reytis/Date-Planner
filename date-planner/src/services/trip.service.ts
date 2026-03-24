import { prisma } from "@/lib/db";

export const getTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: { userId },
    include: { stops: true },
  });
};

export const  createTrip = async (data: {
  title: string;
  userId: string;
}) => {
  return prisma.trip.create({
    data
  });
};

export const deleteTrip = async (id: string) => {
  return prisma.trip.delete({
    where: { id },
  });
};