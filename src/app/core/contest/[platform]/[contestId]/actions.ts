"use server";

import { Option } from "@/components/ui/multiple-selector.ext";
import { NewContest } from "@/db/schema/contest";
import { saveAllCompetitors } from "@/services/actions/CompetitorActions";
import { saveContest } from "@/services/actions/ContestActions";
import { selectAllEnumValues } from "@/services/actions/EnumActions";
import { saveAllProblems } from "@/services/actions/ProblemActions";
import { saveAllStandings } from "@/services/actions/StandingsActions";
import { saveAllSubmission } from "@/services/actions/SubmissionActions";
import { CompetitorMapper } from "@/services/mappers/CompetitorMapper";
import { ProblemMapper } from "@/services/mappers/ProblemMapper";
import { SubmissionMapper } from "@/services/mappers/SubmissionMapper";
import { ScraperFactory } from "@/services/scrap/ScraperFactory";
import { VjudgeScraper } from "@/services/scrap/VjudgeScraper";
import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";

interface ScrapResponse {
  contest: Promise<ContestType>;
  problems: Promise<ProblemType[]>;
  submissions: Promise<SubmissionType[]>;
  standings: Promise<ContestStandingType[]>;
}

export async function scrapContest(
  platform: string,
  contestId: string
): Promise<ScrapResponse> {
  const scraperService = ScraperFactory.getCreator(platform);

  const contest = scraperService.getContestMetadata(contestId);
  const problems = scraperService.getProblems(contestId);
  const submissions = scraperService.getSubmissions(contestId);
  const standings = scraperService.getContestStandings(contestId);

  return { contest, problems, submissions, standings };
}

export async function setUniversityNames(
  platform: string,
  standings: ContestStandingType[]
): Promise<ContestStandingType[]> {
  const scraperService = ScraperFactory.getCreator(platform);
  if (scraperService instanceof VjudgeScraper) {
    return await scraperService.setUniversityNames(standings);
  }
  return standings;
}

interface ContestRequest {
  contestMetadata: NewContest;
  problems: ProblemType[] | undefined;
  submissions: SubmissionType[] | undefined;
  standings: ContestStandingType[] | undefined;
}

export async function saveScrapedContest(
  request: ContestRequest
): Promise<void> {
  const { contestMetadata, problems, submissions, standings } = request;

  await saveContest(contestMetadata);
  if (standings && standings.length > 0) {
    await saveAllCompetitors(
      CompetitorMapper.toNewCompetitorSet(submissions, standings)
    );
    saveAllStandings(standings);
  }
  if (problems && problems.length > 0) {
    await saveAllProblems(ProblemMapper.toNewProblemList(problems));
  }
  if (submissions && submissions.length > 0) {
    saveAllSubmission(SubmissionMapper.toNewSubmissionList(submissions));
  }
}

export async function getTags(): Promise<Option[]> {
  const tags = await selectAllEnumValues("tag_enum");
  return tags.map((row) => ({
    label: row.label,
    value: row.label,
  }));
}
