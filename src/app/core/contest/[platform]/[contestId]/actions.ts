"use server";

import { Option } from "@/components/ui/multiple-selector.ext";
import { NewContest } from "@/db/schema/Contest";
import { saveAllCompetitors } from "@/services/actions/CompetitorActions";
import { saveContest } from "@/services/actions/ContestActions";
import { saveAllProblems } from "@/services/actions/ProblemActions";
import { saveAllStandings } from "@/services/actions/StandingsActions";
import { saveAllSubmission } from "@/services/actions/SubmissionActions";
import { ProblemMapper } from "@/services/mappers/ProblemMapper";
import { CompetitorMapper } from "@/services/mappers/CompetitorMapper";
import { SubmissionMapper } from "@/services/mappers/SubmissionMapper";
import { ScraperFactory } from "@/services/scrap/ScraperFactory";
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

const TAGS = [
  { label: "DP", value: "DP" },
  { label: "Graph", value: "Graph" },
  { label: "Math", value: "Math" },
  { label: "Greedy", value: "Greedy" },
  { label: "String", value: "String" },
  { label: "Implementation", value: "Implementation" },
  { label: "Data Structures", value: "Data Structures" },
  { label: "BFS", value: "BFS" },
  { label: "DFS", value: "DFS" },
  { label: "Binary Search", value: "Binary Search" },
  { label: "Two Pointers", value: "Two Pointers" },
  { label: "Bit Manipulation", value: "Bit Manipulation" },
  { label: "Divide and Conquer", value: "Divide and Conquer" },
  { label: "Dynamic Programming", value: "Dynamic Programming" },
  { label: "Backtracking", value: "Backtracking" },
  { label: "Stack", value: "Stack" },
  { label: "Queue", value: "Queue" },
  { label: "Priority Queue", value: "Priority Queue" },
  { label: "Heap", value: "Heap" },
  { label: "Hash Table", value: "Hash Table" },
  { label: "Set", value: "Set" },
  { label: "Map", value: "Map" },
  { label: "Tree", value: "Tree" },
  { label: "Binary Tree", value: "Binary Tree" },
  { label: "Binary Search Tree", value: "Binary Search Tree" },
  { label: "Segment Tree", value: "Segment Tree" },
  { label: "Fenwick Tree", value: "Fenwick Tree" },
  { label: "Trie", value: "Trie" },
  { label: "Graph Theory", value: "Graph Theory" },
  { label: "Shortest Path", value: "Shortest Path" },
  { label: "Minimum Spanning Tree", value: "Minimum Spanning Tree" },
  { label: "Topological Sort", value: "Topological Sort" },
];

export async function getTags(): Promise<Option[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TAGS);
    }, 1000);
  });
}
