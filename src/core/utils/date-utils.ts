export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  return date.toLocaleDateString("fr-FR", {
    month: "short",
    day: "2-digit",
    ...options,
  });
};

/**
 * Check if two dates are on the same day
 * @param dateA - The first date
 * @param dateB - The second date
 * @returns True if the dates are on the same day, false otherwise
 */
export const isSameDay = (dateA: Date, dateB: Date) => {
  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);

  return dateA.getTime() === dateB.getTime();
};

export const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

export const isPastDate = (date = new Date()) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date < today;
};

export const isFutureDate = (date: Date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date > today;
};

export const isBetweenDates = (
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
) => {
  const dateObject = date instanceof Date ? date : new Date(date);
  const startDateObject =
    startDate instanceof Date ? startDate : new Date(startDate);
  const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);

  if (
    isSameDay(dateObject, startDateObject) ||
    isSameDay(dateObject, endDateObject)
  ) {
    return true;
  }

  return dateObject > startDateObject && dateObject < endDateObject;
};

/**
 * Convert a date string with format mm/dd/yyyy hh:mm:ss to a Date object
 * @param date - The date string to convert
 * @returns The Date object
 */
export const convertDateStringToDate = (date: string) => {
  // Format : mm/dd/yyyy hh:mm:ss
  const regex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
  const match = date.match(regex);

  if (!match) {
    throw new Error("Invalid date string");
  }

  const [_, month, day, year] = match.map(Number);
  const dateObject = new Date(year, month - 1, day);

  if (isNaN(dateObject.getTime())) {
    console.log("dateObject", dateObject);
    console.log("match", match);
    console.log("date", date);
    throw new Error("Invalid date string");
  }

  return dateObject;
};
