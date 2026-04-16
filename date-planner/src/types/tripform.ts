export type StopForm = {
  Title: string;
  Address: {
    Street: string;
    PostalCode: string;
    City: string;
    Country: string;
  };
  Price: number;  
  Duration: Date | null;
  Ticket: File | null;
  TicketPublicId: string | null; // Public ID of the uploaded ticket, useful for deletion
  startTime: Date | null;
}

export type TripFormType = {
  Title: string;
  StartTime: Date | null;
  Stops: StopForm[];
  isPublic: boolean;
  coverImage: File | null;
  coverPublicId: string | null; // Public ID of the existing cover image, used when editing a trip without changing the cover
}

export type ProcessedStopForm = {
  Title: string;
  Address: {
    Street: string;
    PostalCode: string;
    City: string;
    Country: string;
  };
  Price: number;
  DurationMinutes: number;
  TicketUrl: string | null | undefined; //URL of the uploaded ticket
  TicketPublicId: string | null | undefined; //Public ID of the uploaded ticket, useful for deletion
  startTime: string | null; // ISO string representation of the start time
}

export type TripPayload = {
  Title: string;
  StartTime: string | null; // ISO string representation of the start time
  Stops: ProcessedStopForm[];
  isPublic: boolean;
  coverUrl: string | null; // URL of the uploaded cover image
  coverPublicId: string | null; // Public ID of the uploaded cover image, useful for deletion
}
export type StopDTO = {
  id?: string; // if exist → update if not create
  name: string;
  adress: string;
  postalCode: string;
  city: string;
  country: string;
  price: number;
  duration: number;
  startTime: string | null;
  ticket?: string | null;
  ticketPublicId?: string | null;
};

export type TripUpdateDTO = {
  title?: string;
  startDate?: string;
  isPublic?: boolean;
  coverUrl?: string;
  coverPublicId?: string;
  stops?: StopDTO[];
};