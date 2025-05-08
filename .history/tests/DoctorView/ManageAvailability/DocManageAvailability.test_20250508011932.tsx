import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DocManageAvailability } from "../../../src/Components/DoctorView/ManageAvailability/DocManageAvailability";
import React from "react";
import "@testing-library/jest-dom";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockUser = {
  id: "doctor123",
  name: "Test Doc",
};

describe("DocManageAvailability", () => {
  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify(mockUser));
    localStorage.setItem("token", "mock-token");

    mockFetch.mockImplementation((url) => {
      if (url.includes("/getDoctorSchedule")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              weekly: {
                Saturday: false,
                Sunday: false,
                Monday: true,
                Tuesday: true,
                Wednesday: true,
                Thursday: true,
                Friday: true,
                workingHourFrom: "09:00",
                workingHourTo: "17:30",
              },
              specials: [{ _id: "abc", From: "2025-06-01", To: "2025-06-02" }],
            }),
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders doctor availability form", async () => {
    render(<DocManageAvailability />);

    expect(await screen.findByText(/Doctor Availability/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From HH")).toHaveValue("09");
    expect(screen.getByPlaceholderText("MM")).toHaveValue("00");
    expect(screen.getByDisplayValue("17")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  it("allows updating working hours and special dates", async () => {
    render(<DocManageAvailability />);

    await waitFor(() =>
      expect(screen.getByPlaceholderText("From HH")).toHaveValue("09")
    );

    fireEvent.change(screen.getByPlaceholderText("From HH"), {
      target: { value: "10" },
    });

    fireEvent.change(screen.getByPlaceholderText("MM"), {
      target: { value: "15" },
    });

    fireEvent.change(screen.getByDisplayValue("17"), {
      target: { value: "18" },
    });

    fireEvent.change(screen.getByDisplayValue("30"), {
      target: { value: "00" },
    });

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "2025-06-10" },
    });

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "2025-06-12" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/getDoctorSchedule/saveWeeklyAvailability"),
        expect.objectContaining({ method: "POST" })
      )
    );
  });

  it("deletes a special occasion", async () => {
    render(<DocManageAvailability />);

    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/getDoctorSchedule/deleteSpecialOccasion"),
        expect.objectContaining({ method: "DELETE" })
      )
    );
  });
});
