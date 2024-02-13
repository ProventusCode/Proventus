export class CodeforcesScraper implements Scraper {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }
  getContestMetadata(contestId: string): Promise<Contest> {
    throw new Error("Method not implemented.");
  }
  getProblems(contestId: string): Promise<Problem[]> {
    throw new Error("Method not implemented.");
  }
  getSubmissions(contestId: string): Promise<Submission[]> {
    throw new Error("Method not implemented.");
  }
}
