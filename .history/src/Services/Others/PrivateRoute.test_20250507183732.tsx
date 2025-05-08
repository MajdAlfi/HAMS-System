import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "./PrivateRoute";
import { isTokenValid } from "../Auth/isTokenValid";
import { jwtDecode } from "jwt-decode";
import { MemoryRouter } from "react-router-dom";

// Mocks
jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

jest.mock("../Auth/isTokenValid", () => ({
  isTokenValid: jest.fn(),
}));

const mockTokenPayload = {
  user_id: "123",
  phoneNo: 1234567890,
  accountType: "admin",
};

const setup = (token: string | null) => {
  Storage.prototype.getItem = jest.fn(() => token);
};

describe("PrivateRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when token is valid and account type matches", () => {
    setup("validToken");
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayload);
    (isTokenValid as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="admin">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when token is expired or invalid", () => {
    setup("expiredToken");
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayload);
    (isTokenValid as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="admin">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("does not render children if account type doesn't match", () => {
    setup("validToken");
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockTokenPayload,
      accountType: "user",
    });
    (isTokenValid as jest.Mock).mockReturnValue(true);

    // Mock window.alert to suppress UI side effects
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="admin">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith(
      "sorry this page is unavialable for your account type"
    );
  });

  it("does nothing if token is missing", () => {
    setup(null);

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="admin">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("logs error if decoding token fails", () => {
    setup("invalidToken");
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error("Decoding failed");
    });

    render(
      <MemoryRouter>
        <PrivateRoute accountTypeReq="admin">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to decode token:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
