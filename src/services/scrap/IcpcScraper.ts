import { PlatformEnum } from "@/enums/PlatformEnum";
import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";
import { DateUtils } from "@/utils/DateUtils";
import { ENDPOINTS } from "../endpoints";
import { ScraperService } from "./ScraperService";

export class IcpcScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }

  async getContestMetadata(competitionYear: string): Promise<ContestType> {
    const endpoint = `${ENDPOINTS.icpc.contest}-${competitionYear}`;

    const response = await fetch(endpoint);
    const data: IcpcContest = await response.json();

    const contestId = data.id;
    const count = await fetch(
      `${ENDPOINTS.icpc.count}/${contestId}/count?q=proj`
    );
    const participants = Number(await count.text());

    return {
      contestId: contestId,
      name: data.name,
      platform: PlatformEnum.ICPC,
      startDate: DateUtils.toDateWithTime(data.startDate, "13:00:00"),
      endDate: DateUtils.toDateWithTime(data.endDate, "18:00:00"),
      source: `${ENDPOINTS.icpc.finder}-${contestId}`,
      manager: data.email,
      participants: participants,
    };
  }

  async getProblems(contestId: string): Promise<ProblemType[]> {
    return [];
  }

  async getSubmissions(contestId: string): Promise<SubmissionType[]> {
    return [];
  }

  async getContestStandings(
    competitionYear: string
  ): Promise<ContestStandingType[]> {
    const contestEndpoint = `${ENDPOINTS.icpc.contest}-${competitionYear}`;
    const contestData = await (await fetch(contestEndpoint)).json();
    const contestId = contestData?.id;

    const standingEndpoint = `${ENDPOINTS.icpc.standings}/${contestId}?${ENDPOINTS.icpc.queryParams}`;
    const response = await fetch(standingEndpoint);
    const rawData = await response.json();

    return rawData?.map((team: IcpcStanding): ContestStandingType => {
      return {
        contestId: contestId,
        userName: team.teamName,
        universityName: team.institution,
        rank: team.rank,
        problemsSolved: team.problemsSolved,
        totalTime: team.totalTime,
        problemStatistics: [],
      };
    });
  }
}
