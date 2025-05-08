import { FetchDocData } from "../../../src/Services/API/fetchDocData";

describe("FetchDocData", () => {
  const mockHeaders = {
    uid: "doc123",
    token: "mockToken",
    "Content-Type": "application/json",
  };

  const mockUrl = "https://api.test.com/doc";

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {}); // Silence alert in tests
  });

  it("returns parsed doctor data on success", async () => {
    const mockDocData = {
      img: "doctor.jpg",
      Hospital: "City Hospital",
      desc: "Cardiologist",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(mockDocData),
    }) as jest.Mock;

    const result = await FetchDocData(mockHeaders, mockUrl);

    expect(result).toEqual(mockDocData);
  });

  it("throws an error if response is not OK", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    await expect(FetchDocData(mockHeaders, mockUrl)).rejects.toThrow(
      "Failed to fetch doctor data: 500"
    );
  });

  it("throws an error if response is empty", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    }) as jest.Mock;

    await expect(FetchDocData(mockHeaders, mockUrl)).rejects.toThrow(
      "Empty response from doctor API"
    );
  });

  it("throws an error on invalid JSON", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "NOT_JSON",
    }) as jest.Mock;

    await expect(FetchDocData(mockHeaders, mockUrl)).rejects.toThrow(
      /Invalid JSON format in doctor response/
    );
  });

  it("throws an error if required fields are missing", async () => {
    const missingField = {
      img: "doctor.jpg",
      Hospital: "City Hospital",
      // desc is missing
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(missingField),
    }) as jest.Mock;

    await expect(FetchDocData(mockHeaders, mockUrl)).rejects.toThrow(
      "Doctor data is missing expected fields"
    );
  });

  it("throws an error if any field has the wrong type", async () => {
    const wrongTypes = {
      img: 123, // should be string
      Hospital: "City Hospital",
      desc: "Cardiologist",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(wrongTypes),
    }) as jest.Mock;

    await expect(FetchDocData(mockHeaders, mockUrl)).rejects.toThrow(
      "Doctor data fields have incorrect types"
    );
  });
});
