import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocPatientHistory } from "../../../src/Components/DoctorView/Appointments/DocPatientHistory";

describe("DocPatientHistory", () => {
  it("renders doctor's name, date, and hospital correctly", () => {
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

    expect(screen.getByText(/Dr. Alpha/)).toBeInTheDocument();
    expect(screen.getByText(dateTime.toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(/City Hospital/)).toBeInTheDocument();
  });
});
