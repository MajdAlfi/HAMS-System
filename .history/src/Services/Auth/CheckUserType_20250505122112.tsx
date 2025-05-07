import { useNavigate } from "react-router-dom";

export const CheckUserType = () => {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("User");
  if (!userDataString) {
    alert("User data not found in localStorage");
    return;
  }

  const userData = JSON.parse(userDataString); // ✅ Properly parse
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
