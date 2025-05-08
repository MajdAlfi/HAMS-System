import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignupContainer } from "./SignupContainer";
import { BrowserRouter } from "react-router-dom";

// Mocks
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../../../Services/API/HandleRegSubmit", () => ({
  HandleRegSubmit: jest.fn(),
}));

jest.mock("../../../Services/Auth/HandleRegisterLogin", () => ({
  HandleRegisterLogin: jest.fn(),
}));

jest.mock("../../../Services/Auth/CheckUserType", () => ({
  CheckUserType: jest.fn(),
}));

import { HandleRegSubmit } from "../../../Services/API/HandleRegSubmit";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";

describe("SignupContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillRequiredFields = () => {
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "441234567890" },
    });

    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });

    fireEvent.change(screen.getByLabelText("Gender:"), {
      target: { value: "Male" },
    });

    fireEvent.change(screen.getByLabelText("Date of Birth:"), {
      target: { value: "1990-01-01" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "securePass" },
    });
  };

  it("submits valid patient form and triggers auth flow", async () => {
    (HandleRegSubmit as jest.Mock).mockResolvedValue("mockToken");

    render(
      <BrowserRouter>
        <SignupContainer />
      </BrowserRouter>
    );

    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: "Signup" }));

    await waitFor(() => {
      expect(HandleRegSubmit).toHaveBeenCalled();
      expect(HandleRegisterLogin).toHaveBeenCalledWith("mockToken");
      expect(CheckUserType).toHaveBeenCalledWith(mockNavigate);
    });
  });

  it("navigates to login when clicking 'Already a user? Login'", () => {
    render(
      <BrowserRouter>
        <SignupContainer />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /already a user/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/Login");
  });

  it("validates missing required fields", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <BrowserRouter>
        <SignupContainer />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Signup" }));

    expect(alertMock).toHaveBeenCalledWith(
      "Please fill out all required fields."
    );
    alertMock.mockRestore();
  });
});
