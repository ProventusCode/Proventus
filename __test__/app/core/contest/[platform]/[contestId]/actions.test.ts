import { saveAllCompetitors } from "@/services/actions/CompetitorActions";
import {
  existContestById,
  findContestById,
  saveContest,
} from "@/services/actions/ContestActions";
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
import { ScraperStrategy } from "@/services/scrap/ScraperFactory";
import { VjudgeScraper } from "@/services/scrap/VjudgeScraper";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import {
  findContest,
  getTags,
  loadContest,
  saveScrapedContest,
  scrapContest,
  setUniversityNames,
} from "../../../../../../src/app/core/contest/[platform]/[contestId]/actions";

vi.mock("@/services/actions/ContestActions", () => ({
  existContestById: vi.fn(),
  findContestById: vi.fn(),
  saveContest: vi.fn(),
}));

vi.mock("@/services/actions/ProblemActions", () => ({
  findProblemsByContestId: vi.fn(),
  saveAllProblems: vi.fn(),
  saveProblemSet: vi.fn(),
}));

vi.mock("@/services/actions/StandingsActions", () => ({
  findStandingsByContestId: vi.fn(),
  saveAllStandings: vi.fn(),
}));

vi.mock("@/services/actions/SubmissionActions", () => ({
  findSubmissionsByContestId: vi.fn(),
  saveAllSubmission: vi.fn(),
}));

vi.mock("@/services/actions/CompetitorActions", () => ({
  saveAllCompetitors: vi.fn(),
}));

vi.mock("@/services/scrap/ScraperFactory", () => ({
  ScraperStrategy: {
    getStrategy: vi.fn(),
  },
}));

vi.mock("@/db/drizzle", () => ({
  database: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({ onConflictDoUpdate: vi.fn() })),
    })),
    execute: vi.fn(() => [{ label: "tag1" }, { label: "tag2" }]),
  },
}));

vi.mock("drizzle-orm", () => ({
  sql: {
    raw: vi.fn(),
  },
  getTableColumns: vi.fn(() => ({
    id: { name: "id" },
    name: { name: "name" },
  })),
}));

describe("actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findContest", () => {
    it("should load contest if it exists", async () => {
      (existContestById as Mock).mockResolvedValue(true);
      (findContestById as Mock).mockResolvedValue({ id: "123" });

      const result = await findContest("platform", "123");

      expect(existContestById).toHaveBeenCalledWith("123");
      expect(result).toEqual({
        contest: expect.any(Promise),
        problems: expect.any(Promise),
        submissions: expect.any(Promise),
        standings: expect.any(Promise),
      });
    });

    it("should scrap contest if it does not exist", async () => {
      (existContestById as Mock).mockResolvedValue(false);
      (ScraperStrategy.getStrategy as Mock).mockReturnValue({
        getContestMetadata: vi.fn().mockResolvedValue({ id: "123" }),
        getProblems: vi.fn().mockResolvedValue([]),
        getSubmissions: vi.fn().mockResolvedValue([]),
        getContestStandings: vi.fn().mockResolvedValue([]),
      });

      const result = await findContest("platform", "123");

      expect(existContestById).toHaveBeenCalledWith("123");
      expect(result).toEqual({
        contest: expect.any(Promise),
        problems: expect.any(Promise),
        submissions: expect.any(Promise),
        standings: expect.any(Promise),
      });
    });
  });

  describe("loadContest", () => {
    it("should load contest data", async () => {
      (findContestById as Mock).mockResolvedValue({ id: "123" });
      (findProblemsByContestId as Mock).mockResolvedValue([]);
      (findSubmissionsByContestId as Mock).mockResolvedValue([]);
      (findStandingsByContestId as Mock).mockResolvedValue([]);

      const result = await loadContest("123");

      expect(result).toEqual({
        contest: expect.any(Promise),
        problems: expect.any(Promise),
        submissions: expect.any(Promise),
        standings: expect.any(Promise),
      });
    });
  });

  describe("scrapContest", () => {
    it("should scrap contest data", async () => {
      (ScraperStrategy.getStrategy as Mock).mockReturnValue({
        getContestMetadata: vi.fn().mockResolvedValue({ id: "123" }),
        getProblems: vi.fn().mockResolvedValue([]),
        getSubmissions: vi.fn().mockResolvedValue([]),
        getContestStandings: vi.fn().mockResolvedValue([]),
      });

      const result = await scrapContest("platform", "123");

      expect(result).toEqual({
        contest: expect.any(Promise),
        problems: expect.any(Promise),
        submissions: expect.any(Promise),
        standings: expect.any(Promise),
      });
    });
  });

  describe("setUniversityNames", () => {
    it("should set university names for VjudgeScraper", async () => {
      const mockStandings = [{ userName: "user1" }];
      (ScraperStrategy.getStrategy as Mock).mockReturnValue(
        new VjudgeScraper()
      );

      const result = await setUniversityNames("vjudge", mockStandings as any);

      expect(result).toEqual(mockStandings);
    });

    it("should return standings if not VjudgeScraper", async () => {
      const mockStandings = [{ userName: "user1" }];
      (ScraperStrategy.getStrategy as Mock).mockReturnValue({
        setUniversityNames: vi.fn(),
      });

      const result = await setUniversityNames("other", mockStandings as any);

      expect(result).toEqual(mockStandings);
    });
  });

  describe("saveScrapedContest", () => {
    it("should save contest data", async () => {
      const mockRequest = {
        contestMetadata: { contestId: "123" },
        problems: [{ id: "1", problemSetId: "1" }],
        submissions: [{ id: "1" }],
        standings: [{ id: "1" }],
      };

      await saveScrapedContest(mockRequest as any);

      expect(saveContest).toHaveBeenCalledWith(mockRequest.contestMetadata);
      expect(saveAllCompetitors).toHaveBeenCalled();
      expect(saveAllStandings).toHaveBeenCalledWith(mockRequest.standings);
      expect(saveProblemSet).toHaveBeenCalledWith({
        contestId: mockRequest.contestMetadata.contestId,
      });
      expect(saveAllProblems).toHaveBeenCalled();
      expect(saveAllSubmission).toHaveBeenCalled();
    });
  });

  describe("getTags", () => {
    it("should get tags", async () => {
      const result = await getTags();

      expect(result).toEqual([
        { label: "tag1", value: "tag1" },
        { label: "tag2", value: "tag2" },
      ]);
    });
  });
});
