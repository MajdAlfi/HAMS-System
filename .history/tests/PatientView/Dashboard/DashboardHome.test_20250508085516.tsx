import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { DashboardHome } from "../../../src/Components/PatientView/Dashboard/DashboardHome";
import { BrowserRouter } from "react-router-dom";

// Mocks
jest.mock("../../../src/Services/API/fetchDocData", () => ({
  FetchDocData: jest.fn(),
}));

jest.mock("../../../src/Services/Appointments/getUserApt", () => ({
  fetchUserAppointmentsToEvents: jest.fn().mockResolvedValue([
    {
      id: "1",
      allDay: false,
      start: new Date(Date.now() + 1000000),
      doctorName: "Dr. Smith",
      hospital: "City Clinic",
      state: "Confirmed",
    },
  ]),
}));

// Mock fetch for suggestions
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          doctorId: "1",
          doctorName: "Dr. House",
          desc: "General checkup",
          date: "2025-01-01",
          time: "10:00",
          Hospital: "City Clinic",
        },
      ]),
  })
) as jest.Mock;

describe("DashboardHome", () => {
  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify({ id: "123", name: "Majd" }));
    jest.clearAllMocks();
  });

  it("renders welcome message", async () => {
    render(
      <BrowserRouter>
        <DashboardHome />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Welcome back Majd 🙌")).toBeInTheDocument();
    });
  });

  it("displays calendar header and suggestions", async () => {
    render(
      <BrowserRouter>
        <DashboardHome />
      </BrowserRouter>
    );

    expect(screen.getByText("Calendar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Suggestions")).toBeInTheDocument();
    });
  });

  it("displays upcoming appointments section", async () => {
    render(
      <BrowserRouter>
        <DashboardHome />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Upcoming Appointments")).toBeInTheDocument();
    });
  });
});
