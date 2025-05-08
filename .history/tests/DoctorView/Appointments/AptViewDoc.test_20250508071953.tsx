import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { AptViewDoc } from "../../../src/Components/DoctorView/Appointments/AptViewDoc";

// Mock navigation and localStorage
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: {
        _id: "apt123",
        Apt: "2025-06-01T11:00:00Z",
        State: "Confirmed",
        descPatient: "Patient has flu symptoms.",
        patientName: "John Doe",
        uidPatient: "patient456",
      },
    }),
  };
});

// Mock localStorage
beforeEach(() => {
  localStorage.setItem("User", JSON.stringify({ id: "doctor789" }));
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
});
afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("AptViewDoc", () => {
  it("renders appointment data", () => {
    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/Patient has flu symptoms/i)).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("navigates to history page", () => {
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
    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockNavigate).toHaveBeenCalledWith("/diagnosis/apt123");
  });

  it("calls cancel endpoint and navigates", async () => {
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
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: () => ({
        state: {
          _id: "apt123",
          Apt: "2025-06-01T11:00:00Z",
          State: "Cancelled",
          descPatient: "Test desc",
          patientName: "Jane Doe",
          uidPatient: "patient456",
        },
      }),
    }));

    render(
      <MemoryRouter>
        <AptViewDoc />
      </MemoryRouter>
    );

    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
