export type TripType = {
  id: string;
  name: string;
  cover: string | null;
  startDate: Date;
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
  tripId: string;
}