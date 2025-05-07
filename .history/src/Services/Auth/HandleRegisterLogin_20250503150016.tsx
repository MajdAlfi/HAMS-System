import { jwtDecode } from "jwt-decode";
import { HandleSubmit } from "../API/HandleSubmit";
import { baseURL } from "../Others/baseURL";

type jwType = {
  user_id: string;
};

export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);

  // Decode the token and tell TypeScript what to expect
  const decoded = jwtDecode<jwType>(token);

  // Extract the user_id
  const uid = decoded.user_id;

  // Use it in your submit handler
  HandleSubmit({ uid: uid }, `${baseURL}/userdata/get`);
};
