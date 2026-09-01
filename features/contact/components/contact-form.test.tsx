import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContactForm } from "./contact-form";

// Mock console.log to avoid noise in test output
vi.spyOn(console, "log").mockImplementation(() => {});

describe("ContactForm", () => {
  it("should display validation error messages when submitting empty form", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /Enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Ingresá tu nombre completo.")
      ).toBeInTheDocument();
      expect(screen.getByText("Ingresá un email válido.")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Contanos un poco más (mínimo 10 caracteres)."
        )
      ).toBeInTheDocument();
    });
  });

  it("should display thank-you message after successful submission", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText(
      "Tu nombre"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "tu@email.com"
    ) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      "Contanos en qué podemos ayudarte"
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Enviar mensaje/i });

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, {
      target: { value: "Tengo una pregunta sobre el evento" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/¡Gracias! Recibimos tu mensaje/)
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("Tu nombre")
      ).not.toBeInTheDocument();
    });
  });

  it("should prevent submission with message shorter than 10 characters", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText(
      "Tu nombre"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "tu@email.com"
    ) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      "Contanos en qué podemos ayudarte"
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Enviar mensaje/i });

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Short" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Contanos un poco más (mínimo 10 caracteres)."
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/¡Gracias! Recibimos tu mensaje/)
      ).not.toBeInTheDocument();
    });
  });

  it("should prevent submission with name shorter than 2 characters", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText(
      "Tu nombre"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "tu@email.com"
    ) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      "Contanos en qué podemos ayudarte"
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Enviar mensaje/i });

    fireEvent.change(nameInput, { target: { value: "J" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, {
      target: { value: "Tengo una pregunta sobre el evento" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Ingresá tu nombre completo.")
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/¡Gracias! Recibimos tu mensaje/)
      ).not.toBeInTheDocument();
    });
  });
});
