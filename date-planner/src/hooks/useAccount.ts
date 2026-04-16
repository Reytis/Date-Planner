import { useEffect, useState } from "react";
import { AuthStatus, useAuth } from "./useAuth";

export function useAccount() {
  const { account, status } = useAuth();
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    if (!account) return; 

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
    trips,
    isLoading: status === AuthStatus.Unknown
  };
}