import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocPatientHistory } from "../../../src/Components/DoctorView/Appointments/DocPatientHistory";

describe("DocPatientHistory", () => {
  it("renders doctor's name, date, and hospital correctly", () => {
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

    expect(screen.getByText(/Dr. Alpha/)).toBeInTheDocument();
    expect(screen.getByText(/City Hospital/)).toBeInTheDocument();

    // Instead of matching full string, match via partial or function
    const formattedDate = dateTime.toLocaleDateString();
    expect(
      screen.getByText((content) => content.includes(formattedDate))
    ).toBeInTheDocument();
  });
});
