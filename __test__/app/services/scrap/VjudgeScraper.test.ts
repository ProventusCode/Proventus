import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { VjudgeScraper } from "../../../../src/services/scrap/VjudgeScraper";

global.fetch = vi.fn();

const contestId = "123";

vi.mock("cheerio", () => ({
  load: vi.fn(() => () => {
    return { each: vi.fn(), text: vi.fn() };
  }),
}));

describe("VjudgeScraper", () => {
  let vjudgeScraper: VjudgeScraper;

  beforeEach(() => {
    vjudgeScraper = new VjudgeScraper();
    vi.clearAllMocks();
  });

  it("should validate contest ID correctly", () => {
    expect(vjudgeScraper.isValidContestId(contestId)).toBe(true);
    expect(vjudgeScraper.isValidContestId("abc")).toBe(false);
  });

  it("should fetch contest metadata correctly", async () => {
    const mockContestData = {
      id: 123,
      name: "Vjudge Contest",
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      email: "manager@example.com",
    };

    const mockCountData = "100";

    (global.fetch as Mock)
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockContestData),
      })
      .mockResolvedValueOnce({
        text: vi.fn().mockResolvedValue(mockCountData),
      });

    const result = await vjudgeScraper.getContestMetadata(contestId);

    expect(result.contestId).toEqual(contestId);
  });

  it("should fetch problems correctly", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      text: vi.fn().mockResolvedValue("{}"),
    });

    const result = await vjudgeScraper.getProblems(contestId);

    expect(result).toEqual([]);
  });

  it("should fetch submissions correctly", async () => {
    const mockSubmissionData = {
      data: [
        {
          id: 1,
          problemName: "Problem 1",
          status: "ACCEPTED",
          time: 1000,
        },
      ],
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockSubmissionData),
    });
    const result = await vjudgeScraper.getSubmissions(contestId);
    expect(result[0].contestId).toEqual(contestId);
  });

  it("should fetch contest standings correctly", async () => {
    const mockContestData = {
      id: 1,
    };

    const mockStandingsData = [
      {
        teamName: "Team 1",
        institution: "University 1",
        rank: 1,
        problemsSolved: 5,
        totalTime: 300,
      },
    ];

    (global.fetch as Mock)
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockContestData),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockStandingsData),
      });

    const result = await vjudgeScraper.getContestStandings(contestId);

    expect(result).toEqual([]);
  });
});
