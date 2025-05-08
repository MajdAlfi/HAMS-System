import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomDateHeader } from "./CustomDateCell";
import { BrowserRouter } from "react-router-dom";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CustomDateHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props: unknown) =>
    render(
      <BrowserRouter>
        <CustomDateHeader {...props} />
      </BrowserRouter>
    );

  it("renders the day number", () => {
    const date = new Date();
    renderComponent({ date, events: [] });
    expect(screen.getByText(date.getDate().toString())).toBeInTheDocument();
  });

  it("navigates to view page if matching event exists", () => {
    const date = new Date();
    const event = {
      id: "123",
      allDay: true,
      start: new Date(date),
      doctorName: "Dr. Smith",
      hospital: "City Hospital",
      state: "Confirmed",
    };

    renderComponent({ date, events: [event] });

    fireEvent.click(screen.getByText(date.getDate().toString()));
    expect(mockNavigate).toHaveBeenCalledWith("/vieweditapt?aptNumber=123");
  });

  it("navigates to book page if no event and date is today or future", () => {
    const date = new Date();
    const expectedTimestamp = date.getTime() + 24 * 60 * 60 * 1000;

    renderComponent({ date, events: [] });

    fireEvent.click(screen.getByText(date.getDate().toString()));
    expect(mockNavigate).toHaveBeenCalledWith(
      `/bookapt?date=${expectedTimestamp}`
    );
  });

  it("alerts on past dates without events", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // yesterday

    renderComponent({ date: pastDate, events: [] });

    fireEvent.click(screen.getByText(pastDate.getDate().toString()));
    expect(alertMock).toHaveBeenCalledWith(
      "You can only book appointments today or after today"
    );
    alertMock.mockRestore();
  });
});
