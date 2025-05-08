import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Needed for toBeInTheDocument
import { HistoryHome } from "./HistoryHome";
import { act } from "react-dom/test-utils";

jest.mock("../../../Services/Others/baseURL", () => ({
  baseURL: "http://mock-api",
}));

beforeEach(() => {
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
          listNames: [{ name: "Dr. Jane Doe", img: "jane.jpg" }],
        }),
    })
  ) as jest.Mock;
});

describe("HistoryHome", () => {
  it("renders history list and detail view", async () => {
    await act(async () => {
      render(<HistoryHome />);
    });

    expect(screen.getByText(/History/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Dr. Jane Doe/i).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Fever and headache/i)).toBeInTheDocument();
    expect(screen.getByText(/Viral Infection/i)).toBeInTheDocument();
  });

  it("updates selected detail on click", async () => {
    await act(async () => {
      render(<HistoryHome />);
    });

    const nameItems = await screen.findAllByText(/Dr. Jane Doe/i);
    fireEvent.click(nameItems[0]); // simulate selecting an item

    expect(screen.getByText(/🧾 Diagnosis:/)).toBeInTheDocument();
  });
});
