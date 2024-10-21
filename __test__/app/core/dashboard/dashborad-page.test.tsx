import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "../../../../src/app/core/dashboard/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../../../../src/app/core/dashboard/components/admin-dashboard", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Admin Dashboard Mock</div>),
}));

describe("DashboardPage", () => {
  it("should render the AdminDashboard component", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Admin Dashboard Mock")).not.toBeNull();
  });
});