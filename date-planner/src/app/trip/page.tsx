"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TripType } from '@/types/trip';
import { minutesToTimeString } from '@/functions/dateToInt';

export default function Trip() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('id');
  const [trip, setTrip] = useState<TripType | null>(null);
  const [username, setUsername] = useState<string>("");

    const getUsername = async (userId: string) => {
    const response = await fetch(`/api/user?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    const userData = await response.json();
    return userData.name;
  }
  const fetchTripDetails = async (id: string) => {
    const response = await fetch(`/api/trips/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching trip details:', errorData.error);
      throw new Error('Failed to fetch trip details');
    }
    const tripDetails = await response.json();
    const username = await getUsername(tripDetails.userId);
    setUsername(username);
    return tripDetails;
  };

  useEffect(() => {
    console.log("Fetching trip details for ID:", tripId);
    if (tripId) {
      fetchTripDetails(tripId).then(setTrip).catch(console.error).then(() => {
      });
    }
  }, [tripId]);

  if (!tripId) {
    return <div>No trip ID provided</div>;
  }

  if (!trip) {
    return <div>Loading...</div>;
  }

  const fileToInline = (url: string) => {
    url = url.replace("/upload/", "/upload/pg_1/fl_page/");
    return url;
  }

  return <div>
    <h1>{trip.name}</h1>
    <img src={trip.cover || ""} alt="cover of the trip" />
    <p>{new Date(trip.startDate).toLocaleString("fr-FR")}</p>
    <p>{username}</p>
    <h2>Stops</h2>
    {trip.stops.map((stop, index) => (
      <div key={index}>
        <h3>{stop.name}</h3>
        <p>{stop.adress}, {stop.postalCode} {stop.city}, {stop.country}</p>
        <p>Price: {stop.price}</p>
        <p>Duration: {minutesToTimeString(stop.duration)}</p>
        <p>Start Time: {stop.startTime ? new Date(stop.startTime).toLocaleString("fr-FR") : "N/A"}</p>
        <p>Ticket: {stop.ticket ? 
          <a href={fileToInline(stop.ticket)} target="_blank" rel="noopener noreferrer">View Ticket</a> : "No ticket"}
        </p>
      </div>
    ))}
    <p>{trip.isPublic ? 'Public' : 'Private'}</p>
  </div>
}