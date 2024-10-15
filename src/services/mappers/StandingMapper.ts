import { ContestStanding } from "@/db/schema/contestStanding";
import { ContestStandingType } from "@/types/contest.types";

export class StandingsMapper {
  static toContestStandingType(standing: ContestStanding): ContestStandingType {
    return {
      ...standing,
      problemStatistics: standing.problemStatistics ?? [],
    };
  }

  static async toContestStandingTypeListAsync(
    standings: Promise<ContestStanding[]>
  ): Promise<ContestStandingType[]> {
    const standingList = await standings;
    return standingList.map(this.toContestStandingType);
  }
}
