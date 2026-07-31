type UserCard = {
    id: string;
    username: string;
    image: string | null;

    followersCount: number;
    followingCount: number;
    tripsCount: number;

    isFollowing: boolean;
    isMe: boolean;
}