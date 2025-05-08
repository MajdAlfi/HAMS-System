import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AptViewDoc } from "../../../src/Components/DoctorView/Appointments/AptViewDoc";
import { MemoryRouter } from "react-router-dom";

// Mocks
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  };
});

import { useLocation, useNavigate } from "react-router-dom";
const mockNavigate = useNavigate as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

// Default mock data for appointment
const mockAppointment = {
  _id: "apt123",
  Apt: "2025-06-01T11:00:00Z",
  State: "Confirmed",
  descPatient: "Patient has a cold",
  patientName: "John Doe",
  uidPatient: "patient456",
};

describe("AptViewDoc", () => {
  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify({ id: "doc123" }));
    mockNavigate.mockReset();
  });

  it("renders appointment data", () => {
    mockUseLocation.mockReturnValue({ state: mockAppointment });

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/Patient has a cold/i)).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("navigates to history page", () => {
    mockUseLocation.mockReturnValue({ state: mockAppointment });

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("History"));
    expect(mockNavigate).toHaveBeenCalledWith("/viewpatienthistory", {
      state: { uidPatient: "patient456" },
    });
  });

  it("navigates to diagnosis form", () => {
    mockUseLocation.mockReturnValue({ state: mockAppointment });

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockNavigate).toHaveBeenCalledWith("/diagnosis/apt123");
  });

  it("calls cancel endpoint and navigates", async () => {
    mockUseLocation.mockReturnValue({ state: mockAppointment });

    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/cancelAppointmentByDoctor/apt123"),
        expect.objectContaining({
          method: "PATCH",
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/dochome");
    });
  });

  it("disables buttons if appointment is cancelled", () => {
    mockUseLocation.mockReturnValue({
      state: {
        ...mockAppointment,
        State: "Cancelled",
      },
    });

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
