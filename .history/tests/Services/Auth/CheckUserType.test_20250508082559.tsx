import { CheckUserType } from "../../../src/Services/Auth/CheckUserType";

describe("CheckUserType", () => {
  let mockNavigate: jest.Mock;

  beforeAll(() => {
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
      };
    })();

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });
  });
  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.clearAllMocks();
  });

  it("navigates to /home for Patient accountType", () => {
    localStorage.setItem("User", JSON.stringify({ accountType: "Patient" }));

    CheckUserType(mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("navigates to /dochome for Doctor accountType", () => {
    localStorage.setItem("User", JSON.stringify({ accountType: "Doctor" }));

    CheckUserType(mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith("/dochome");
  });

  it("navigates to /adminhome for Admin accountType", () => {
    localStorage.setItem("User", JSON.stringify({ accountType: "Admin" }));

    CheckUserType(mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith("/adminhome");
  });

  it("alerts if accountType is unknown", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.setItem("User", JSON.stringify({ accountType: "Guest" }));

    CheckUserType(mockNavigate);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "Wrong account type. Please contact authorized personnel."
    );
    alertMock.mockRestore();
  });

  it("alerts if no user data is found in localStorage", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.removeItem("User");

    CheckUserType(mockNavigate);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "User data not found in localStorage"
    );
    alertMock.mockRestore();
  });
});
