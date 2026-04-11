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
  startTime: Date | null;
}

export type TripFormType = {
  Title: string;
  StartTime: Date | null;
  Stops: StopForm[];
  isPublic: boolean;
  coverImage: File | null;
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
  TicketUrl: string | null;
  startTime: string | null;
}

export type TripPayload = {
  Title: string;
  StartTime: string | null;
  Stops: ProcessedStopForm[];
  isPublic: boolean;
  coverUrl: string | null;
}