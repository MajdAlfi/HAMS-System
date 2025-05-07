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

  HandleSubmit({ uid: uid }, `${baseURL}/userdata/get`)
    .then((value) => {
      const User: UserModel = {
        id: uid,
        name: value.Name,
        phoneNo: value.phoneNo,
        DOB: value.DOB,
        Gender: value.Gender,
        accountType: value.accountType,
      };

      // You can now do something with `User`, like store it in context, localStorage, etc.
      console.log("User loaded:", User);
    })
    .catch((error) => {
      console.error("Failed to load user data:", error);
    });
};
