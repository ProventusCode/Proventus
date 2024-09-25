import { format, parse } from "date-fns";

export class DateUtils {
  static readonly POSTGRES_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
  static readonly CALENDAR_DATE_FORMAT = "PPP HH:mm:ss";

  /**
   * Convert date to Postgres format
   * @param date Date object
   * @returns Date in Postgres format
   *
   * @example
   * toPostgresDate(new Date()) // "2021-09-01 00:00:00"
   */
  static toPostgresDate(date: Date | number | undefined): string | undefined {
    return date ? format(date, this.POSTGRES_DATE_FORMAT) : undefined;
  }

  /**
   * Parse date from Postgres format to Date object
   * @param date Date in Postgres format
   * @returns Date object
   *
   * @example
   * parsePostgresDate("2021-09-01 00:00:00") // Date object
   */
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
