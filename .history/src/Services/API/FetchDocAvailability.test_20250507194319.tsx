import { FetchDocAvailability } from "./FetchDocAvailability";
import { weeklyModel } from "../../Models/weeklyModel";

describe("FetchDocAvailability", () => {
  const mockHeaders = {
    uid: "doc123",
    token: "mockToken",
    "Content-Type": "application/json",
  };
  const mockUrl = "https://api.test.com/availability";

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("returns parsed weekly availability data on success", async () => {
    const mockWeeklyData: weeklyModel[] = [
      { day: "Monday", available: true },
      { day: "Tuesday", available: false },
    ];

    const mockResponse = {
      dataWeek: mockWeeklyData,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(mockResponse),
    }) as jest.Mock;

    const result = await FetchDocAvailability(mockHeaders, mockUrl);

    expect(result).toEqual({ dataWeek: mockWeeklyData });
  });

  it("throws error if response is not OK", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    await expect(FetchDocAvailability(mockHeaders, mockUrl)).rejects.toThrow(
      "Failed to fetch Week data: 500"
    );
  });

  it("throws error if response is empty", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    }) as jest.Mock;

    await expect(FetchDocAvailability(mockHeaders, mockUrl)).rejects.toThrow(
      "Empty response from doctor API"
    );
  });

  it("throws error on invalid JSON response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "INVALID_JSON",
    }) as jest.Mock;

    await expect(FetchDocAvailability(mockHeaders, mockUrl)).rejects.toThrow(
      /Invalid JSON format in Week response/
    );
  });

  it("throws error if `dataWeek` is missing", async () => {
    const badResponse = { noWeekData: [] };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(badResponse),
    }) as jest.Mock;

    await expect(FetchDocAvailability(mockHeaders, mockUrl)).rejects.toThrow(
      "Week data is missing expected fields"
    );
  });

  it("throws error if `dataWeek` is not an array", async () => {
    const invalidResponse = { dataWeek: "not-an-array" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(invalidResponse),
    }) as jest.Mock;

    await expect(FetchDocAvailability(mockHeaders, mockUrl)).rejects.toThrow(
      "Week data fields have incorrect types"
    );
  });
});
