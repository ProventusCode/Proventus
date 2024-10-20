import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";

export interface ScraperService {
  isValidContestId(contestId: string): boolean;
  getContestMetadata(contestId: string): Promise<ContestType>;
  getProblems(contestId: string): Promise<ProblemType[]>;
  getSubmissions(contestId: string): Promise<SubmissionType[]>;
  getContestStandings(contestId: string): Promise<ContestStandingType[]>;
}
