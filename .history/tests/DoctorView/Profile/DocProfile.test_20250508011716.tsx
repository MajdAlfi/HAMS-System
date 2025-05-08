import { render, screen, fireEvent } from "@testing-library/react";
import { DocProfile } from "../../../src/Components/DoctorView/Profile/DocProfile";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// Mock the baseURL usage
jest.mock("../../../src/Services/Others/baseURL", () => ({
  baseURL: "http://mock-api",
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("DocProfile Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "User",
      JSON.stringify({
        name: "Dr. Test",
        DOB: "1990-05-15",
        phoneNo: "123456789",
        address: "123 Test St",
        Gender: "Male",
        accountType: "Doctor",
      })
    );

    localStorage.setItem(
      "Doc",
      JSON.stringify({
        img: "profile.jpg",
        Hospital: "Test Hospital",
        Specialization: "Neurology",
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders user and doctor data correctly", () => {
    render(
      <MemoryRouter>
        <DocProfile />
      </MemoryRouter>
    );

    expect(screen.getByText(/Name: Dr. Test/)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 123456789/)).toBeInTheDocument();
    expect(screen.getByText(/Hospital: Test Hospital/)).toBeInTheDocument();
    expect(screen.getByText(/Specialization: Neurology/)).toBeInTheDocument();
  });

  it("navigates to login on Signout", () => {
    render(
      <MemoryRouter>
        <DocProfile />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Signout"));
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("User")).toBeNull();
    expect(localStorage.getItem("Doc")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
