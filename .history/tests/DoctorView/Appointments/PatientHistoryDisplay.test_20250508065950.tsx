import React from "react";
import { render, screen } from "@testing-library/react";
import { PatientHistoryDisplay } from "../../../src/Components/PatientView/History/PatientHistoryDisplay";
import "@testing-library/jest-dom";

describe("PatientHistoryDisplay", () => {
  const mockAppointment = {
    Apt: "2025-06-01T10:00:00Z",
    Hospital: "City Clinic",
    State: "Confirmed",
    descPatient: "Patient had a high fever and sore throat.",
    diagnosis: "Viral infection",
    doctor: {
      name: "Jane Doe",
      img: "jane.jpg",
    },
  };

  it("renders appointment details correctly", () => {
    render(<PatientHistoryDisplay appointment={mockAppointment} />);

    expect(screen.getByText(/DR. Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/City Clinic/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Patient had a high fever and sore throat/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Viral infection/i)).toBeInTheDocument();
    expect(screen.getByText(/🗓️/)).toBeInTheDocument();
  });

  it("shows correct status color", () => {
    render(<PatientHistoryDisplay appointment={mockAppointment} />);

    const statusElement = screen.getByText("Confirmed");
    expect(statusElement).toHaveStyle("color: green");
  });
});
