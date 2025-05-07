import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("+44");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "46vh",
        width: "34vw",
        marginLeft: "34vw",
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
      <button type="submit" className="btnAuth">
        Login
      </button>
      <div style={{ height: "3px" }} />
      <button className="switchAuthBtn" onClick={() => navigate("/Signup")}>
        New to the HAMS? Create Account
      </button>
    </div>
  );
};
