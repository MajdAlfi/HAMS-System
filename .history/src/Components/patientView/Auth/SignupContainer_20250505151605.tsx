import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";

export const SignupContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("44");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleReg(value: string, field: string) {
    if (value === "" || !isNaN(Number(value))) {
      switch (field) {
        case "phone":
          setPhoneNumber(value);
          break;
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "67vh",
        width: "35vw",
        marginLeft: "32.5vw",
        marginTop: "16vh",
      }}
      className="roundedCornersContainer"
    >
      <i
        className="bi-pencil-square"
        style={{ color: "rgb(0, 121, 185)", fontSize: "40px" }}
      ></i>
      <br />
      <strong style={{ fontSize: "35px" }}>Signup</strong>
      <div style={{ height: "10px" }} />
      <input
        placeholder="Full Name"
        value={name}
        inputMode="text"
        className="txtFieldStyle mx-auto"
        onChange={(val) => setName(val.target.value)}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        inputMode="numeric"
        className="txtFieldStyle mx-auto"
        maxLength={14}
        onChange={(val) => handleReg(val.target.value, "phone")}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <input
        placeholder="Address"
        value={address}
        inputMode="text"
        className="txtFieldStyle mx-auto"
        onChange={(val) => setAddress(val.target.value)}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <div>
        <label
          htmlFor="gender"
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          Gender:
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(val) => setGender(val.target.value)}
          className="txtFieldStyle"
          style={{ width: "290px" }}
        >
          <option value={""}>Select</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>
      </div>
      <div style={{ height: "10px" }} />
      <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
        <label
          style={{
            paddingTop: "15px",
            paddingRight: "20px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Date of Birth:
        </label>
        <input
          placeholder="DOB"
          value={DOB}
          className="txtFieldStyle mx-auto"
          max={new Date().toISOString().split("T")[0]}
          onChange={(val) => setDOB(val.target.value)}
          type="date"
          style={{ width: "20vw" }}
        />
      </div>
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
          const date = new Date(DOB);
          // if (
          //   phoneNumber == "" ||
          //   name == "" ||
          //   address == "" ||
          //   gender == "" ||
          //   password == ""
          // ) {
          //   alert("Please enter the required data");
          // }
          if (isNaN(date.getTime())) {
            alert("Please enter a valid date of birth.");
            return;
          }
          HandleSubmit(
            {
              phoneNo: phoneNumber,
              password: password,
              address: address,
              Gender: gender,
              DOB: date,
              Name: name,
              accountType: "Patient",
            },
            `${baseURL}/register`
          ).then(async (token) => {
            if (token != null) {
              await HandleRegisterLogin(token);

              CheckUserType(navigate);
            }
          });
        }}
      >
        Signup
      </button>
      <div style={{ height: "3px" }} />
      <button className="switchAuthBtn" onClick={() => navigate("/Login")}>
        Already a user? Login
      </button>
    </div>
  );
};
