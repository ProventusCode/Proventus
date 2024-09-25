import { Contest } from "@/db/schema/Contest";
import { ContestType } from "@/types/contest.types";
import { DateUtils } from "@/utils/DateUtils";

export class ContestMapper {
  static toContestType(contest: Contest): ContestType {
    return {
      ...contest,
      startDate: DateUtils.toPostgresDate(contest.startDate),
      endDate: DateUtils.toPostgresDate(contest.endDate),
    };
  }
  static toContestTypeList(contests: Contest[]): ContestType[] {
    return contests.map(this.toContestType);
  }
}
