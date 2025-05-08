import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "../../src/Components/PatientView/Home";
import "@testing-library/jest-dom";

// Mock the child components to isolate Home logic
jest.mock("../../src/Components/Dashboard/DashboardHome", () => ({
  DashboardHome: () => <div>Dashboard Page</div>,
}));
jest.mock("../../src/Components/History/HistoryHome", () => ({
  HistoryHome: () => <div>History Page</div>,
}));
jest.mock("../../src/Components/Doctors/DoctorsHome", () => ({
  DoctorsHome: () => <div>Doctors Page</div>,
}));
jest.mock("../../src/Components/Profile/ProfileHome", () => ({
  ProfileHome: () => <div>Profile Page</div>,
}));

describe("Home component", () => {
  it("renders Dashboard by default", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  it("navigates to History page when History button is clicked", () => {
    render(<Home />);
    const historyBtn = screen.getByRole("button", { name: "📜 History" });
    fireEvent.click(historyBtn);
    expect(screen.getByText("History Page")).toBeInTheDocument();
  });

  it("navigates to Doctors page when Doctors button is clicked", () => {
    render(<Home />);
    const doctorsBtn = screen.getByRole("button", { name: "🩺 Doctors" });
    fireEvent.click(doctorsBtn);
    expect(screen.getByText("Doctors Page")).toBeInTheDocument();
  });

  it("navigates to Profile page when Profile button is clicked", () => {
    render(<Home />);
    const profileBtn = screen.getByRole("button", { name: "👩‍💼 Profile" });
    fireEvent.click(profileBtn);
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });

  it("highlights the active button", () => {
    render(<Home />);
    const doctorsBtn = screen.getByRole("button", { name: "🩺 Doctors" });
    fireEvent.click(doctorsBtn);
    expect(doctorsBtn).toHaveStyle("color: white");
  });
});
