export const timeStringToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":");
  const parsedHours = parseInt(hours, 10);
  const parsedMinutes = parseInt(minutes, 10);

  if (Number.isNaN(parsedHours) || Number.isNaN(parsedMinutes)) {
    throw new Error(`Invalid time format: ${time}. Expected HH:MM`);
  }

  return parsedHours * 60 + parsedMinutes;
};

export const minutesToTimeString = (totalMinutes: number): string => {
  if (Number.isNaN(totalMinutes) || totalMinutes < 0) {
    throw new Error(`Invalid minutes value: ${totalMinutes}. Expected a non-negative number.`);
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}`;
};

export const dateToMinutes = (date: Date | null): number => {
  if (!date) return 0;
  return date.getHours() * 60 + date.getMinutes();
};

export const minutesToDate = (totalMinutes: number, baseDate = new Date()): Date => {
  const result = new Date(baseDate);
  result.setHours(Math.floor(totalMinutes / 60));
  result.setMinutes(totalMinutes % 60);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
};