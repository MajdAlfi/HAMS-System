import { jwtDecode } from "jwt-decode";
import { UserModel } from "../../Models/UserModel";
import { baseURL } from "../Others/baseURL";
import { FetchAPIUser } from "../API/FetchAPIUser";

import { doctorModel } from "../../Models/doctorModel";
import { FetchDocData } from "../API/fetchDocData";
type JwType = {
  user_id: string;
  accountType: string;
};
export const HandleRegisterLogin = async (token: string): Promise<void> => {
  localStorage.setItem("token", token);

  const decoded = jwtDecode<JwType>(token);
  const uid = decoded.user_id;

  try {
    const value = await FetchAPIUser(
      {
        uid: uid,
        token: token,
        "Content-Type": "application/json",
      },
      `${baseURL}/userdata/get`
    );

    const date = new Date(value.DOB);

    const User: UserModel = {
      id: uid,
      name: value.Name,
      phoneNo: parseInt(value.phoneNo.toString()),
      DOB: date,
      address: value.address,
      Gender: value.Gender,
      accountType: value.accountType,
    };
    localStorage.setItem("User", JSON.stringify(User));
    console.log("User loaded:", User);
    if (decoded.accountType == "Doctor") {
      try {
        const dataDoc = await FetchDocData(
          {
            uid: uid,
            token: token,
            "Content-Type": "application/json",
          },
          `${baseURL}/getDocData/getDoc`
        );
        const Doc: doctorModel = {
          img: dataDoc.img,
          Hospital: dataDoc.Hospital,
          Specialization: dataDoc.Specialization,
        };

        localStorage.setItem("Doc", JSON.stringify(Doc));
      } catch (e) {
        console.error("Error fetching doctor data:", e);
      }
    }
  } catch (error) {
    console.error("Failed to load user data:", error);
  }
};
