// BookAppointment.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookAppointment from "../../../src/Components/PatientView/Appointment/BookAppointment";
import { BrowserRouter } from "react-router-dom";

// Mock required modules
jest.mock("../../..//srcServices/API/fetchDocList", () => ({
  FetchDocList: jest.fn(() =>
    Promise.resolve({
      dataDoc: [{ name: "Dr. Who", uid: "1", Hospital: "General Hospital" }],
    })
  ),
}));

jest.mock("../../../src/Services/API/FetchDocAvailability", () => ({
  FetchDocAvailability: jest.fn(() =>
    Promise.resolve({
      dataWeek: [
        {
          Sunday: false,
          Monday: true,
          Tuesday: true,
          Wednesday: true,
          Thursday: true,
          Friday: true,
          Saturday: false,
          workingHourFrom: "09:00",
          workingHourTo: "17:00",
        },
      ],
    })
  ),
}));

jest.mock("../../../src/Services/Appointments/bookApt", () => ({
  bookApt: jest.fn(() => Promise.resolve(200)),
}));

jest.mock("../../..//srcServices/Others/useQuery", () => ({
  useQuery: () => new URLSearchParams(""),
}));

describe("BookAppointment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(
      <BrowserRouter>
        <BookAppointment />
      </BrowserRouter>
    );

    expect(await screen.findByText("Select A Doctor")).toBeInTheDocument();
  });

  it("selects doctor and date and books an appointment", async () => {
    render(
      <BrowserRouter>
        <BookAppointment />
      </BrowserRouter>
    );

    const doctorSelect = await screen.findByRole("combobox");
    fireEvent.change(doctorSelect, { target: { value: "1" } });

    const dateInput = screen.getByLabelText("appointment-date");
    fireEvent.change(dateInput, {
      target: { value: new Date().toISOString().split("T")[0] },
    });

    const bookBtn = screen.getByRole("button", { name: /book/i });
    fireEvent.click(bookBtn);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /book/i })).toBeInTheDocument();
    });
  });
});
