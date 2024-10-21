import { PlatformEnum } from "@/enums/PlatformEnum";
import { DateUtils } from "@/utils/DateUtils";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ENDPOINTS } from "../../../../src/services/endpoints";
import { IcpcScraper } from "../../../../src/services/scrap/IcpcScraper";

global.fetch = vi.fn();

describe("IcpcScraper", () => {
  let icpcScraper: IcpcScraper;

  beforeEach(() => {
    icpcScraper = new IcpcScraper();
    vi.clearAllMocks();
  });

  it("should validate contest ID correctly", () => {
    expect(icpcScraper.isValidContestId("123")).toBe(true);
    expect(icpcScraper.isValidContestId("abc")).toBe(false);
  });

  it("should fetch contest metadata correctly", async () => {
    const mockContestData = {
      id: 1,
      name: "ICPC Contest",
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

    const result = await icpcScraper.getContestMetadata("2023");

    expect(result).toEqual({
      contestId: 1,
      name: "ICPC Contest",
      platform: PlatformEnum.ICPC,
      startDate: DateUtils.toDateWithTime("2023-01-01", "13:00:00"),
      endDate: DateUtils.toDateWithTime("2023-01-02", "18:00:00"),
      source: `${ENDPOINTS.icpc.finder}-1`,
      manager: "manager@example.com",
      participants: 100,
    });
  });

  it("should fetch problems correctly", async () => {
    const result = await icpcScraper.getProblems("123");
    expect(result).toEqual([]);
  });

  it("should fetch submissions correctly", async () => {
    const result = await icpcScraper.getSubmissions("123");
    expect(result).toEqual([]);
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

    const result = await icpcScraper.getContestStandings("2023");

    expect(result).toEqual([
      {
        contestId: 1,
        userName: "Team 1",
        universityName: "University 1",
        rank: 1,
        problemsSolved: 5,
        totalTime: 300,
        problemStatistics: [],
      },
    ]);
  });
});
