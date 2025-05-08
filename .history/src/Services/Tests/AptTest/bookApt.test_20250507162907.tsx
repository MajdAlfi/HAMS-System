import { bookApt } from "../../Appointments/bookApt";

global.fetch = jest.fn();
global.alert = jest.fn();

describe("bookApt", () => {
  const mockDoctor = {
    name: "Dr. Smith",
    uid: "doc123",
    Hospital: "City Hospital",
  };
  type DoctorInfo = {
    name: string;
    uid: string;
    Hospital: string;
  };

  const mockDate = new Date("2025-06-01");
  const mockTime = "10:00 AM";
  const mockDesc = "Routine checkup";
  const mockHName = "City Hospital";

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("User", JSON.stringify({ id: "user123" }));
  });

  test("successfully books an appointment", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      text: () => Promise.resolve("Success"),
    });

    const status = await bookApt(
      mockDoctor,
      mockDate,
      mockTime,
      mockDesc,
      mockHName
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/bookApt"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          token: "mock-token",
          uid: "user123",
        }),
      })
    );

    expect(alert).toHaveBeenCalledWith("Appointment booked successfully!");
    expect(status).toBe(200);
  });

  test("shows alert if required fields are missing", async () => {
    const invalidDoctor = null as unknown as DoctorInfo;
    await bookApt(invalidDoctor, mockDate, mockTime, mockDesc, mockHName);
    expect(alert).toHaveBeenCalledWith(
      "Please select all fields before booking."
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  test("shows alert if user is not authenticated", async () => {
    localStorage.removeItem("token");
    await bookApt(mockDoctor, mockDate, mockTime, mockDesc, mockHName);
    expect(alert).toHaveBeenCalledWith("User not authenticated.");
    expect(fetch).not.toHaveBeenCalled();
  });
});
