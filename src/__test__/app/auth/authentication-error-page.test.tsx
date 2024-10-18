import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AuthenticationErrorPage from "../../../app/auth/fail/page";

describe("AuthenticationErrorPage", () => {
  it("should render the card title", () => {
    render(<AuthenticationErrorPage />);
    expect(screen.getByText("Error de Autenticación")).not.toBeNull();
  });

  it("should render the alert title and description", () => {
    expect(screen.getByText("Error de Autenticación")).not.toBeNull();
  });

  it("should render the retry button", () => {
    expect(screen.getByText("Intentar de nuevo")).not.toBeNull();
  });
});
