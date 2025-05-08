import { CheckUserType } from "./CheckUserType";

describe("CheckUserType", () => {
  let mockNavigate: jest.Mock;

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
