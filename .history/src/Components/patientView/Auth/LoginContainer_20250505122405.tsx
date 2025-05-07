import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";

export const LoginContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("44");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "46vh",
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
      <strong style={{ fontSize: "40px" }}>Login</strong>
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
          ).then((token) => {
            if (token != null) {
              HandleRegisterLogin(token);
              CheckUserType();
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
