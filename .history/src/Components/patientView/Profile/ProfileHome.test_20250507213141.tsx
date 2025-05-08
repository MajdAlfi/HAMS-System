import { TextEncoder, TextDecoder } from "util";

if (typeof globalThis.TextEncoder === "undefined") {
  Object.defineProperty(globalThis, "TextEncoder", {
    value: TextEncoder,
    configurable: true,
    writable: true,
  });
}

if (typeof globalThis.TextDecoder === "undefined") {
  Object.defineProperty(globalThis, "TextDecoder", {
    value: TextDecoder,
    configurable: true,
    writable: true,
  });
}
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfileHome } from "./ProfileHome";
import "@testing-library/jest-dom";
// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProfileHome", () => {
  const validUser = {
    id: "1",
    name: "John Doe",
    phoneNo: 1234567890,
    DOB: new Date("1990-01-01").toISOString(),
    address: "123 Main St",
    Gender: "Male",
    accountType: "Patient",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("redirects to /login if User is not in localStorage", () => {
    render(
      <MemoryRouter>
        <ProfileHome />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("redirects to /login if User is invalid JSON", () => {
    localStorage.setItem("User", "not-valid-json");

    render(
      <MemoryRouter>
        <ProfileHome />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("renders user info when User is valid", async () => {
    localStorage.setItem("User", JSON.stringify(validUser));

    render(
      <MemoryRouter>
        <ProfileHome />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Name: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/addres: 123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Type: Patient/i)).toBeInTheDocument();
  });

  it("clears storage and redirects on signout", async () => {
    localStorage.setItem("User", JSON.stringify(validUser));
    localStorage.setItem("token", "mockToken");

    render(
      <MemoryRouter>
        <ProfileHome />
      </MemoryRouter>
    );

    const signoutBtn = await screen.findByText("Signout");
    fireEvent.click(signoutBtn);

    expect(localStorage.getItem("User")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
