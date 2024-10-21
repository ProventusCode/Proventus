"use server";

import { Option } from "@/components/ui/multiple-selector.ext";
import { NewContest } from "@/db/schema/contest";
import { saveAllCompetitors } from "@/services/actions/CompetitorActions";
import {
  existContestById,
  findContestById,
  saveContest,
} from "@/services/actions/ContestActions";
import { selectAllEnumValues } from "@/services/actions/EnumActions";
import {
  findProblemsByContestId,
  saveAllProblems,
  saveProblemSet,
} from "@/services/actions/ProblemActions";
import {
  findStandingsByContestId,
  saveAllStandings,
} from "@/services/actions/StandingsActions";
import {
  findSubmissionsByContestId,
  saveAllSubmission,
} from "@/services/actions/SubmissionActions";
import { CompetitorMapper } from "@/services/mappers/CompetitorMapper";
import { ContestMapper } from "@/services/mappers/ContestMapper";
import { ProblemMapper } from "@/services/mappers/ProblemMapper";
import { StandingsMapper } from "@/services/mappers/StandingMapper";
import { SubmissionMapper } from "@/services/mappers/SubmissionMapper";
import { ScraperStrategy } from "@/services/scrap/ScraperFactory";
import { VjudgeScraper } from "@/services/scrap/VjudgeScraper";
import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";

interface ContestResponse {
  contest: Promise<ContestType>;
  problems: Promise<ProblemType[]>;
  submissions: Promise<SubmissionType[]>;
  standings: Promise<ContestStandingType[]>;
}

export async function findContest(
  platform: string,
  contestId: string
): Promise<ContestResponse> {
  const exist = await existContestById(contestId);
  return exist ? loadContest(contestId) : scrapContest(platform, contestId);
}

export async function loadContest(contestId: string): Promise<ContestResponse> {
  const contest = ContestMapper.toContestTypeAsync(findContestById(contestId));
  const problems = ProblemMapper.toProblemTypeListAsync(
    findProblemsByContestId(contestId)
  );
  const submissions = SubmissionMapper.toSubmissionTypeListAsync(
    findSubmissionsByContestId(contestId)
  );
  const standings = StandingsMapper.toContestStandingTypeListAsync(
    findStandingsByContestId(contestId)
  );

  return { contest, problems, submissions, standings };
}

export async function scrapContest(
  platform: string,
  contestId: string
): Promise<ContestResponse> {
  const scraperService = ScraperStrategy.getStrategy(platform);

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
  const scraperService = ScraperStrategy.getStrategy(platform);
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
    const insertedRow = await saveProblemSet({
      contestId: contestMetadata.contestId,
    });
    const problemSetId = problems[0].problemSetId ?? insertedRow[0].insertedId;

    await saveAllProblems(
      ProblemMapper.toNewProblemList(problems, problemSetId)
    );
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
