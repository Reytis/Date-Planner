"use client";

import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TripType } from '@/types/trip';
import { dateToMinutes } from '@/functions/dateToInt';
import { StopForm } from '@/types/tripform';
import { useAccount } from '@/hooks/useAccount';
import { deleteFile, uploadFile } from '@/functions/upload';
import { EditTrip } from './editTrip';
import { TripView } from './trip';
import { error } from 'console';

export default function Trip() {
  const { account } = useAccount(); // Get account if checking if user is connected

  const searchParams = useSearchParams(); // Get the search parameters from the URL
  const tripId = searchParams.get('id'); // Extract the 'id' parameter which represents the trip ID

  const [trip, setTrip] = useState<TripType | null>(null); // State to hold the trip details even during edition

  const [username, setUsername] = useState<string>(""); // State to hold the username of the trip owner

  const [mode, setMode] = useState<"view" | "edit">("view"); // State to manage whether the trip is in view mode or edit mode
  const [newCover, setNewCover] = useState<File | null>(null); // State to hold a new cover image file when editing the trip

  // Function to fetch the username based on the user ID
  const getUsername = async (userId: string) => {
    const response = await fetch(`/api/user?userId=${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const userData = await response.json();

    return userData.name;
  }

  // Function to fetch trip details based on the trip ID
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

  // useEffect to fetch trip details when the component mounts or when the trip ID changes
  useEffect(() => {
    console.log("Fetching trip details for ID:", tripId);
    if (tripId) {
      fetchTripDetails(tripId).then(setTrip).catch(console.error);
    }
  }, [tripId]);

  if (!tripId) {
    return <div>No trip ID provided</div>;
  }

  if (!trip) {
    return <div>Loading...</div>;
  }
  // Verify that the current user is the owner of the trip
  const isOwner = account?.id === trip.userId;

  // Function to handle saving a stop, either by adding a new stop or updating an existing one based on the presence of an ID
  const handleSaveStop = async (stop: StopForm, id?: string) => {
    if (id && stop.Ticket) {
      await deleteFile(trip.stops.find(s => s.id === id)?.ticketPublicId || ""); // If updating an existing stop with a ticket, delete the old ticket file from storage
    }
    const ticket = await uploadFile(stop.Ticket); // Upload the ticket file and get its URL, if a ticket file is provided

    // If no ID is provided, it means we are adding a new stop to the trip
    if (!id) { 
      setTrip({
        ...trip,
        stops: [...trip.stops, {
          name: stop.Title,
          adress: stop.Address.Street,
          postalCode: stop.Address.PostalCode,
          city: stop.Address.City,
          country: stop.Address.Country,
          price: stop.Price,
          duration: dateToMinutes(stop.Duration!),
          startTime: stop.startTime,
          ticket: ticket?.url || null,
          ticketPublicId: ticket?.publicId || null
        }]
      } as TripType);
      return; // Exit the function after adding the new stop
    }

    // If an ID is provided, we are updating an existing stop, so we map through the stops and update the one with the matching ID
    setTrip({
      ...trip,
      stops: trip.stops.map(s => s.id === id ? {
        ...s,
        name: stop.Title,
        adress: stop.Address.Street,
        postalCode: stop.Address.PostalCode,
        city: stop.Address.City,
        country: stop.Address.Country,
        price: stop.Price,
        duration: dateToMinutes(stop.Duration!),
        startTime: stop.startTime,
        ticket: ticket?.url || s.ticket,
        ticketPublicId: ticket?.publicId || s.ticketPublicId
      } : s)
    } as TripType);
  }

  // Function to handle saving the trip details
  const handleSaveTrip = async ({ newCover, trip }: { newCover: File | null; trip: TripType }) => {
    if (newCover && trip.coverPublicId) {
      await deleteFile(trip.coverPublicId); // Delete the old cover image from storage if a new cover is being uploaded
    }
    const cover = newCover ? await uploadFile(newCover) : { url: trip.cover, publicId: trip.coverPublicId }; // Upload new cover if needed and get its URL and public ID
    
    console.log("PAYLOAD:", {
      ...trip,
      coverUrl: cover?.url,
      coverPublicId: cover?.publicId,
    });

    const res = await fetch(`/api/trips/${trip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...trip, coverUrl: cover!.url, coverPublicId: cover!.publicId }) // Include the new cover URL and public ID if a new cover was uploaded
    });


  if (!res.ok) {
    let errorMessage = "Failed to save trip details";

    try {
      const errorData = await res.json();

      errorMessage =
        errorData?.message ||
        errorData?.error ||
        JSON.stringify(errorData);
    } catch {
      errorMessage = await res.text();
    }

    throw new Error(
      `❌ Trip save failed (${res.status} ${res.statusText}) : ${errorMessage}`
    );
  }

    const updatedTrip = await res.json();
    setTrip(updatedTrip); // Update the trip state with the latest details from the server
    setMode("view"); // Switch back to view mode after saving the trip details
  }

  // Function to handle deleting a stop from the trip based on its ID
  const handleDeleteStop = async (id: string) => {
    setTrip({
      ...trip,
      stops: trip.stops.filter(s => s.id !== id)
    } as TripType);
    await deleteFile(trip.stops.find(s => s.id === id)?.ticketPublicId || ""); // Delete the ticket file associated with the stop being deleted from storage
  }

  // Function to handle deleting the entire trip
  const handleDeleteTrip = async () => {
    const filesToDelete = [...trip.stops.map(s => s.ticketPublicId), trip.coverPublicId].filter(Boolean) as string[]; // Collect all file public IDs (cover and tickets) that need to be deleted from storage
    await Promise.all(filesToDelete.map(publicId => deleteFile(publicId))); // Delete all associated files from storage in parallel
    
    const res = await fetch(`/api/trips/${trip.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error('Failed to delete trip');
    }
    redirect("/me"); // Redirect the user to their profile page after successfully deleting the trip
  }

  return <div>
    {/* // If the mode is "edit", render the edit form for the trip details and stops */}
    {isOwner && mode === "edit" && 
    <EditTrip 
      setMode={setMode} 
      handleDeleteTrip={handleDeleteTrip} 
      trip={trip} 
      setTrip={setTrip} 
      setNewCover={setNewCover} 
      handleSaveStop={handleSaveStop} 
      handleDeleteStop={handleDeleteStop} 
      handleSaveTrip={handleSaveTrip} 
      newCover={newCover} 
    />}
    {/* // If the mode is "view", render the trip details and stops in a read-only format */}
    {(isOwner || trip.isPublic) && mode === "view" &&
    <TripView 
      trip={trip} 
      username={username}
      handleDeleteTrip={handleDeleteTrip}
      setMode={setMode}
      isOwner={isOwner}
    />}
  </div>
}