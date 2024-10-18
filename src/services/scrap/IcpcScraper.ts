import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";
import { ScraperService } from "./ScraperService";
import { ENDPOINTS } from "../endpoints";

export class IcpcScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }

  async getContestMetadata(contestId: string): Promise<ContestType> {
    const endpoint = `${ENDPOINTS.icpc.contest}/ColombiaMaratonNalACISREDIS-2024`;
    return await fetch(endpoint).then((res) => res.json());
  }

  async getProblems(contestId: string): Promise<ProblemType[]> {
    return [];
  }

  async getSubmissions(contestId: string): Promise<SubmissionType[]> {
    return [];
  }

  async getContestStandings(contestId: string): Promise<ContestStandingType[]> {
    const countEndpoint = `${ENDPOINTS.icpc.count}/${contestId}/count?q=proj`;

    const countResponse = await fetch(countEndpoint);
    const dataLength = await countResponse.text();

    const standingEnpoint = `${ENDPOINTS.icpc.standings}/contestId?${ENDPOINTS.icpc.queryParams}$&size=${dataLength}`;
    const response = await fetch(standingEnpoint);

    const rawData = await response.json();
    return rawData.data?.map((team: any) => {
      return {
        contestId: contestId,
        userName: team.teamName,
        universityName: team.institution,
        rank: team.rank,
        problemsSolved: team.problemsSolved,
        totalTime: team.totalTime,
      };
    });
  }
}
