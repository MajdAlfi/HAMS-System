import { FetchAPIUser } from "./FetchAPIUser";

describe("FetchAPIUser", () => {
  const mockHeaders = {
    uid: "user123",
    token: "mockToken",
    "Content-Type": "application/json",
  };
  const mockApiUrl = "https://test.com/api/user";

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches and parses user data correctly", async () => {
    const mockResponseData = {
      Name: "Jane Doe",
      phoneNo: 9876543210,
      DOB: "1995-05-15T00:00:00.000Z",
      address: "456 Elm St",
      Gender: "Female",
      accountType: "Patient",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    }) as jest.Mock;

    const result = await FetchAPIUser(mockHeaders, mockApiUrl);

    expect(result).toEqual({
      ...mockResponseData,
      DOB: new Date(mockResponseData.DOB), // ensure it’s converted to a Date
    });

    expect(global.fetch).toHaveBeenCalledWith(mockApiUrl, {
      method: "GET",
      headers: mockHeaders,
    });
  });

  it("throws an error if response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    }) as jest.Mock;

    await expect(FetchAPIUser(mockHeaders, mockApiUrl)).rejects.toThrow(
      "Failed to fetch data"
    );
  });
});
