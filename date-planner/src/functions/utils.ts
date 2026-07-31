import { StopType } from "@/types/trip";
import { StopForm } from "@/types/tripform";
import { minutesToDate } from "./dateToInt";

// Function to convert file URLs for inline viewing, especially for PDFs
export const fileToInline = (url: string) => {
  url = url.replace("/upload/", "/upload/pg_1/"); // Get the first page of the PDF as a preview

  // If the file is a PDF, replace the extension with .png to show a preview image instead of the PDF
  const endExt = url.split('.').pop()?.toLowerCase();
  if (endExt === "pdf") {
    url = url.replace(".pdf", ".png");
  }

  return url;
}

// Convert a Stoptype to a StopForm to ensure reusability of component in Edit mode or Display mode
export const stopToForm = (stop: StopType): StopForm => ({
  Title: stop.name,
  Address: {
    Street: stop.adress,
    PostalCode: stop.postalCode,
    City: stop.city,
    Country: stop.country,
  },
  Price: stop.price,
  Duration: stop.duration ? minutesToDate(stop.duration) : null,
  Ticket: null, // impossible de recréer un File depuis une URL
  TicketPublicId: stop.ticketPublicId,
  startTime: stop.startTime,
});

// Add all of a specific data in a list of object to get the total exemple add all dration of each stop in a trip to get the total 
export function getTotal<T>(
  items: T[],
  key: keyof T
): number {
  return items.reduce((total, item) => {
    const value = item[key];

    return total + (typeof value === "number" ? value : 0);
  }, 0);
}