export class CodeforcesScraper implements Scraper {
  getContestMetadata(contestId: number): Promise<Contest> {
    throw new Error("Method not implemented.");
  }
  getProblems(contestId: number): Promise<Problem[]> {
    throw new Error("Method not implemented.");
  }
  getSubmissions(contestId: number): Promise<Submission[]> {
    throw new Error("Method not implemented.");
  }
}
