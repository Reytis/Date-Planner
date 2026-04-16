// Utility functions for converting between Date objects and integer representations of time (in minutes).
export const timeStringToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":");
  const parsedHours = parseInt(hours, 10);
  const parsedMinutes = parseInt(minutes, 10);

  if (Number.isNaN(parsedHours) || Number.isNaN(parsedMinutes)) {
    throw new Error(`Invalid time format: ${time}. Expected HH:MM`);
  }

  return parsedHours * 60 + parsedMinutes;
};

// Converts total minutes to a time string in HH:MM format.
export const minutesToTimeString = (totalMinutes: number): string => {
  if (Number.isNaN(totalMinutes) || totalMinutes < 0) {
    throw new Error(`Invalid minutes value: ${totalMinutes}. Expected a non-negative number.`);
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}`;
};

// Converts a Date object to total minutes since midnight. If the date is null, returns 0.
export const dateToMinutes = (date: Date | null): number => {
  if (!date) return 0;
  return date.getHours() * 60 + date.getMinutes();
};

// Converts total minutes to a Date object on the same day as the baseDate (defaulting to the current date).
export const minutesToDate = (totalMinutes: number, baseDate = new Date()): Date => {
  const result = new Date(baseDate);
  result.setHours(Math.floor(totalMinutes / 60));
  result.setMinutes(totalMinutes % 60);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
};

// Convert IOS string to a Date Object
export const isoStringToDate = (value: string | null | undefined): Date | null => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date string: ${value}`);
  }

  return date;
};