import { prisma } from "@/lib/db";

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
