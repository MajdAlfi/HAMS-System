import { render, screen, fireEvent } from "@testing-library/react";
import { DoctorHome } from "./DoctorHome";

// Mock child components
jest.mock("./Home/AptDoctorHome", () => ({
  AptDoctorHome: () => <div>🏠 Apt Home</div>,
}));

jest.mock("./ManageAvailability/DocManageAvailability", () => ({
  DocManageAvailability: () => <div>📅 Availability Manager</div>,
}));

jest.mock("./Profile/DocProfile", () => ({
  DocProfile: () => <div>👤 Doctor Profile</div>,
}));

describe("DoctorHome Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "User",
      JSON.stringify({ name: "Strange" }) // mock user
    );
  });

  it("renders doctor's name and default home page", () => {
    render(<DoctorHome />);

    expect(screen.getByText("Dr. Strange")).toBeInTheDocument();
    expect(screen.getByText("🏠 Apt Home")).toBeInTheDocument();
  });

  it("navigates to availability manager on click", () => {
    render(<DoctorHome />);

    fireEvent.click(
      screen.getByRole("button", { name: /Manage availability/i })
    );

    expect(screen.getByText("📅 Availability Manager")).toBeInTheDocument();
  });

  it("navigates to profile on click", () => {
    render(<DoctorHome />);

    fireEvent.click(screen.getByRole("button", { name: "Profile" }));

    expect(screen.getByText("👤 Doctor Profile")).toBeInTheDocument();
  });
});
