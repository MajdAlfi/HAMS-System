import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AptViewDoc } from "../../../src/Components/DoctorView/Appointments/AptViewDoc";
import { MemoryRouter } from "react-router-dom";

// Mocks
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: {
        _id: "apt123",
        Apt: "2025-06-01T12:00:00Z",
        State: "Confirmed",
        descPatient: "Patient has a cold",
        patientName: "John Doe",
        uidPatient: "patient456",
      },
    }),
    useNavigate: () => mockNavigate,
  };
});

describe("AptViewDoc", () => {
  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify({ id: "doc123" }));
    mockNavigate.mockClear();
  });

  it("renders appointment data", () => {
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
          headers: expect.objectContaining({ uid: "doc123" }),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/dochome");
    });
  });

  it("disables buttons if appointment is cancelled", () => {
    // Override useLocation for cancelled state
    jest.mock("react-router-dom", () => {
      const actual = jest.requireActual("react-router-dom");
      return {
        ...actual,
        useLocation: () => ({
          state: {
            _id: "apt123",
            Apt: "2025-06-01T12:00:00Z",
            State: "Cancelled",
            descPatient: "Patient has a cold",
            patientName: "John Doe",
            uidPatient: "patient456",
          },
        }),
        useNavigate: () => mockNavigate,
      };
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
