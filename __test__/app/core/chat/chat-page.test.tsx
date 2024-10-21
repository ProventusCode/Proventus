import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import ChatPage from "../../../../src/app/core/chat/page";
import { findSubmissionByFilter } from "@/services/actions/SubmissionActions";
import { useChat } from "ai/react";

vi.mock("@/services/actions/SubmissionActions", () => ({
  findSubmissionByFilter: vi.fn(),
}));

vi.mock("ai/react", () => ({
  useChat: vi.fn(),
}));

describe("ChatPage", () => {
  const mockSubmissions = [
    {
      submission: {
        id: 1,
        userName: "user1",
        language: "Python",
        result: "Accepted",
        timeConsumed: 100,
        memoryConsumed: 256,
        sourceCode: "print('Hello, World!')",
      },
      problem: {
        name: "Problem 1",
      },
    },
  ];

  const mockUseChat = {
    messages: [],
    input: "",
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
    setInput: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (findSubmissionByFilter as Mock).mockResolvedValue(mockSubmissions);
    (useChat as Mock).mockReturnValue(mockUseChat);

    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("should render the search input", () => {
    render(<ChatPage />);
    expect(
      screen.getByPlaceholderText("Buscar por usuario o problema...")
    ).not.toBeNull();
  });

  it("should render the chat header", () => {
    expect(screen.getByText("Proventus Chat")).not.toBeNull();
  });

  it("should render the initial message prompt", () => {
    expect(screen.getByText("Cómo puedo ayudarte hoy?")).not.toBeNull();
  });

  it("should render submissions after search", async () => {
    fireEvent.change(
      screen.getByPlaceholderText("Buscar por usuario o problema..."),
      {
        target: { value: "user1" },
      }
    );

    await waitFor(() => {
      expect(findSubmissionByFilter).toHaveBeenCalledWith("user1");
      expect(screen.getByText("Problem 1")).not.toBeNull();
      expect(screen.getByText("user1")).not.toBeNull();
      expect(screen.getByText("Python")).not.toBeNull();
      expect(screen.getByText("Accepted")).not.toBeNull();
      expect(screen.getByText("100 ms")).not.toBeNull();
      expect(screen.getByText("256 KB")).not.toBeNull();
    });
  });

  it("should toggle prompts visibility", () => {
    const toggleButton = screen.getByText("Ocultar prompts");
    fireEvent.click(toggleButton);
    expect(screen.getByText("Mostrar prompts")).not.toBeNull();
    fireEvent.click(screen.getByText("Mostrar prompts"));
    expect(screen.getByText("Ocultar prompts")).not.toBeNull();
  });
});
