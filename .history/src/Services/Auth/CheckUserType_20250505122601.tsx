export const CheckUserType = (navigate: ReturnType<typeof useNavigate>) => {
  const userDataString = localStorage.getItem("User");
  if (!userDataString) {
    alert("User data not found in localStorage");
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
    alert("Wrong account type. Please contact authorized personnel.");
  }
};
