import { parseDurationMinutes } from "@/functions/dateToInt";
import { prisma } from "@/lib/db";
import { TripPayload, TripUpdateDTO } from "@/types/tripform";

// Fetch all trips for a user
export const getTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: { userId },
    include: { stops: true },
  });
};

// Create a new trip for a user
export const  createTrip = async (data: {
  userId: string;
  trip: TripPayload
}) => {
  return prisma.trip.create({
    data: {
      title: data.trip.Title,
      startDate: data.trip.StartTime!,
      isPublic: data.trip.isPublic,
      cover: data.trip.coverUrl,
      coverPublicId: data.trip.coverPublicId,
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
          startTime: stop.startTime!,
          ticket: stop.TicketUrl,
          ticketPublicId: stop.TicketPublicId,
        })),
      },
    },
  });
};

// Delete a trip by ID
export const deleteTrip = async (id: string) => {
  return prisma.trip.delete({
    where: { id },
  });
};

// Update a trip by ID
export const updateTrip = async (id: string, data: TripUpdateDTO) => {
  return prisma.$transaction(async (tx) => {
    // 1. update trip basic fields
    await tx.trip.update({
      where: { id },
      data: {
        title: data.title,
        startDate: data.startDate,
        isPublic: data.isPublic,
        cover: data.coverUrl,
        coverPublicId: data.coverPublicId,
      },
    });

    if (data.stops) {
      const existingStops = await tx.stop.findMany({
        where: { tripId: id },
      });

      const incomingIds = data.stops.filter(s => s.id).map(s => s.id);

      // 2. DELETE removed stops
      await tx.stop.deleteMany({
        where: {
          tripId: id,
          id: { notIn: incomingIds as string[] },
        },
      });

      for (const stop of data.stops) {
        if (stop.id) {
          // UPDATE
          await tx.stop.update({
            where: { id: stop.id },
            data: {
              name: stop.name,
              adress: stop.adress,
              postalCode: stop.postalCode,
              city: stop.city,
              country: stop.country,
              price: stop.price,
              duration: stop.duration,
              startTime: stop.startTime!,
              ticket: stop.ticket,
              ticketPublicId: stop.ticketPublicId,
            },
          });
        } else {
          // CREATE
          await tx.stop.create({
            data: {
              tripId: id,
              name: stop.name,
              adress: stop.adress,
              postalCode: stop.postalCode,
              city: stop.city,
              country: stop.country,
              price: stop.price,
              duration: stop.duration,
              startTime: stop.startTime!,
              ticket: stop.ticket,
              ticketPublicId: stop.ticketPublicId,
            },
          });
        }
      }
    }

    return tx.trip.findUnique({
      where: { id },
      include: { stops: true },
    });
  });
};

// Fetch a single trip by ID
export const getTrip = async (id: string) => {
  return prisma.trip.findUnique({
    where: { id },
    include: { stops: true },
  });
}

// Fetch trip stat by ID (rating, saved, comments)
export const getTripData = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    select: {
      comments: true,

      _count: {
        select: {
          comments: true,
          ratings: true,
          favoritedBy: true,
        },
      },

      ratings: {
        select: {
          value: true,
        },
      },
    },
  });

  if (!trip) return null;

  const averageRating =
    trip.ratings.length > 0
      ? trip.ratings.reduce((sum, rating) => sum + rating.value, 0) /
        trip.ratings.length
      : 0;

  return {
    comments: trip.comments,

    commentsCount: trip._count.comments,
    favoritesCount: trip._count.favoritedBy,
    ratingsCount: trip._count.ratings,

    averageRating,
  };
};