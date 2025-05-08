import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DoctorsHome } from "./DoctorsHome";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        dataDoc: [
          {
            uid: "1",
            name: "Dr. John Doe",
            desc: "Cardiologist",
            Hospital: "City Hospital",
            img: "john.jpg",
          },
        ],
      }),
  })
) as jest.Mock;

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("DoctorsHome Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders doctor cards from API", async () => {
    render(
      <BrowserRouter>
        <DoctorsHome />
      </BrowserRouter>
    );

    expect(await screen.findByText("Dr. John Doe")).toBeInTheDocument();
    expect(
      screen.getByText(/Cardiologist at City Hospital/i)
    ).toBeInTheDocument();
  });

  it("navigates on 'Book Appointment' click", async () => {
    render(
      <BrowserRouter>
        <DoctorsHome />
      </BrowserRouter>
    );

    const button = await screen.findByText("Book Appointment");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/bookapt?docName=Dr. John Doe&Hname=City Hospital&docUid=1"
    );
  });
});
