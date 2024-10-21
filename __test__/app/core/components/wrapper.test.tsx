import { readUser } from "@/lib/supabase/actions";
import { findUserRole } from "@/services/actions/UserRoleActions";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import Wrapper from "../../../../src/app/core/components/wrapper";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock("@/lib/supabase/actions", () => ({
  readUser: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient: vi.fn(),
}));

vi.mock("@/services/actions/UserRoleActions", () => ({
  findUserRole: vi.fn(),
}));

describe("Wrapper", () => {
  const mockUsePathname = "/";
  const mockUseRouter = {
    push: vi.fn(),
  };

  const mockReadUser = {
    data: {
      user: {
        id: "123",
      },
    },
    error: null,
  };

  const mockFindUserRole = {
    roleResource: {
      resources: [
        {
          id: 1,
          name: "Dashboard",
          href: "/dashboard",
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (usePathname as Mock).mockReturnValue(mockUsePathname);
    (useRouter as Mock).mockReturnValue(mockUseRouter);
    (readUser as Mock).mockResolvedValue(mockReadUser);
    (findUserRole as Mock).mockResolvedValue(mockFindUserRole);
  });

  it("should render the sidebar and header", async () => {
    (readUser as Mock).mockResolvedValue({ data: { user: null }, error: null });
    render(
      <Wrapper>
        <div>Test Content</div>
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Proventus")).not.toBeNull();
      expect(screen.getByText("Home")).not.toBeNull();
    });
  });

  it("should redirect to auth page if user is not found", async () => {
    (readUser as Mock).mockResolvedValue({ data: { user: null }, error: null });
    cleanup();
    render(
      <Wrapper>
        <div>Test Content</div>
      </Wrapper>
    );

    await waitFor(() => {
      expect(mockUseRouter.push).toHaveBeenCalledWith("/auth");
    });
  });

  it("should render unauthorized page if user role is not found", async () => {
    (findUserRole as Mock).mockResolvedValue(null);
    cleanup();
    render(
      <Wrapper>
        <div>Test Content</div>
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Volver a la página de inicio")).not.toBeNull();
    });
  });

  it("should render spinner while loading user role", async () => {
    (findUserRole as Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(null), 100))
    );
    cleanup();
    render(
      <Wrapper>
        <div>Test Content</div>
      </Wrapper>
    );

    expect(screen.getByTestId("spinner")).not.toBeNull();
  });
});
