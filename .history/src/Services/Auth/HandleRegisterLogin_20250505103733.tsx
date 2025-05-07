import { jwtDecode } from "jwt-decode";
import { baseURL } from "../Others/baseURL";
import { UserModel } from "../../Models/UserModel";
import { FetchAPIUser } from "../API/FetchAPIUser";

type jwType = {
  user_id: string;
};

export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);

  const decoded = jwtDecode<jwType>(token);
  const uid = decoded.user_id;

  FetchAPIUser(
    { uid: uid, token: token, "Content-Type": "application/json" },
    `${baseURL}/userdata/get`
  )
    .then((value) => {
      const date = Date.parse(value.DOB.toString());
      console.log(date);
      const User: UserModel = {
        id: uid,
        name: value.Name,
        phoneNo: parseInt(value.phoneNo.toString()),
        DOB: date,
        Gender: value.Gender,
        accountType: value.accountType,
      };
      alert(date);
      alert(User.name);
      localStorage.setItem("User", JSON.stringify(User));
      console.log("User loaded:", User);
    })
    .catch((error: string) => {
      console.error("Failed to load user data:", error);
    });
};
