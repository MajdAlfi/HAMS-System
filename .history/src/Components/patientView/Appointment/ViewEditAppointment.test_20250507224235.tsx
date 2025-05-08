import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ViewEditAppointment from "./ViewEditAppointment";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams({ aptNumber: "12345" })] as any,
  };
});

const mockAppointment = {
  Apt: new Date().toISOString(),
  uidDoc: "doc123",
  uidPatient: "pat456",
  Hospital: "General Hospital",
  doctorName: "Dr. Who",
  State: "Confirmed",
  descPatient: "Headache and fever",
  diagnosis: "Viral infection",
};

describe("ViewEditAppointment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("User", JSON.stringify({ id: "user123" }));
    localStorage.setItem("token", "test-token");

    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAppointment),
      })
    ) as any;
  });

  it("renders appointment info", async () => {
    render(
      <BrowserRouter>
        <ViewEditAppointment />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText(/Dr\. Who/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toHaveStyle("color: green");
    expect(screen.getByText(/General Hospital/i)).toBeInTheDocument();
  });

  it("navigates to reschedule on button click", async () => {
    render(
      <BrowserRouter>
        <ViewEditAppointment />
      </BrowserRouter>
    );

    const button = await screen.findByRole("button", { name: /Reschedule/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/reschedule?aptNumber=12345");
  });

  it("cancels appointment on confirm", async () => {
    global.confirm = jest.fn(() => true);
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAppointment),
      })
      .mockResolvedValueOnce({ ok: true });

    render(
      <BrowserRouter>
        <ViewEditAppointment />
      </BrowserRouter>
    );

    const cancelButton = await screen.findByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/cancelApt/12345"),
        expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            token: "test-token",
            uid: "user123",
          }),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
