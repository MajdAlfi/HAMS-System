import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DiagnosisForm } from "../../../src/Components/DoctorView/Appointments/DiagnosisForm";
import { BrowserRouter } from "react-router-dom";

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ aptId: "test123" }),
}));

describe("DiagnosisForm", () => {
  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify({ id: "doc123" }));
    localStorage.setItem("token", "mock-token");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <DiagnosisForm />
      </BrowserRouter>
    );

  it("renders form elements", () => {
    setup();
    expect(screen.getByText(/Update Diagnosis/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter diagnosis/i)).toBeInTheDocument();
    expect(screen.getByText(/Word Count:/)).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("shows error if word count exceeds 100", () => {
    setup();
    const longText = Array(101).fill("word").join(" ");
    fireEvent.change(screen.getByPlaceholderText(/Enter diagnosis/i), {
      target: { value: longText },
    });
    fireEvent.click(screen.getByText("Update"));
    expect(screen.getByText(/cannot exceed 100 words/i)).toBeInTheDocument();
  });

  it("submits valid diagnosis and redirects", async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/Enter diagnosis/i), {
      target: { value: "This is a valid diagnosis." },
    });
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/updateDiagnosis/test123"),
        expect.objectContaining({
          method: "PATCH",
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/dochome");
    });
  });

  it("displays fetch error on failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve("Server error"),
    });

    setup();
    fireEvent.change(screen.getByPlaceholderText(/Enter diagnosis/i), {
      target: { value: "Some diagnosis" },
    });
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(screen.getByText(/Error: Server error/)).toBeInTheDocument();
    });
  });
});
