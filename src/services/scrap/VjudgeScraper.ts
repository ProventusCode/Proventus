import { toPostgresDate } from "@/utils/dateUtils";
import { PlatformEnum } from "@/enums/PlatformEnum";
import { BrowserFactory } from "@/services/scrap/BrowserFactory";
import {
  Contest,
  ContestStanding,
  Problem,
  Submission,
} from "@/types/contest.types";
import * as cheerio from "cheerio";
import { randomUUID } from "crypto";
import { endpoints } from "../endpoints";
import { ScraperService } from "./ScraperService";

export class VjudgeScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }

  async getContestMetadata(contestId: string): Promise<Contest> {
    const endpoint = `${endpoints.vjudge.contest}/${contestId}`;

    const response = await fetch(endpoint);
    const html = await response.text();
    const $ = cheerio.load(html);

    const rawText = $('textarea[name="dataJson"]').text() || "{}";
    const data = JSON.parse(rawText);

    const start = new Date(data.begin);
    const end = new Date(data.end);
    const duration = end.getTime() - start.getTime();

    return {
      id: contestId,
      name: data.title,
      platform: PlatformEnum.VJUDDE,
      start_date: start,
      end_date: end,
      duration: duration,
      manager: data.managerName,
      registered_participants: 0,
      source: endpoint,
      extracted_at: toPostgresDate(new Date()),
    };
  }

  async getProblems(contestId: string): Promise<Problem[]> {
    const endpoint = `${endpoints.vjudge.contest}/${contestId}`;

    const response = await fetch(endpoint);
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
    let start = 0;
    const paginationSize = 20;
    const statusEndpoint = new URL(endpoints.vjudge.status);
    statusEndpoint.searchParams.set("start", start.toString());
    statusEndpoint.searchParams.set("length", paginationSize.toString());
    statusEndpoint.searchParams.set("contestId", contestId);
    statusEndpoint.searchParams.set("inContest", "true");

    const submissions: Submission[] = [];
    while (true) {
      try {
        const response = await fetch(statusEndpoint);
        const json = await response.json();
        const data: Submission[] = json.data.map((submission: any) => ({
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

  async getContestStandings(contestId: string): Promise<ContestStanding[]> {
    const endpoint = `${endpoints.vjudge.contest}/${contestId}#rank`;

    const browser = await BrowserFactory.getBrowser();
    const page = await browser.newPage();
    await page.goto(endpoint);

    await page.waitForNetworkIdle();
    const html = await page.content();

    const $ = cheerio.load(html);

    const $table = $("#contest-rank-table tbody tr");
    const standings: ContestStanding[] = [];
    $table.each((_i, tr) => {
      const $tr = $(tr);
      const $td = $tr.find("td");

      const problems: Record<string, number> = {};
      for (let i = 4; i < $td.length; i++) {
        const problem = $td.eq(i).text().trim();
        if (problem === "") {
          break;
        }
        problems[String.fromCharCode(65 + i - 4)] = Number(problem);
      }
      const standing = {
        contest_id: contestId,
        id: randomUUID(),
        university: "",
        rank: Number($td.eq(0).text().trim()),
        team: $td.eq(1).text().trim(),
        problems_solved: Number($td.eq(2).text().trim()),
        total_time: Number($td.eq(3).text().trim()),
        problems_stats: {},
      };
      standings.push(standing);
    });

    await browser.close();
    return standings;
  }
}
