import { jwtDecode } from "jwt-decode";
import { HandleSubmit } from "../API/HandleSubmit";

export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);
  const decode =  jwtDecode(token);
  HandleSubmit({"uid":})
};
