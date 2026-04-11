import { prisma } from "@/lib/db";
import { dateToMinutes } from "@/functions/dateToInt";
import { TripPayload } from "@/types/tripform.js";

// Fetch all trips for a user
export const getTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: { userId },
    include: { stops: true },
  });
};

// Create a new trip for a user
const parseDurationMinutes = (duration: number | string | null): number => {
  if (typeof duration === "number") {
    return duration;
  }

  if (typeof duration === "string") {
    const parsed = new Date(duration);
    return dateToMinutes(parsed);
  }

  return 0;
};

export const  createTrip = async (data: {
  userId: string;
  trip: TripPayload
}) => {
  return prisma.trip.create({
    data: {
      title: data.trip.Title,
      startDate: data.trip.StartTime,
      isPublic: data.trip.isPublic,
      cover: data.trip.coverUrl ?? null,
      userId: data.userId,

      stops: {
        create: data.trip.Stops.map(stop => ({
          name: stop.Title,
          adress: stop.Address.Street,
          postalCode: stop.Address.PostalCode,
          city: stop.Address.City,
          country: stop.Address.Country,
          price: stop.Price,
          duration: parseDurationMinutes(stop.DurationMinutes),
          startTime: stop.startTime ? new Date(stop.startTime) : undefined,
          ticket: stop.TicketUrl ?? null,
        })),
      },
    },
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