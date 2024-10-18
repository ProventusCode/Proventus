import { RoleEnum } from "@/enums/RoleEnum";
import createSupabaseServerClient from "@/lib/supabase/server";
import {
  exitsUserById,
  saveUserInfo,
} from "@/services/actions/UserInfoActions";
import { saveUserRole } from "@/services/actions/UserRoleActions";
import { NextResponse } from "next/server";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { GET } from "../../../src/app/auth/callback/route";

// Mock the external dependencies
vi.mock("@/lib/supabase/server", () => ({
  default: vi.fn(),
}));

vi.mock("@/services/actions/UserInfoActions", () => ({
  exitsUserById: vi.fn(),
  saveUserInfo: vi.fn(),
}));

vi.mock("@/services/actions/UserRoleActions", () => ({
  saveUserRole: vi.fn(),
}));

describe("GET /auth/callback", () => {
  const mockRequest = (url: string, headers: Record<string, string> = {}) => {
    return new Request(url, { headers: new Headers(headers) });
  };

  const mockSupabaseClient = {
    auth: {
      exchangeCodeForSession: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createSupabaseServerClient as Mock).mockResolvedValue(mockSupabaseClient);
  });

  it("should redirect to /auth/fail if code is missing", async () => {
    const request = mockRequest("http://localhost/auth/callback");
    const response = await GET(request);
    expect(response).toEqual(
      NextResponse.redirect("http://localhost/auth/fail")
    );
  });

  it("should redirect to /auth/fail if exchangeCodeForSession returns an error", async () => {
    mockSupabaseClient.auth.exchangeCodeForSession.mockResolvedValue({
      data: null,
      error: new Error("Some error"),
    });

    const request = mockRequest("http://localhost/auth/callback?code=123");
    const response = await GET(request);
    expect(response).toEqual(
      NextResponse.redirect("http://localhost/auth/fail")
    );
  });

  it("should save user info and role if user does not exist", async () => {
    mockSupabaseClient.auth.exchangeCodeForSession.mockResolvedValue({
      data: {
        user: {
          id: "user-id",
          email: "user@example.com",
          user_metadata: { display_name: "User" },
        },
      },
      error: null,
    });
    (exitsUserById as Mock).mockResolvedValue(false);

    const request = mockRequest("http://localhost/auth/callback?code=123");
    const response = await GET(request);

    expect(saveUserInfo).toHaveBeenCalledWith({
      userId: "user-id",
      email: "user@example.com",
      name: "User",
    });
    expect(saveUserRole).toHaveBeenCalledWith({
      userId: "user-id",
      role: RoleEnum.STUDENT,
    });
    expect(response).toEqual(NextResponse.redirect("http://localhost/core"));
  });

  it("should redirect to the correct URL based on environment and headers", async () => {
    mockSupabaseClient.auth.exchangeCodeForSession.mockResolvedValue({
      data: {
        user: {
          id: "user-id",
          email: "user@example.com",
          user_metadata: { display_name: "User" },
        },
      },
      error: null,
    });
    (exitsUserById as Mock).mockResolvedValue(true);

    const request = mockRequest(
      "http://localhost/auth/callback?code=123&next=/dashboard",
      {
        "x-forwarded-host": "example.com",
      }
    );

    process.env.APP_ENV = "development";
    let response = await GET(request);
    expect(response).toEqual(
      NextResponse.redirect("http://localhost/dashboard")
    );

    process.env.APP_ENV = "production";
    response = await GET(request);
    expect(response).toEqual(
      NextResponse.redirect("https://example.com/dashboard")
    );
  });
});
