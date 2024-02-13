type Submission = {
  code_length: number;
  contest_id: string;
  id: number;
  language: string;
  memory_consumed: number | -1;
  problem_name: string;
  result: string;
  submission_date: string;
  time_consumed: number | -1;
  user_name: string;
};

type Problem = {
  indicative: string;
  id: string;
  problem_name: string;
  origin: string;
  time_limit: number;
  memory_limit: number;
};

type Contest = {
  id: string;
  contest_name: string;
  platform: string;
  start_date: string;
  duration: number;
  end_date: string;
  manager: string;
  registered_participants: number | -1;
  source: string;
  extracted_at: string;
};
