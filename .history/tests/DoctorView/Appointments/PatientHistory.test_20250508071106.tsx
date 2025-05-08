import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocPatientHistory } from "../../../src/Components/DoctorView/Appointments/DocPatientHistory";

describe("DocPatientHistory", () => {
  it("renders doctor's name, date, and hospital", () => {
    const doctorName = "Dr. Alpha";
    const dateTime = new Date("2025-06-01T10:00:00Z");
    const hospital = "City Hospital";

    render(
      <DocPatientHistory
        doctorName={doctorName}
        dateTime={dateTime}
        hospital={hospital}
      />
    );

    expect(screen.getByText(/Dr. Alpha/i)).toBeInTheDocument();
    expect(screen.getByText(/City Hospital/i)).toBeInTheDocument();
    expect(screen.getByText(dateTime.toLocaleDateString())).toBeInTheDocument();
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock(
  "../../../src/Components/DoctorView/Appointments/DocPatientHistory",
  () => ({
    DocPatientHistory: ({
      doctorName,
      dateTime,
      hospital,
    }: {
      doctorName: string;
      dateTime: Date;
      hospital: string;
    }) => (
      <div data-testid="history-item">
        📋 {doctorName} - {hospital} - {dateTime.toLocaleDateString()}
      </div>
    ),
  })
);

jest.mock(
  "../../../src/Components/DoctorView/Appointments/PatientHistoryDisplay",
  () => ({
    PatientHistoryDisplay: ({
      appointment,
    }: {
      appointment: {
        doctor: { name: string };
      };
    }) => <div>🩺 Displaying {appointment.doctor.name}</div>,
  })
);

import { useLocation } from "react-router-dom";
import { PatientHistory } from "../../../src/Components/DoctorView/Appointments/PatientHistory";

describe("PatientHistory", () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { uidPatient: "patient123" },
    });

    localStorage.setItem("User", JSON.stringify({ id: "doc456" }));
    localStorage.setItem("token", "mock-token");

    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          history: [
            {
              _id: "1",
              Apt: "2025-06-01T10:00:00Z",
              Hospital: "City Hospital",
              State: "Confirmed",
              descPatient: "Complaint A",
              diagnosis: "Diagnosis A",
              doctor: {
                name: "Dr. Alpha",
                img: "alpha.jpg",
              },
            },
            {
              _id: "2",
              Apt: "2025-06-10T12:00:00Z",
              Hospital: "Metro Hospital",
              State: "Cancelled",
              descPatient: "Complaint B",
              diagnosis: "Diagnosis B",
              doctor: {
                name: "Dr. Beta",
                img: "beta.jpg",
              },
            },
          ],
        }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders patient history sidebar and detail display", async () => {
    render(<PatientHistory />);

    expect(await screen.findByText(/📋 Dr. Alpha/)).toBeInTheDocument();
    expect(screen.getByText(/🩺 Displaying Dr. Alpha/)).toBeInTheDocument();
  });

  it("updates detail view when another history item is clicked", async () => {
    render(<PatientHistory />);

    const secondHistory = await screen.findByText(/📋 Dr. Beta/);
    fireEvent.click(secondHistory);

    await waitFor(() => {
      expect(screen.getByText(/🩺 Displaying Dr. Beta/)).toBeInTheDocument();
    });
  });
});
