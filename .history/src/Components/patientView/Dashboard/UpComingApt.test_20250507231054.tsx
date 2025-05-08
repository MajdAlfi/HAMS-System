import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UpComingApt } from "./UpComingApt";
import { BrowserRouter } from "react-router-dom";
// src/setupTests.ts
import "@testing-library/jest-dom";
// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("UpComingApt", () => {
  const mockApt = {
    id: "apt123",
    allDay: false,
    start: new Date("2025-06-01T10:00:00"),
    doctorName: "Dr. Who",
    hospital: "City Clinic",
    state: "Confirmed",
  };

  it("renders appointment details", () => {
    render(
      <BrowserRouter>
        <UpComingApt apt={mockApt} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Dr. Who/i)).toBeInTheDocument();
    expect(
      screen.getByText("City Clinic", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/06\/01\/2025/i)).toBeInTheDocument(); // Adjust date format if needed
  });

  it("navigates on click", () => {
    render(
      <BrowserRouter>
        <UpComingApt apt={mockApt} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Dr. Who/i));
    expect(mockNavigate).toHaveBeenCalledWith("/vieweditapt?aptNumber=apt123");
  });
});
