import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { HistoryHome } from "./HistoryHome";

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

    await waitFor(() => {
      // Use getAllByText for duplicate names
      const nameEls = screen.getAllByText(/Dr. Jane Doe/i);
      expect(nameEls.length).toBeGreaterThan(1);
    });

    expect(screen.getByText(/City Clinic/i)).toBeInTheDocument();
    expect(screen.getByText(/Fever and headache/i)).toBeInTheDocument();
    expect(screen.getByText(/Viral Infection/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
  });

  it("updates selected detail on click", async () => {
    render(<HistoryHome />);

    await waitFor(() => {
      const nameListItem = screen.getAllByText(/Dr. Jane Doe/i)[0]; // sidebar version
      fireEvent.click(nameListItem);
    });

    expect(screen.getByText(/🧾 Diagnosis:/)).toBeInTheDocument();
  });
});
