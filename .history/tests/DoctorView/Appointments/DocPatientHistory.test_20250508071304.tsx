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

    const fullText = `📋 ${doctorName} - ${hospital} - ${dateTime.toLocaleDateString()}`;
    expect(screen.getByText(fullText)).toBeInTheDocument();
  });
});
