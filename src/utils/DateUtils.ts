import { format, parse } from "date-fns";

export class DateUtils {
  static readonly POSTGRES_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
  static readonly CALENDAR_DATE_FORMAT = "PPP HH:mm:ss";

  static toPostgresDate(date: Date | number | undefined): string | undefined {
    return date ? format(date, this.POSTGRES_DATE_FORMAT) : undefined;
  }

  static parsePostgresDate(date: string | undefined): Date {
    return date
      ? parse(date, this.POSTGRES_DATE_FORMAT, new Date())
      : new Date();
  }

  /**
   * Convert hour in format h:mm:ss to minutes
   * @param hour Hour in format h:mm:ss
   * @returns Minutes
   *
   * @example
   * convertHourToMinutes("1:30:00") // 90
   */
  static convertHourToMinutes(hour: string): number {
    const [h, m] = hour.split(":");
    return parseInt(h) * 60 + parseInt(m);
  }
}
