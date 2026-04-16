export type TripType = {
  id: string;
  title: string;
  cover: string | null; // URL to the cover image
  coverPublicId: string | null; // Public ID of the cover image in the storage service, used for deletion
  startDate: string;
  isPublic: boolean;
  userId: string;
  stops: StopType[];
}

export type StopType = {
  id: string;
  name: string;
  adress: string;
  postalCode: string;
  city: string;
  country: string;
  price: number;
  duration: number; // in minutes
  startTime: Date | null;
  ticket: string | null; // URL to the ticket file
  ticketPublicId: string | null; // Public ID of the ticket file in the storage service, used for deletion
  tripId: string;
}