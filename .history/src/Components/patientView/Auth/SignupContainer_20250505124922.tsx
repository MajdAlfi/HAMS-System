import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";

export const SignupContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("44");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOBDay, setDOBDay] = useState("");
  const [DOBMonth, setDOBMonth] = useState("");
  const [DOBYear, setDOBYear] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleReg(value: string, field: string) {
    if (value === "" || !isNaN(Number(value))) {
      switch (field) {
        case "phone":
          setPhoneNumber(value);
          break;
        case "DOBdd":
          setDOBDay(value);
          break;
        case "DOBmm":
          setDOBMonth(value);
          break;
        case "DOByy":
          setDOBYear(value);
          break;
      }
    }
  }

  const isValidDate = (y: string, m: string, d: string) => {
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return !isNaN(date.getTime());
  };

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
          placeholder="DD"
          value={DOBDay}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={2}
          onChange={(val) => handleReg(val.target.value, "DOBdd")}
          type="text"
          style={{ width: "50px" }}
        />
        <strong style={{ fontSize: "30px" }}>/</strong>
        <input
          placeholder="MM"
          value={DOBMonth}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={2}
          onChange={(val) => handleReg(val.target.value, "DOBmm")}
          type="text"
          style={{ width: "50px" }}
        />
        <strong style={{ fontSize: "30px" }}>/</strong>
        <input
          placeholder="YYYY"
          value={DOBYear}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={4}
          onChange={(val) => handleReg(val.target.value, "DOByy")}
          type="text"
          style={{ width: "70px" }}
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
          if (!isValidDate(DOBYear, DOBMonth, DOBDay)) {
            alert("Please enter a valid date of birth.");
            return;
          }

          const date = new Date(
            parseInt(DOBYear),
            parseInt(DOBMonth) - 1,
            parseInt(DOBDay)
          );
          // if (
          //   phoneNumber == "" ||
          //   name == "" ||
          //   address == "" ||
          //   gender == "" ||
          //   password == ""
          // ) {
          //   alert("Please enter the required data");
          // }
          if (isNaN(date.getTime()) && date.getTime() > Date.now()) {
            alert("Please enter a valid date of birth.");
            return;
          }
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
        Signup
      </button>
      <div style={{ height: "3px" }} />
      <button className="switchAuthBtn" onClick={() => navigate("/Login")}>
        Already a user? Login
      </button>
    </div>
  );
};
