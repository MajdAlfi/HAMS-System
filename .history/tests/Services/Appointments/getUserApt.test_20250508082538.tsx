import { fetchUserAppointmentsToEvents } from "../../../src/Services/Appointments/getUserApt";
import { baseURL } from "../../../src/Services/Others/baseURL";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, "localStorage", {
  value: mockLocalStorage,
});

describe("fetchUserAppointmentsToEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return formatted calendar events when fetch is successful", async () => {
    const mockUser = { id: "user123" };
    const mockAppointments = [
      {
        _id: "apt1",
        Apt: "2025-05-07T10:00:00Z",
        uidDoc: "doc1",
        uidPatient: "pat1",
        Hospital: "City Hospital",
        State: "California",
        descPatient: "Fever and chills",
        diagnosis: "Flu",
        doctorName: "Dr. Smith",
      },
    ];

    localStorage.setItem("User", JSON.stringify(mockUser));

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAppointments,
    }) as jest.Mock;

    const events = await fetchUserAppointmentsToEvents();

    expect(events).toEqual([
      {
        id: "apt1",
        allDay: true,
        start: new Date("2025-05-07T10:00:00Z"),
        doctorName: "Dr. Smith",
        hospital: "City Hospital",
        state: "California",
      },
    ]);

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseURL}/getUserAppointments`,
      {
        method: "GET",
        headers: { uid: "user123" },
      }
    );
  });

  it("should return an empty array if no user ID is found", async () => {
    localStorage.setItem("User", JSON.stringify({}));

    const events = await fetchUserAppointmentsToEvents();
    expect(events).toEqual([]);
  });

  it("should return an empty array if fetch response is not ok", async () => {
    localStorage.setItem("User", JSON.stringify({ id: "user123" }));

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    const events = await fetchUserAppointmentsToEvents();
    expect(events).toEqual([]);
  });

  it("should return an empty array if fetch throws an error", async () => {
    localStorage.setItem("User", JSON.stringify({ id: "user123" }));

    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Network Error")) as jest.Mock;

    const events = await fetchUserAppointmentsToEvents();
    expect(events).toEqual([]);
  });
});
