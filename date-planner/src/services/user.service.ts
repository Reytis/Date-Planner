import { prisma } from "@/lib/db";

// Fetch user by ID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

// Fetch user information for user card
export const getUserCard = async (id: string, viewerId: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,

      _count: {
        select: {
          followers: true,
          following: true,
          trips: true,
        },
      },

      followers: {
        where: {
          followerId: viewerId,
        },
        select: {
          followerId: true,
        },
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    username: user.name,
    image: user.image,

    followersCount: user._count.followers,
    followingCount: user._count.following,
    tripsCount: user._count.trips,

    isFollowing: user.followers.length > 0,
    isMe: user.id === viewerId,
  };
};