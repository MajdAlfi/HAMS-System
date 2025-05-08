import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginContainer } from "./LoginContainer";
import { BrowserRouter } from "react-router-dom";
// src/setupTests.ts
import "@testing-library/jest-dom";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock services (after imports)
jest.mock("../../../Services/API/HandleSubmit");
jest.mock("../../../Services/Auth/HandleRegisterLogin");
jest.mock("../../../Services/Auth/CheckUserType");

describe("LoginContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <LoginContainer />
      </BrowserRouter>
    );
  };

  it("renders and allows input changes", () => {
    setup();

    const phoneInput = screen.getByPlaceholderText(
      "Phone Number"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    fireEvent.change(phoneInput, { target: { value: "441234567890" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });

    expect(phoneInput.value).toBe("441234567890");
    expect(passwordInput.value).toBe("testpass");
  });

  it("calls HandleSubmit and auth functions on login", async () => {
    (HandleSubmit as jest.Mock).mockResolvedValue("mockToken");

    setup();

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "441234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "securePass" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(HandleSubmit).toHaveBeenCalledWith(
        { phoneNo: "441234567890", password: "securePass" },
        expect.stringContaining("/login")
      );
      expect(HandleRegisterLogin).toHaveBeenCalledWith("mockToken");
      expect(CheckUserType).toHaveBeenCalledWith(mockNavigate);
    });
  });

  it("navigates to signup page on 'Create Account' click", () => {
    setup();

    const createAccountBtn = screen.getByText(/New to the HAMS/i);
    fireEvent.click(createAccountBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/Signup");
  });
});
