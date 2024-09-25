import { ContestType, ProblemType, SubmissionType, ContestStandingType } from "@/types/contest.types";
import { ScraperService } from "./ScraperService";

export class CodeforcesScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }
  getContestMetadata(contestId: string): Promise<ContestType> {
    throw new Error("Method not implemented.");
  }
  getProblems(contestId: string): Promise<ProblemType[]> {
    throw new Error("Method not implemented.");
  }
  getSubmissions(contestId: string): Promise<SubmissionType[]> {
    throw new Error("Method not implemented.");
  }
  getContestStandings(contestId: string): Promise<ContestStandingType[]> {
    throw new Error("Method not implemented.");
  }
}
