export class IcpcScraper implements Scraper, Browseable {

  isValidContestId(contestId: string): boolean {
    throw new Error("Method not implemented.");
  }
  async getContestMetadata(contestId: string): Promise<Contest> {
    const ENV_URL =
      "https://icpc.global/regionals/finder/ColombiaMaratonNalACISREDIS-2024";
  }
  getProblems(contestId: string): Promise<Problem[]> {
    throw new Error("Method not implemented.");
  }
  getSubmissions(contestId: string): Promise<Submission[]> {
    throw new Error("Method not implemented.");
  }

  async getContestStandings(contestId: string): Promise<any[]> {
    const COUNT_URL =
      "https://icpc.global/api/contest/public/search/contest/7549/count?q=proj";

    const countResponse = await fetch(COUNT_URL);
    const countData = await countResponse.text();

    const ENV_URL =
      "https://icpc.global/api/contest/public/search/contest/7549?q=proj:teamId,time,rank,institution,teamName,problemsSolved,totalTime,lastProblemTime,medalCitation%3Bsort:rank+asc,problemsSolved+desc,totalTime+asc,lastProblemTime+asc%3B&page=1&size=" +
      countData;
    const response = await fetch(ENV_URL);

    const data = await response.json();

    return data;
  }
}
