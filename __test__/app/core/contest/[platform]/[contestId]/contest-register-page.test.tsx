import { useToast } from "@/components/ui/use-toast";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { findContest } from "../../../../../../src/app/core/contest/[platform]/[contestId]/actions";
import ContestRegisterPage from "../../../../../../src/app/core/contest/[platform]/[contestId]/page";

vi.mock(
  "../../../../../../src/app/core/contest/[platform]/[contestId]/actions",
  () => ({
    findContest: vi.fn(),
    saveScrapedContest: vi.fn(),
    setUniversityNames: vi.fn(),
    getTags: vi.fn(),
  })
);

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock("@/components/ui/use-toast", () => ({
  useToast: vi.fn(),
}));

describe("ContestRegisterPage", () => {
  const mockContest = Promise.resolve({
    contest: Promise.resolve({
      id: 1,
      name: "Contest 1",
    }),
    problems: Promise.resolve([
      {
        id: 1,
        name: "Problem 1",
      },
    ]),
    submissions: Promise.resolve([
      {
        id: 1,
        userName: "user1",
        language: "Python",
        result: "Accepted",
        timeConsumed: 100,
        memoryConsumed: 256,
        sourceCode: "print('Hello, World!')",
      },
    ]),
    standings: Promise.resolve([
      {
        id: 1,
        userName: "user1",
        universityName: "University 1",
        rank: 1,
        problemStatistics: [
          {
            problemId: 1,
            index: "A",
            submitTime: 10,
            attempts: 1,
          },
        ],
      },
    ]),
  });

  const mockUseParams = {
    platform: "VJUDGE",
    contestId: "123",
  };

  const mockUseRouter = {
    push: vi.fn(),
  };

  const mockUseToast = {
    toast: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as Mock).mockReturnValue(mockUseParams);
    (findContest as Mock).mockResolvedValue(mockContest);
    (useRouter as Mock).mockReturnValue(mockUseRouter);
    (useToast as Mock).mockReturnValue(mockUseToast);
  });

  it("should render the page with tabs", async () => {
    render(<ContestRegisterPage />);
    await waitFor(() => {
      expect(screen.getByText("Metadatos")).not.toBeNull();
      expect(screen.getByText("Problemas")).not.toBeNull();
      expect(screen.getByText("Envíos")).not.toBeNull();
      expect(screen.getByText("Resultados")).not.toBeNull();
    });
  });

  it("should render the ContestMetadataForm component when contestMetadata is available", async () => {
    await waitFor(() => {
      expect(screen.getByText("Guardar")).not.toBeNull();
    });
  });
});
