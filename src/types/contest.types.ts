import { Platform } from "@/enums/platform";

export type Submission = {
  code_length: number;
  contest_id: string;
  id: string;
  language: string;
  memory_consumed: number | undefined;
  problem_name: string;
  result: string;
  submission_date: string;
  time_consumed: number | undefined;
  user_name: string;
};

export type Problem = {
  indicative: string;
  id: string;
  problem_name: string;
  origin: string;
  time_limit: number;
  memory_limit: number;
};

export type Contest = {
  id: string;
  contest_name: string;
  platform: Platform;
  start_date: string;
  duration: number;
  end_date: string;
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
