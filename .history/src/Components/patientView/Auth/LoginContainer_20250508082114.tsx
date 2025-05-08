import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("44");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "55vh",
        width: "34vw",
        marginLeft: "33vw",
        marginTop: "27vh",
      }}
      className="roundedCornersContainer"
    >
      <i
        className="bi bi-person-circle"
        style={{ color: "rgb(0, 121, 185)", fontSize: "80px" }}
      ></i>
      <br />
      <h1 aria-label="submit-login" style={{ margin: 0, fontSize: 35 }}>
        Login
      </h1>
      <div style={{ height: "10px" }} />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        inputMode="numeric"
        className="txtFieldStyle mx-auto"
        maxLength={14}
        onChange={(val) => setPhoneNumber(val.target.value)}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <input
        placeholder="Password"
        value={password}
        className="txtFieldStyle mx-auto"
        onChange={(val) => setPassword(val.target.value)}
        type="password"
      />
      <div style={{ height: "15px" }} />
      <button
        type="submit"
        className="btnAuth"
        onClick={() => {
          HandleSubmit(
            { phoneNo: phoneNumber, password: password },
            `${baseURL}/login`
          ).then(async (token) => {
            if (token != null) {
              await HandleRegisterLogin(token);

              CheckUserType(navigate);
            }
          });
        }}
      >
        Login
      </button>
      <div style={{ height: "3px" }} />
      <button className="switchAuthBtn" onClick={() => navigate("/Signup")}>
        New to the HAMS? Create Account
      </button>
    </div>
  );
};
