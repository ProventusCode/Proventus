import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthForm from "../../../app/auth/components/auth-form";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient: vi.fn(),
}));

describe("AuthForm Component", () => {
  it('should render the default tab as "Iniciar sesión"', () => {
    render(<AuthForm />);
    expect(screen.getByText("Iniciar sesión")).not.toBeNull();
    expect(screen.getByText("Registrarse")).not.toBeNull();
    expect(screen.getByRole("tab", { name: /iniciar sesión/i })).not.toBeNull();
  });

  it('should switch to "registrarse" tab when clicked', () => {
    fireEvent.click(screen.getByText("Registrarse"));
    expect(screen.getByRole("tab", { name: /registrarse/i })).not.toBeNull();
  });

  it('should switch back to "Iniciar sesión" tab when clicked', () => {
    fireEvent.click(screen.getByText("Registrarse"));
    fireEvent.click(screen.getByText("Iniciar sesión"));
    expect(screen.getByRole("tab", { name: /iniciar sesión/i })).not.toBeNull();
  });

  it("should render OauthForm component", () => {
    expect(screen.getByText("GitHub")).not.toBeNull();
  });
});
