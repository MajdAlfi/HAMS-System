import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoginContainer } from "../../../src/Components/PatientView/Auth/LoginContainer";

jest.mock("../../../src/Services/API/HandleSubmit", () => ({
  HandleSubmit: jest.fn(),
}));

jest.mock("../../../src/Services/Auth/HandleRegisterLogin", () => ({
  HandleRegisterLogin: jest.fn(),
}));

jest.mock("../../../src/Services/Auth/CheckUserType", () => ({
  CheckUserType: jest.fn(),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

import { HandleSubmit } from "../../../src/Services/API/HandleSubmit";
import { HandleRegisterLogin } from "../../../src/Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../src/Services/Auth/CheckUserType";

describe("LoginContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <LoginContainer />
      </BrowserRouter>
    );

  it("renders inputs and allows typing", () => {
    setup();

    const phoneInput = screen.getByPlaceholderText(
      "Phone Number"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    fireEvent.change(phoneInput, { target: { value: "441234567890" } });
    fireEvent.change(passwordInput, { target: { value: "pass1234" } });

    expect(phoneInput.value).toBe("441234567890");
    expect(passwordInput.value).toBe("pass1234");
  });

  it("submits and calls auth flow", async () => {
    (HandleSubmit as jest.Mock).mockResolvedValue("mockToken");

    setup();

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "441234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "securePass" },
    });

    fireEvent.click(screen.getAllByText("Login")[1]);

    await waitFor(() => {
      expect(HandleSubmit).toHaveBeenCalledWith(
        { phoneNo: "441234567890", password: "securePass" },
        expect.stringContaining("/login")
      );
      expect(HandleRegisterLogin).toHaveBeenCalledWith("mockToken");
      expect(CheckUserType).toHaveBeenCalledWith(mockNavigate);
    });
  });

  it("navigates to signup when clicking 'Create Account'", () => {
    setup();

    fireEvent.click(screen.getByText(/New to the HAMS/i));

    expect(mockNavigate).toHaveBeenCalledWith("/Signup");
  });
});
