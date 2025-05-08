import React from "react";
import { render, screen } from "@testing-library/react";
import { HistoryCompontent } from "../../../src/Components/PatientView/History/HistoryCompontent";
// src/setupTests.ts
import "@testing-library/jest-dom";
describe("HistoryCompontent", () => {
  const mockProps = {
    doctorName: "Dr. Jane Doe",
    apt: new Date("2025-06-01T10:00:00"),
    hospital: "City Clinic",
  };

  it("renders doctor name, appointment date, and hospital", () => {
    render(<HistoryCompontent {...mockProps} />);

    expect(screen.getByText(/Dr. Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/📍City Clinic/i)).toBeInTheDocument();

    // Match the date format as rendered in the component
    const expectedDateText = `${mockProps.apt
      .getDate()
      .toString()}- ${mockProps.apt.getMonth().toString()}-${mockProps.apt
      .getFullYear()
      .toString()}`;
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();
  });
});
