import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import ContestsListPage from "../../../../src/app/core/contest/page";
import { findAllContest } from "@/services/actions/ContestActions";
import { ContestMapper } from "@/services/mappers/ContestMapper";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("@/services/actions/ContestActions", () => ({
  findAllContest: vi.fn(),
}));

vi.mock("@/services/mappers/ContestMapper", () => ({
  ContestMapper: {
    toContestTypeList: vi.fn(),
  },
}));

describe("ContestsListPage", () => {
  const mockContests = [
    {
      id: 1,
      name: "Contest 1",
      date: "2023-01-01",
      location: "Location 1",
    },
    {
      id: 2,
      name: "Contest 2",
      date: "2023-02-01",
      location: "Location 2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (findAllContest as Mock).mockResolvedValue(mockContests);
    (ContestMapper.toContestTypeList as Mock).mockReturnValue(mockContests);
  });

  it("should render the page title", () => {
    render(<ContestsListPage />);
    expect(screen.getByText("Gestión de competencias")).not.toBeNull();
  });

  it("should render the ContestForm component", () => {
    expect(screen.getByText("Agregar competencia")).not.toBeNull();
  });

  it("should render the DataTable component with contests", async () => {
    await waitFor(() => {
      expect(screen.getByText("Contest 1")).not.toBeNull();
      expect(screen.getByText("Contest 2")).not.toBeNull();
    });
  });

  it("should render the SkeletonTable component when contests are loading", () => {
    (findAllContest as Mock).mockResolvedValueOnce([]);
    render(<ContestsListPage />);
    expect(screen.getByTestId("standings")).not.toBeNull();
  });
});
