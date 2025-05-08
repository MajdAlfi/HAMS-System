import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocPatientHistory } from "../../../src/Components/DoctorView/Appointments/DocPatientHistory";

describe("DocPatientHistory", () => {
  it("renders doctor's name, date, time, and hospital correctly", () => {
    const doctorName = "Dr. Alpha";
    const dateTime = new Date("2025-06-01T11:00:00"); // Local time
    const hospital = "City Hospital";

    render(
      <DocPatientHistory
        doctorName={doctorName}
        dateTime={dateTime}
        hospital={hospital}
      />
    );

    // Doctor's name
    expect(screen.getByText(/Dr. Alpha/)).toBeInTheDocument();

    // Hospital name
    expect(screen.getByText(/City Hospital/)).toBeInTheDocument();

    // Match date AND time (best effort)
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(
      screen.getByText(
        (content) =>
          content.includes(formattedDate) && content.includes(formattedTime)
      )
    ).toBeInTheDocument();
  });
});
