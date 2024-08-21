import { PlatformEnum } from "@/enums/PlatformEnum";

export type Submission = {
  id: string;
  code_length: number;
  contest_id: string;
  language: string;
  memory_consumed: number | undefined;
  problem_name: string;
  result: string;
  submission_date: string;
  time_consumed: number | undefined;
  user_name: string;
};

export type Problem = {
  id: string;
  indicative: string;
  problem_name: string;
  origin: string;
  time_limit: number;
  memory_limit: number;
};

export type Contest = {
  id: string;
  name: string;
  platform: PlatformEnum;
  start_date: Date;
  end_date: Date;
  duration: number;
  manager: string;
  registered_participants: number | undefined;
  source: string;
  extracted_at: string;
};

export type ContestStanding = {
  id: string;
  contest_id: string;
  rank: number;
  university: string;
  team: string;
  problems_solved: number;
  total_time: number;
  problems_stats: Record<string, number>;
};
