import { findAllUser } from "@/services/actions/UserInfoActions";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import UserManagementPage from "../../../../src/app/core/users/page";

vi.mock("@/services/actions/UserInfoActions", () => ({
  findAllUser: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe("UserManagementPage", () => {
  const mockUsers = [
    {
      id: 1,
      name: "User 1",
      email: "user1@example.com",
      userRole: {
        role: "ADMIN",
      },
    },
    {
      id: 2,
      name: "User 2",
      email: "user2@example.com",
      userRole: {
        role: "STUDENT",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (findAllUser as Mock).mockResolvedValue(mockUsers);
    (useSearchParams as Mock).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    });
  });

  it("should render the page title", () => {
    render(<UserManagementPage />);
    expect(screen.getByText("Gestión de usuarios")).not.toBeNull();
  });

  it("should render the Supabase button", () => {
    expect(screen.getByText("Ir a Supabase")).not.toBeNull();
  });

  it("should render the DataTable component with users", async () => {
    await waitFor(() => {
      expect(screen.getByText("User 1")).not.toBeNull();
      expect(screen.getByText("user1@example.com")).not.toBeNull();
      expect(screen.getByText("Admin")).not.toBeNull();
      expect(screen.getByText("User 2")).not.toBeNull();
      expect(screen.getByText("user2@example.com")).not.toBeNull();
      expect(screen.getByText("Estudiante")).not.toBeNull();
    });
  });

  it("should render the SkeletonTable component when users are loading", () => {
    cleanup();
    (findAllUser as Mock).mockResolvedValueOnce([]);
    render(<UserManagementPage />);
    expect(screen.getByTestId("users")).not.toBeNull();
  });
});
