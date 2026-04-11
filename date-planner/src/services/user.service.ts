import { prisma } from "@/lib/db";

// Fetch user by ID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};