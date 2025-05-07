import { jwtDecode } from "jwt-decode";
import { HandleSubmit } from "../API/HandleSubmit";
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

  FetchAPIUser({ uid: uid, token: token }, `${baseURL}/userdata/get`)
    .then((value) => {
      const date = new Date(parseInt(value.DOB.toString()));
      const User: UserModel = {
        id: uid,
        name: value.Name,
        phoneNo: parseInt(value.phoneNo.toString()),
        DOB: date,
        Gender: value.Gender,
        accountType: value.accountType,
      };
      alert(value.Name);
      localStorage.setItem("User", JSON.stringify(User));
      console.log("User loaded:", User);
    })
    .catch((error: string) => {
      console.error("Failed to load user data:", error);
    });
};
