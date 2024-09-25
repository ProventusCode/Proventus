export interface VjudgeContest {
  begin: number;
  end: number;
  title: string;
  managerName: string;
}

export interface VjudgeProblem {
  title: string;
  num: string;
  oj: string;
  properties: {
    content: string;
  }[];
}

export interface VjudgeSubmission {
  language: string;
  languageCanonical: string;
  userName: string;
  userId: number;
  contestId: string;
  contestNum: string;
  runId: number;
  time: number;
  sourceLength: number;
  status: string;
  memory?: number;
  runtime?: number;
}
