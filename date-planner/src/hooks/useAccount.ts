import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useAccount() {
  const { account } = useAuth();
  const [trips, setTrips] = useState([]);

  if (!account) {
    throw new Error("useAccount must be used within an AuthProvider and when the user is authenticated");
  }
  
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`/api/trips?userId=${account.id}`); // Fetch the user's trips using the getTrips function, passing in the user's ID
        const data = await res.json();

        setTrips(data); // Update the trips state with the fetched trips data
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [account]); // Fetch the user's trips using the getTrips function, passing in the user's ID

  return {
    account,
    trips
  };
}