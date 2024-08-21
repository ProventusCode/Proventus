import { format } from "date-fns";

export function toPostgresDate(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
