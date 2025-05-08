import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DocManageAvailability } from "../../../../src/Components/DoctorView/ManageAvailability/DocManageAvailability";

beforeEach(() => {
  localStorage.setItem("User", JSON.stringify({ id: "123" }));
  localStorage.setItem("token", "mock-token");

  global.fetch = jest.fn().mockImplementation((url) => {
    if (url.toString().includes("/getDoctorSchedule")) {
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
            specials: [{ _id: "1", From: "2025-06-01", To: "2025-06-02" }],
          }),
      });
    }

    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("DocManageAvailability", () => {
  it("renders doctor availability form", async () => {
    render(<DocManageAvailability />);

    expect(await screen.findByText(/Doctor Availability/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText("From HH")).toHaveValue("09");
    const mmInputs = screen.getAllByPlaceholderText("MM");
    expect(mmInputs[0]).toHaveValue("00"); // from minute
    expect(screen.getByPlaceholderText("HH")).toHaveValue("17");
    expect(mmInputs[1]).toHaveValue("30"); // to minute
  });

  it("allows updating working hours and special dates", async () => {
    render(<DocManageAvailability />);

    await waitFor(() =>
      expect(screen.getByPlaceholderText("From HH")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText("From HH"), {
      target: { value: "10" },
    });

    const minuteInputs = screen.getAllByPlaceholderText("MM");
    fireEvent.change(minuteInputs[0], { target: { value: "15" } }); // from minute
    fireEvent.change(screen.getByPlaceholderText("HH"), {
      target: { value: "18" },
    });
    fireEvent.change(minuteInputs[1], { target: { value: "45" } }); // to minute

    const dateInputs = screen.getAllByDisplayValue("");
    fireEvent.change(dateInputs[0], { target: { value: "2025-06-10" } });
    fireEvent.change(dateInputs[1], { target: { value: "2025-06-12" } });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/getDoctorSchedule/saveWeeklyAvailability"),
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });

  it("deletes a special occasion", async () => {
    render(<DocManageAvailability />);

    const deleteCheckbox = await screen.findByRole("checkbox");
    fireEvent.click(deleteCheckbox);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/getDoctorSchedule/deleteSpecialOccasion"),
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });
  });
});
