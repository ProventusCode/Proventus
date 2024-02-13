import * as cheerio from "cheerio";
import { toPostgresDate } from "../utils";

export class VjudgeScraper implements Scraper {

  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }

  async getContestMetadata(contestId: string): Promise<Contest> {
    const ENV_ENDPOINT = "https://vjudge.net/contest/" + contestId;

    const response = await fetch(ENV_ENDPOINT);
    const html = await response.text();
    const $ = cheerio.load(html);

    const rawText = $('textarea[name="dataJson"]').text() || "{}";
    const data = JSON.parse(rawText);

    const start = new Date(data.begin);
    const end = new Date(data.end);
    const duration = end.getTime() - start.getTime();

    return {
      id: data.id,
      contest_name: data.title,
      platform: "Vjudge",
      start_date: toPostgresDate(start),
      end_date: toPostgresDate(end),
      duration: duration,
      manager: data.managerName,
      registered_participants: 0,
      source: ENV_ENDPOINT,
      extracted_at: toPostgresDate(new Date()),
    };
  }

  async getProblems(contestId: string): Promise<Problem[]> {
    const ENV_ENDPOINT = "https://vjudge.net/contest/" + contestId;

    const response = await fetch(ENV_ENDPOINT);
    const html = await response.text();
    const $ = cheerio.load(html);

    const rawText = $('textarea[name="dataJson"]').text() || "{}";
    const data = JSON.parse(rawText);
    return data.problems.map(
      (problem: any): Problem => ({
        indicative: problem?.num,
        id: problem?.pid,
        problem_name: problem?.title,
        origin: problem?.oj,
        time_limit: problem?.properties[0].content.split(" ")[0],
        memory_limit: problem?.properties[1].content.split(" ")[0],
      })
    );
  }

  async getSubmissions(contestId: string): Promise<Submission[]> {
    const ENV_ENDPOINT = "https://vjudge.net/status/data";

    let start = 0;
    const paginationSize = 20;
    const statusEndpoint = new URL(ENV_ENDPOINT);
    statusEndpoint.searchParams.set("start", start.toString());
    statusEndpoint.searchParams.set("length", paginationSize.toString());
    statusEndpoint.searchParams.set("contestId", contestId);
    statusEndpoint.searchParams.set("inContest", "true");

    const submissions: any[] = [];
    while (true) {
      try {
        const response = await fetch(statusEndpoint);
        const json = await response.json();
        const data: Array<any> = json.data.map((submission: any) => ({
          code_length: submission.sourceLength,
          contest_id: submission.contestId,
          id: submission.runId,
          language: submission.language,
          memory_consumed: submission.memory,
          problem_name: submission.contestNum,
          result: submission.status,
          submission_date: toPostgresDate(new Date(submission.time)),
          time_consumed: submission.runtime,
          user_name: submission.userName,
        }));
        if (data.length === 0) {
          break;
        }
        submissions.push(...data);
        start += 20;
        statusEndpoint.searchParams.set("start", start.toString());
      } catch (e) {
        console.log(e);
        break;
      }
    }
    return submissions;
  }
}
