import { ProblemStatistic } from "@/db/schema/contestStanding";
import { RoleEnum } from "@/enums/RoleEnum";

export type UserType = {
  id: string;
  name: string;
  email: string;
  university?: string | null;
  role: RoleEnum;
  password?: string;
};

export type ContestType = {
  contestId: string;
  name: string;
  platform: string;
  startDate?: string;
  endDate?: string;
  manager?: string | null;
  participants?: number | null;
  source?: string | null;
};

export type SubmissionType = {
  submissionId: number;
  contestId: string;
  userName: string;
  problemId: string;
  problemIndex?: string | null;
  codeLength?: number | null;
  memoryConsumed?: number | null;
  timeConsumed?: number | null;
  result: string;
  language: string;
  sourceCode?: string | null;
  submissionDateTime?: string;
};

export type ProblemType = {
  problemId: string;
  index: string;
  name: string;
  rating?: number | null;
  tags?: string | null;
  author?: string | null;
  origin?: string | null;
  timeLimit?: number | null;
  memoryLimit?: number | null;
};

export type ContestStandingType = {
  contestId: string;
  userName: string;
  universityName?: string | null;
  rank: number;
  problemsSolved: number;
  totalTime: number;
  problemStatistics: ProblemStatistic[];
};
