import { jwtDecode } from "jwt-decode";
import { baseURL } from "../Others/baseURL";
import { UserModel } from "../../Models/UserModel";
import { FetchAPIUser } from "../API/FetchAPIUser";
import { useNavigate } from "react-router-dom";

type jwType = {
  user_id: string;
};

export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);
  const navigate = useNavigate();
  const decoded = jwtDecode<jwType>(token);
  const uid = decoded.user_id;

  FetchAPIUser(
    { uid: uid, token: token, "Content-Type": "application/json" },
    `${baseURL}/userdata/get`
  )
    .then((value) => {
      const date = new Date(value.DOB);
      console.log(date);
      const User: UserModel = {
        id: uid,
        name: value.Name,
        phoneNo: parseInt(value.phoneNo.toString()),
        DOB: date,
        address: value.address,
        Gender: value.Gender,
        accountType: value.accountType,
      };
      //    alert(User.accountType);
      alert(User.name);
      localStorage.setItem("User", JSON.stringify(User));
      console.log("User loaded:", User);
      if (User.accountType == "Patient") {
        navigate("/home");
      } else if (User.accountType == "Doctor") {
        navigate("/dochome");
      } else if (User.accountType == "Admin") {
        navigate("/adminhome");
      } else {
        alert("wrong account type please contact the autharized people");
      }
    })
    .catch((error: string) => {
      console.error("Failed to load user data:", error);
    });
};
