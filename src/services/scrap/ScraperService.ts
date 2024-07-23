import {
  Contest,
  ContestStanding,
  Problem,
  Submission,
} from "@/types/contest.types";

export interface ScraperService {
  isValidContestId(contestId: string): boolean;
  getContestMetadata(contestId: string): Promise<Contest>;
  getProblems(contestId: string): Promise<Problem[]>;
  getSubmissions(contestId: string): Promise<Submission[]>;
  getContestStandings(contestId: string): Promise<ContestStanding[]>;
}
