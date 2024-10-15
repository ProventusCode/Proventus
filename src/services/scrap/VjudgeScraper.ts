import { ProblemStatistic } from "@/db/schema/contestStanding";
import { PlatformEnum } from "@/enums/PlatformEnum";
import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";

import { DataUtils } from "@/utils/DataUtils";
import { DateUtils } from "@/utils/DateUtils";
import { ObjectUtils } from "@/utils/ObjectUtils";
import { StringUtils } from "@/utils/StringUtils";
import * as cheerio from "cheerio";
import { ENDPOINTS } from "../endpoints";
import { ScraperService } from "./ScraperService";
import {
  VjudgeContest,
  VjudgeProblem,
  VjudgeSubmission,
} from "./types/VjudgeResponses";

export class VjudgeScraper implements ScraperService {
  isValidContestId(contestId: string): boolean {
    return Number.isInteger(Number(contestId));
  }

  async getContestMetadata(contestId: string): Promise<ContestType> {
    const metadataEndpoint = `${ENDPOINTS.vjudge.contest}/${contestId}`;
    const rankEndpoint = `${ENDPOINTS.vjudge.rank}/${contestId}`;

    const rank = await fetch(rankEndpoint);
    const rankJson = await rank.json();

    const metadata = await fetch(metadataEndpoint);
    const html = await metadata.text();
    const $ = cheerio.load(html);

    const rawJson = $('textarea[name="dataJson"]').text() || "{}";
    const vjudgeContest: VjudgeContest = JSON.parse(rawJson);

    return {
      contestId: contestId,
      name: vjudgeContest?.title ?? rankJson?.title,
      platform: PlatformEnum.VJUDGE,
      startDate: DateUtils.toPostgresDate(vjudgeContest?.begin),
      endDate: DateUtils.toPostgresDate(vjudgeContest?.end),
      manager: vjudgeContest?.managerName,
      participants: ObjectUtils.countObjectKeys(rankJson?.participants),
      source: metadataEndpoint,
    };
  }

  async getProblems(contestId: string): Promise<ProblemType[]> {
    const endpoint = `${ENDPOINTS.vjudge.contest}/${contestId}`;

    const response = await fetch(endpoint);
    const html = await response.text();
    const $ = cheerio.load(html);

    const rawJson = $('textarea[name="dataJson"]').text() || "{}";
    const vjudgeProblems = JSON.parse(rawJson);

    return (
      vjudgeProblems?.problems?.map(
        (problem: VjudgeProblem): ProblemType => ({
          problemId: `${contestId}-${problem.num}`,
          index: problem.num,
          name: problem.title,
          origin: problem.oj,
          timeLimit: DataUtils.msToSec(
            DataUtils.separateValueWithUnit(problem.properties[0].content)
          ),
          memoryLimit: DataUtils.kbToMb(
            DataUtils.separateValueWithUnit(problem.properties[1].content)
          ),
        })
      ) ?? []
    );
  }

  async getSubmissions(contestId: string): Promise<SubmissionType[]> {
    let start = 0;
    const paginationSize = 20;
    const statusEndpoint = new URL(ENDPOINTS.vjudge.status);
    statusEndpoint.searchParams.set("start", start.toString());
    statusEndpoint.searchParams.set("length", paginationSize.toString());
    statusEndpoint.searchParams.set("contestId", contestId);
    statusEndpoint.searchParams.set("inContest", "true");

    const submissions: SubmissionType[] = [];
    while (true) {
      try {
        const response = await fetch(statusEndpoint);
        const json = await response.json();
        const data: SubmissionType[] = json?.data.map(
          (submission: VjudgeSubmission): SubmissionType => ({
            submissionId: submission.runId,
            codeLength: submission.sourceLength,
            contestId: contestId,
            language: submission.languageCanonical,
            memoryConsumed: submission.memory,
            problemId: `${contestId}-${submission.contestNum}`,
            index: submission.contestNum,
            result: DataUtils.normalizeResult(submission.status),
            submissionDateTime: DateUtils.toPostgresDate(
              new Date(submission.time)
            ),
            timeConsumed: submission.runtime,
            userName: submission.userName,
          })
        );
        if (data.length === 0) {
          break;
        }
        submissions.push(...data);
        start += 20;
        statusEndpoint.searchParams.set("start", start.toString());
      } catch (e) {
        console.error(e);
        break;
      }
    }
    return submissions;
  }

  async getContestStandings(contestId: string): Promise<ContestStandingType[]> {
    const url = `${ENDPOINTS.vjudge.contest}/${contestId}#rank`;
    console.log("getContestStandings: ", url);

    const contestRankTable = "#contest-rank-table tbody tr";
    const result = await fetch(ENDPOINTS.proxy, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apikey: process.env.WINTR_API_KEY,
        method: "GET",
        url: url,
        jsrender: true,
        waitfor: contestRankTable.split(" ")[0],
      }),
    });

    const response = await result.json();
    const $ = cheerio.load(response.content);

    const $table = $(contestRankTable);
    console.log("getContestStandings.result: ", $table?.length);

    const standings: ContestStandingType[] = [];
    $table.each((_, row) => {
      const $row = $(row);

      const $problems = $row.find(".prob");
      const problemStatistics: ProblemStatistic[] = [];
      $problems.each((index, problem) => {
        const $problem = $(problem);
        const problemResult = this.parseProblemResult($problem.text().trim());
        const problemStats = {
          problemId: `${contestId}-${StringUtils.intToUpperChar(index)}`,
          index: `${StringUtils.intToUpperChar(index)}`,
          ...problemResult,
        };
        problemStatistics.push(problemStats);
      });

      const standing: ContestStandingType = {
        contestId: contestId,
        rank: Number($row.find(".rank").text().trim()),
        userName: DataUtils.splitAndGetFirst($row.find(".team").text().trim()),
        problemsSolved: Number($row.find(".solved").text().trim()),
        totalTime: Number($row.find(".penalty > .minute").text().trim()),
        problemStatistics: problemStatistics,
      };
      standings.push(standing);
    });
    return standings;
  }

  async setUniversityNames(
    standings: ContestStandingType[]
  ): Promise<ContestStandingType[]> {
    for (const standing of standings) {
      const universityName = await this.extractUniversityName(
        standing.userName
      );
      standing.universityName = universityName;
    }
    return standings;
  }

  private async extractUniversityName(userName: string): Promise<string> {
    const url = `${ENDPOINTS.vjudge.user}/${userName}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return DataUtils.normalizeUniversityName(
      $(".user-info > dd:nth-child(6)").text().trim()
    );
  }

  private parseProblemResult(problemResult: string) {
    const submitTimeRegex = /(\d+:\d+:\d+)/;
    const attemptsRegex = /(-\d+)/;
    const submitTime = RegExp(submitTimeRegex).exec(problemResult);
    const attempts = RegExp(attemptsRegex).exec(problemResult);

    return {
      submitTime: submitTime
        ? DateUtils.convertHourToMinutes(submitTime[0])
        : 0,
      attempts: attempts ? parseInt(attempts[0]) : 0,
    };
  }
}
