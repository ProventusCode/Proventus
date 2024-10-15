import { ProblemStatistic } from "@/db/schema/contestStanding";
import { RoleEnum } from "@/enums/RoleEnum";

export type UserType = {
  id: string;
  name: string;
  email: string;
  university?: string | null;
  role: RoleEnum;
};

export type ContestType = {
  id?: number;
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
  id?: number;
  submissionId: number;
  contestId: string;
  userName: string;
  problemId: string;
  index?: string | null;
  codeLength?: number | null;
  memoryConsumed?: number | null;
  timeConsumed?: number | null;
  result: string;
  language: string;
  sourceCode?: string | null;
  submissionDateTime?: string;
};

export type ProblemType = {
  id?: number;
  problemId: string;
  problemSetId?: number;
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
  id?: number;
  contestId: string;
  userName: string;
  universityName?: string | null;
  rank: number;
  problemsSolved: number;
  totalTime: number;
  problemStatistics: ProblemStatistic[];
};
