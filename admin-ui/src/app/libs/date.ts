"use client";

export const dateFormat = (date: Date | number | string) => {
  if (!date) return "";

  const newDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(newDate);

  return formattedDate;
};
