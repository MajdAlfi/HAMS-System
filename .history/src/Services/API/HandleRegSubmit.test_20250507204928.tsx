import { HandleRegSubmit } from "./HandleRegSubmit";

describe("HandleRegSubmit", () => {
  const mockUrl = "https://api.test.com/register";
  let formData: FormData;

  beforeEach(() => {
    jest.restoreAllMocks();
    formData = new FormData();
    formData.append("name", "John Doe");
    jest.spyOn(window, "alert").mockImplementation(() => {}); // silence alert
  });

  it("returns JSON result on 200 success with JSON content", async () => {
    const mockJson = { message: "Registered successfully" };

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: () => "application/json",
      },
      json: async () => mockJson,
    }) as jest.Mock;

    const result = await HandleRegSubmit(formData, mockUrl);

    expect(result).toEqual(mockJson);
    expect(window.alert).toHaveBeenCalledWith("Success");
  });

  it("returns text result on 200 success with text content", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: () => "text/plain",
      },
      text: async () => "Registration complete",
    }) as jest.Mock;

    const result = await HandleRegSubmit(formData, mockUrl);

    expect(result).toBe("Registration complete");
    expect(window.alert).toHaveBeenCalledWith("Success");
  });

  it("throws error with JSON message on failed response", async () => {
    const mockError = { message: "Email already exists" };

    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      headers: {
        get: () => "application/json",
      },
      json: async () => mockError,
    }) as jest.Mock;

    await HandleRegSubmit(formData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith("Email already exists");
  });

  it("throws error with text message on failed response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      headers: {
        get: () => "text/plain",
      },
      text: async () => "Bad Request",
    }) as jest.Mock;

    await HandleRegSubmit(formData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith("Bad Request");
  });

  it("alerts on fetch/network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await HandleRegSubmit(formData, mockUrl);

    expect(window.alert).toHaveBeenCalledWith(expect.any(Error));
  });
});
