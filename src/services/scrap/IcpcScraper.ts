import { ContestType, ProblemType, SubmissionType } from "@/types/contest.types";
import { ScraperService } from "./ScraperService";

export class IcpcScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    throw new Error("Method not implemented.");
  }

  async getContestMetadata(contestId: string): Promise<ContestType> {
    const ENV_URL =
      "https://icpc.global/regionals/finder/ColombiaMaratonNalACISREDIS-2024";
    return await fetch(ENV_URL).then((res) => res.json());
  }

  async getProblems(contestId: string): Promise<ProblemType[]> {
    throw new Error("Method not implemented.");
  }

  async getSubmissions(contestId: string): Promise<SubmissionType[]> {
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
