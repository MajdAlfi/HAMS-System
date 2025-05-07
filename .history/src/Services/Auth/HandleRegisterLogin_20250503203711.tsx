import { jwtDecode } from "jwt-decode";
import { HandleSubmit } from "../API/HandleSubmit";
import { baseURL } from "../Others/baseURL";
import { UserModel } from "../../Models/UserModel";

type jwType = {
  user_id: string;
};

export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);

  const decoded = jwtDecode<jwType>(token);
  const uid = decoded.user_id;

  HandleSubmit({ uid: uid, token: token }, `${baseURL}/userdata/get`)
    .then((value) => {
      const User: UserModel = {
        id: uid,
        name: value.Name,
        phoneNo: value.phoneNo,
        DOB: value.DOB,
        Gender: value.Gender,
        accountType: value.accountType,
      };
      console.log(value.name);
      localStorage.setItem("User", JSON.stringify(User));
      console.log("User loaded:", User);
    })
    .catch((error) => {
      console.error("Failed to load user data:", error);
    });
};
