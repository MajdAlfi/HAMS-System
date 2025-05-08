import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RescheduleAppointment } from "../../../src/Components/PatientView/Appointment/RescheduleAppointment";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams({ aptNumber: "12345" })],
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        _id: "12345",
        Apt: new Date().toISOString(),
        doctorName: "Dr. Smith",
        Hospital: "General Hospital",
        State: "Scheduled",
      }),
  })
) as jest.Mock;

describe("RescheduleAppointment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "mock-token");
    localStorage.setItem(
      "User",
      JSON.stringify({ id: "user123", name: "Test User" })
    );
  });

  it("renders loading then appointment info", async () => {
    render(
      <BrowserRouter>
        <RescheduleAppointment />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(
      await screen.findByText("Reschedule Appointment")
    ).toBeInTheDocument();
    expect(screen.getByText(/Dr\. Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/General Hospital/i)).toBeInTheDocument();
  });

  it("submits reschedule with selected date", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            _id: "12345",
            Apt: new Date().toISOString(),
            doctorName: "Dr. Smith",
            Hospital: "General Hospital",
            State: "Scheduled",
          }),
      })
      .mockResolvedValueOnce({ ok: true });

    render(
      <BrowserRouter>
        <RescheduleAppointment />
      </BrowserRouter>
    );

    const input = await screen.findByLabelText(/New Date/i);
    fireEvent.change(input, {
      target: {
        value: "2025-01-01T12:00",
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Confirm Reschedule/i })
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
