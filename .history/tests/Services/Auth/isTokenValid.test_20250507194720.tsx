import { isTokenValid } from "./isTokenValid";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("isTokenValid", () => {
  const mockToken = "mock.jwt.token";

  const setLocalStorage = (token: string | null) => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => token),
      },
      writable: true,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns true for valid token with future exp", () => {
    setLocalStorage(mockToken);

    const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour ahead
    (jwtDecode as jest.Mock).mockReturnValue({ exp: futureTimestamp });

    const result = isTokenValid();
    expect(result).toBe(true);
  });

  it("returns false for expired token", () => {
    setLocalStorage(mockToken);

    const pastTimestamp = Math.floor(Date.now() / 1000) - 60 * 60; // 1 hour ago
    (jwtDecode as jest.Mock).mockReturnValue({ exp: pastTimestamp });

    const result = isTokenValid();
    expect(result).toBe(false);
  });

  it("returns false if exp is missing", () => {
    setLocalStorage(mockToken);
    (jwtDecode as jest.Mock).mockReturnValue({}); // no exp field

    const result = isTokenValid();
    expect(result).toBe(false);
  });

  it("returns false if no token in localStorage", () => {
    setLocalStorage(null);

    const result = isTokenValid();
    expect(result).toBe(false);
  });

  it("returns false if jwtDecode throws", () => {
    setLocalStorage(mockToken);
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const result = isTokenValid();
    expect(result).toBe(false);
  });
});
