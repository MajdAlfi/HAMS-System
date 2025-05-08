import { HandleSubmit } from "./HandleSubmit";

describe("HandleSubmit", () => {
  const mockUrl = "https://api.example.com/submit";
  const mockData = { name: "Alice", age: 30 };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("returns JSON result on 200 success with JSON content", async () => {
    const mockResponse = { message: "OK" };

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => mockResponse,
    }) as jest.Mock;

    const result = await HandleSubmit(mockData, mockUrl);

    expect(result).toEqual(mockResponse);
    expect(window.alert).toHaveBeenCalledWith("Success");
  });

  it("returns text result on 200 success with text content", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: { get: () => "text/plain" },
      text: async () => "Submission successful",
    }) as jest.Mock;

    const result = await HandleSubmit(mockData, mockUrl);

    expect(result).toBe("Submission successful");
    expect(window.alert).toHaveBeenCalledWith("Success");
  });

  it("alerts JSON error message on failure", async () => {
    const mockError = { message: "Invalid data" };

    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      headers: { get: () => "application/json" },
      json: async () => mockError,
    }) as jest.Mock;

    await HandleSubmit(mockData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith("Invalid data");
  });

  it("alerts text error message on failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      headers: { get: () => "text/plain" },
      text: async () => "Bad request",
    }) as jest.Mock;

    await HandleSubmit(mockData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith("Bad request");
  });

  it("alerts on fetch/network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await HandleSubmit(mockData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith("Network error");
  });
});
