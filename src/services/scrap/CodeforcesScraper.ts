import { Contest, Problem, Submission, ContestStanding } from "@/types/contest.types";
import { ScraperService } from "./ScraperService";

export class CodeforcesScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }
  getContestMetadata(contestId: string): Promise<Contest> {
    throw new Error("Method not implemented.");
  }
  getProblems(contestId: string): Promise<Problem[]> {
    throw new Error("Method not implemented.");
  }
  getSubmissions(contestId: string): Promise<Submission[]> {
    throw new Error("Method not implemented.");
  }
  getContestStandings(contestId: string): Promise<ContestStanding[]> {
    throw new Error("Method not implemented.");
  }
}
