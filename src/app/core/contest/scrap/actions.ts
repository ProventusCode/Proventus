"use server";

import { ScraperFactory } from "@/services/scrap/ScraperFactory";
import {
  Contest,
  Problem,
  Submission,
  ContestStanding,
} from "@/types/contest.types";

interface Response {
  contest: Promise<Contest>;
  problems: Promise<Problem[]>;
  submissions: Promise<Submission[]>;
  standings: Promise<ContestStanding[]>;
}

interface Error {
  field: "platform" | "contestId";
  message: string;
}

export async function scrapContest(
  platform: string,
  contestId: string
): Promise<Response | Error> {
  const scraperService = ScraperFactory.getCreator(platform);
  if (!scraperService) {
    return { field: "platform", message: "Plataforma inválida" };
  }

  if (!scraperService.isValidContestId(contestId)) {
    return { field: "contestId", message: "ID de contest inválido" };
  }

  const contest = scraperService.getContestMetadata(contestId);
  const problems = scraperService.getProblems(contestId);
  const submissions = scraperService.getSubmissions(contestId);
  const standings = scraperService.getContestStandings(contestId);

  return { contest, problems, submissions, standings };
}
