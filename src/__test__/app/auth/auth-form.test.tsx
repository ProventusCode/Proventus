import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import AuthForm from "../../../app/auth/components/auth-form";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("AuthForm Component", () => {
  it('should render the default tab as "Iniciar sesión"', () => {
    render(<AuthForm />);
    expect(screen.getByText("Iniciar sesión")).not.toBeNull();
    expect(screen.getByText("Registrarse")).not.toBeNull();
    expect(screen.getByRole("tab", { name: /iniciar sesión/i })).not.toBeNull();
  });

  it('should switch to "registrarse" tab when clicked', () => {
    fireEvent.click(screen.getByRole("tabpanel"));
    expect(screen.getByRole("tab", { name: /registrarse/i })).not.toBeNull();
  });

  it('should switch back to "Iniciar sesión" tab when clicked', () => {
    fireEvent.click(screen.getByText("Registrarse"));
    fireEvent.click(screen.getByText("Iniciar sesión"));
    expect(screen.getByRole("tab", { name: /iniciar sesión/i })).not.toBeNull();
  });
});
