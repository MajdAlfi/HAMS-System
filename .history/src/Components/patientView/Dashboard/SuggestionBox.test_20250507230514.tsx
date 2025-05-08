import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import SuggestionBox from "./SuggestionBox";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe("SuggestionBox", () => {
  const mockNavigate = jest.fn();
  const props = {
    drName: "Dr. Strange",
    descDoc: "Surgeon",
    dateOld: "2025-06-01",
    time: "10:00 AM",
    docUid: "abc123",
    Hname: "City Hospital",
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders doctor suggestion correctly", () => {
    render(
      <MemoryRouter>
        <SuggestionBox {...props} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Dr. Strange Surgeon is available on/i)
    ).toBeInTheDocument();
    expect(screen.getByText("2025-06-01")).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
  });

  it("navigates correctly on Book Now click", () => {
    render(
      <MemoryRouter>
        <SuggestionBox {...props} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Book Now"));

    const expectedParams = new URLSearchParams({
      date: Date.parse("2025-06-01").toString(),
      docName: "Dr. Strange",
      Hname: "City Hospital",
      docUid: "abc123",
      time: "10:00 AM",
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/bookapt?${expectedParams.toString()}`
    );
  });
});
