export const CheckUserType = (
  navigate: (path: string) => void,
  alertFn: (msg: string) => void = alert // ✅ fallback for production
) => {
  const userDataString = localStorage.getItem("User");
  if (!userDataString) {
    alertFn("User data not found in localStorage");
    return;
  }

  const userData = JSON.parse(userDataString);
  const accountType = userData.accountType;

  if (accountType === "Patient") {
    navigate("/home");
  } else if (accountType === "Doctor") {
    navigate("/dochome");
  } else if (accountType === "Admin") {
    navigate("/adminhome");
  } else {
    alertFn("Wrong account type. Please contact authorized personnel.");
  }
};
