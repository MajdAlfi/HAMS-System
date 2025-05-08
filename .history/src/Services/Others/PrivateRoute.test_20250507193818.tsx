import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { isTokenValid } from "../Auth/isTokenValid";
import { jwtDecode } from "jwt-decode";
import "@testing-library/jest-dom";
// Polyfill TextEncoder/Decoder for Jest
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// Mocks
jest.mock("../Auth/isTokenValid");
jest.mock("jwt-decode");

const mockComponent = <div>Protected Content</div>;

describe("PrivateRoute", () => {
  const validToken = "valid.jwt.token";

  const setLocalStorage = (token: string | null) => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => token),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children if token is valid and account type matches", () => {
    setLocalStorage(validToken);

    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "123",
      phoneNo: 1234567890,
      accountType: "Doctor",
    });

    (isTokenValid as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="Doctor">{mockComponent}</PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /login if token is invalid", () => {
    setLocalStorage(validToken);

    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "123",
      phoneNo: 1234567890,
      accountType: "Doctor",
    });

    (isTokenValid as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <PrivateRoute accountTypeReq="Doctor">{mockComponent}</PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /login if account type does not match", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    setLocalStorage(validToken);

    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "123",
      phoneNo: 1234567890,
      accountType: "Patient",
    });

    (isTokenValid as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <PrivateRoute accountTypeReq="Doctor">{mockComponent}</PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(alertSpy).toHaveBeenCalledWith(
      "sorry this page is unavailable for your account type"
    );
  });

  it("redirects to /login if token is missing", () => {
    setLocalStorage(null);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <PrivateRoute accountTypeReq="Doctor">{mockComponent}</PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /login if decoding token throws an error", () => {
    setLocalStorage(validToken);

    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error("Decoding failed");
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <PrivateRoute accountTypeReq="Doctor">{mockComponent}</PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to decode token:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
