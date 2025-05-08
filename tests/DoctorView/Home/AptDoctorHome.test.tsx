// AptDoctorHome.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AptDoctorHome } from "../../../src/Components/DoctorView/Home/AptDoctorHome";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock localStorage and fetch
beforeEach(() => {
  localStorage.setItem("User", JSON.stringify({ id: "doc123" }));

  global.fetch = jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          _id: "apt1",
          uidPatient: "pat1",
          Apt: "2025-06-01T10:00:00Z",
          descPatient: "Fever and chills.",
          State: "Confirmed",
          diagnosis: "",
          patientName: "John Doe",
        },
      ]),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => jest.fn(),
  };
});

describe("AptDoctorHome", () => {
  it("renders appointments and allows date selection", async () => {
    render(
      <MemoryRouter>
        <AptDoctorHome />
      </MemoryRouter>
    );

    expect(await screen.findByText("Appointments")).toBeInTheDocument();
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Fever and chills.")).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("View Appointment")).toBeInTheDocument();
  });

  it("fetches data on date change", async () => {
    render(
      <MemoryRouter>
        <AptDoctorHome />
      </MemoryRouter>
    );

    const dateInput = await screen.findByDisplayValue(
      new Date().toISOString().split("T")[0]
    );
    fireEvent.change(dateInput, { target: { value: "2025-06-02" } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/getDocAppointmentsByDate?date=2025-06-02"),
        expect.anything()
      );
    });
  });
});
