interface Scraper {
  isValidContestId(contestId: string): boolean;
  getContestMetadata(contestId: string): Promise<Contest>;
  getProblems(contestId: string): Promise<Array<Problem>>;
  getSubmissions(contestId: string): Promise<Array<Submission>>;
}
