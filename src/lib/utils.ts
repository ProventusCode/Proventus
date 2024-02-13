import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function snakeToCamel(str: string) {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}

export function toPostgresDate(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function fromMillisToHours(millis: number) {
  return millis / 3.6e6;
}
