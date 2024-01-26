type Submission = {
  code_length: number;
  contest_id: number;
  id: number;
  language: string;
  memory_consumed: number | null;
  problem_name: string;
  result: string;
  submission_date: string;
  time_consumed: number | null;
  user_name: string;
};

type Problem = {
  id: string;
  problem_name: string;
  origin: string;
  time_limit: number;
  memory_limit: number;
};

type Contest = {
  id: number;
  contest_name: string;
  platform: string;
  start_date: Date;
  end_date: Date;
  manager: string;
  registered_participants: number | -1;
  source: string;
  extracted_at: Date;
};
