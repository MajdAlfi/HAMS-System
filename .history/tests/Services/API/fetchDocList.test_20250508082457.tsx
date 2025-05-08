import { FetchDocList } from "../../../src/Services/API/fetchDocList";
import { doctorModel } from "../../../src/Models/doctorModel";

describe("FetchDocList", () => {
  const mockHeaders = {
    uid: "admin123",
    token: "mockToken",
    "Content-Type": "application/json",
  };

  const mockUrl = "https://api.example.com/doctors";

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("returns parsed doctor list on success", async () => {
    const mockDoctorList: doctorModel[] = [
      {
        img: "doctor1.jpg",
        Hospital: "City Hospital",
        Specialization: "Cardiology",
      },
      {
        img: "doctor2.jpg",
        Hospital: "Metro Clinic",
        Specialization: "Dermatology",
      },
    ];

    const mockResponse = {
      dataDoc: mockDoctorList,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(mockResponse),
    }) as jest.Mock;

    const result = await FetchDocList(mockHeaders, mockUrl);

    expect(result).toEqual({ dataDoc: mockDoctorList });
  });

  it("throws error if response is not OK", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as jest.Mock;

    await expect(FetchDocList(mockHeaders, mockUrl)).rejects.toThrow(
      "Failed to fetch doctor data: 404"
    );
  });

  it("throws error if response is empty", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    }) as jest.Mock;

    await expect(FetchDocList(mockHeaders, mockUrl)).rejects.toThrow(
      "Empty response from doctor API"
    );
  });

  it("throws error if JSON is invalid", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "INVALID_JSON",
    }) as jest.Mock;

    await expect(FetchDocList(mockHeaders, mockUrl)).rejects.toThrow(
      /Invalid JSON format in doctor response/
    );
  });

  it("throws error if `dataDoc` is missing", async () => {
    const badResponse = {
      doctors: [],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(badResponse),
    }) as jest.Mock;

    await expect(FetchDocList(mockHeaders, mockUrl)).rejects.toThrow(
      "Doctor data is missing expected fields"
    );
  });

  it("throws error if `dataDoc` is not an array", async () => {
    const badResponse = {
      dataDoc: "not-an-array",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify(badResponse),
    }) as jest.Mock;

    await expect(FetchDocList(mockHeaders, mockUrl)).rejects.toThrow(
      "Doctor data fields have incorrect types"
    );
  });
});
