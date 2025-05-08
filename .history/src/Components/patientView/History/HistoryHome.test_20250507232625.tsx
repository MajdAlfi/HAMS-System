import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { HistoryHome } from "./HistoryHome";

// Mocks
jest.mock("../../../Services/Others/baseURL", () => ({
  baseURL: "http://mock-api",
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.setItem("User", JSON.stringify({ id: "123", name: "John" }));
  localStorage.setItem("token", "mock-token");
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          listAptHistory: [
            {
              _id: "1",
              Apt: "2025-06-01T10:00:00",
              Hospital: "City Clinic",
              State: "Confirmed",
              descPatient: "Fever and headache",
              diagnosis: "Viral Infection",
            },
          ],
          listNames: [
            {
              name: "Dr. Jane Doe",
              img: "jane.jpg",
            },
          ],
        }),
    })
  ) as jest.Mock;
});

describe("HistoryHome", () => {
  it("renders history list and detail view", async () => {
    render(<HistoryHome />);

    expect(screen.getByText(/History/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Dr. Jane Doe/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/City Clinic/i)).toBeInTheDocument();
    expect(screen.getByText(/Fever and headache/i)).toBeInTheDocument();
    expect(screen.getByText(/Viral Infection/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
  });

  it("updates selected detail on click", async () => {
    render(<HistoryHome />);

    await waitFor(() =>
      expect(screen.getByText(/Dr. Jane Doe/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Dr. Jane Doe/i));
    expect(screen.getByText(/🧾 Diagnosis:/i)).toBeInTheDocument();
  });
});
