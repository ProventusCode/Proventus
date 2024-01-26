interface Scraper {
  getContestMetadata(contestId: number): Promise<Contest>;
  getProblems(contestId: number): Promise<Array<Problem>>;
  getSubmissions(contestId: number): Promise<Array<Submission>>;
}
