import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "../../src/app/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("LandingPage", () => {
  it("should render the navigation bar", () => {
    render(<LandingPage />);
    expect(screen.getByText("Proventus")).not.toBeNull();
    expect(screen.getByText("Blog")).not.toBeNull();
    expect(screen.getByText("Iniciar sesión")).not.toBeNull();
  });

  it("should render the main heading and button", () => {
    expect(
      screen.getByText(
        "Gestión y análisis de resultados para programación competitiva"
      )
    ).not.toBeNull();
    expect(screen.getByText("Empezar ahora")).not.toBeNull();
  });

  it("should render the integrated platforms section", () => {
    expect(screen.getByText("Plataformas integradas")).not.toBeNull();
    expect(screen.getByAltText("Codeforces")).not.toBeNull();
    expect(screen.getByAltText("Vjudge")).not.toBeNull();
    expect(screen.getByAltText("ICPC")).not.toBeNull();
  });

  it("should render the sections with images and descriptions", () => {
    expect(screen.getByAltText("WebScraping")).not.toBeNull();
    expect(screen.getByAltText("Dashboard")).not.toBeNull();
    expect(screen.getByAltText("Chatbot")).not.toBeNull();
    expect(screen.getByAltText("Management")).not.toBeNull();
  });

  it("should render the registration call to action", () => {
    expect(screen.getByText("Regístrate ahora en Proventus")).not.toBeNull();
    expect(screen.getByText("¡Comienza ahora!")).not.toBeNull();
  });
});
