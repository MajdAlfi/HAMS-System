import { HandleRegisterLogin } from "../../../src/Services/Auth/HandleRegisterLogin";
import { jwtDecode } from "jwt-decode";
import { FetchAPIUser } from "../../../src/Services/API/FetchAPIUser";
import { FetchDocData } from "../../../src/Services/API/fetchDocData";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

jest.mock("../../src/Services/API/FetchAPIUser");
jest.mock("../../src/ServicesAPI/fetchDocData");

describe("HandleRegisterLogin", () => {
  const mockToken = "mock.jwt.token";

  beforeAll(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
        store,
      };
    })();

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("saves user data to localStorage for non-doctor accounts", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "user123",
      accountType: "Patient",
    });

    (FetchAPIUser as jest.Mock).mockResolvedValue({
      Name: "John Doe",
      phoneNo: "1234567890",
      DOB: "2000-01-01T00:00:00.000Z",
      address: "123 Main St",
      Gender: "Male",
      accountType: "Patient",
    });

    await HandleRegisterLogin(mockToken);

    const user = JSON.parse(localStorage.getItem("User") || "{}");
    expect(user.name).toBe("John Doe");
    expect(user.accountType).toBe("Patient");
    expect(localStorage.getItem("Doc")).toBeNull();
  });

  it("saves doctor data to localStorage if accountType is Doctor", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "doc123",
      accountType: "Doctor",
    });

    (FetchAPIUser as jest.Mock).mockResolvedValue({
      Name: "Dr. Strange",
      phoneNo: "9876543210",
      DOB: "1980-05-01T00:00:00.000Z",
      address: "456 Marvel Blvd",
      Gender: "Male",
      accountType: "Doctor",
    });

    (FetchDocData as jest.Mock).mockResolvedValue({
      img: "doctor.jpg",
      Hospital: "Gotham General",
      desc: "Cardiology",
    });

    await HandleRegisterLogin(mockToken);

    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const doc = JSON.parse(localStorage.getItem("Doc") || "{}");

    expect(user.name).toBe("Dr. Strange");
    expect(user.accountType).toBe("Doctor");

    expect(doc.img).toBe("doctor.jpg");
    expect(doc.Specialization).toBe("Cardiology");
  });

  it("handles FetchAPIUser failure gracefully", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "user123",
      accountType: "Patient",
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (FetchAPIUser as jest.Mock).mockRejectedValue(new Error("API error"));

    await HandleRegisterLogin(mockToken);

    expect(localStorage.getItem("User")).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to load user data:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });

  it("handles FetchDocData failure without crashing", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      user_id: "doc123",
      accountType: "Doctor",
    });

    (FetchAPIUser as jest.Mock).mockResolvedValue({
      Name: "Dr. Who",
      phoneNo: "1231231234",
      DOB: "1970-01-01T00:00:00.000Z",
      address: "Time Street",
      Gender: "Unknown",
      accountType: "Doctor",
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (FetchDocData as jest.Mock).mockRejectedValue(
      new Error("Doctor data error")
    );

    await HandleRegisterLogin(mockToken);

    expect(localStorage.getItem("User")).not.toBeNull();
    expect(localStorage.getItem("Doc")).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching doctor data:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
