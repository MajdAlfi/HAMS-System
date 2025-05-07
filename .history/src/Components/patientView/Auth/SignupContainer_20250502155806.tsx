import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { baseURL } from "../../../Services/Others/baseURL";

export const SignupContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("+44");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOBDay, setDOBDay] = useState("");
  const [DOBMonth, setDOBMonth] = useState("");
  const [DOBYear, setDOBYear] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleReg(e: string, func: string) {
    console.log(e);
    if (e === "" || !isNaN(Number(e))) {
      if (func == "phone") {
        setPhoneNumber(e);
      } else if (func == "DOBdd") {
        setDOBDay(e);
      } else if (func == "DOBmm") {
        setDOBMonth(e);
      } else if (func == "DOByy") {
        setDOBYear(e);
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
        onChange={(val) => {
          handleReg(val.target.value, "phone");
        }}
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
          max={31}
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
          max={12}
          onChange={(val) => handleReg(val.target.value, "DOBmm")}
          type="text"
          style={{ width: "50px" }}
        />
        <strong style={{ fontSize: "30px" }}>/</strong>
        <input
          placeholder="YY"
          value={DOBYear}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={2}
          onChange={(val) => handleReg(val.target.value, "DOByy")}
          type="text"
          style={{ width: "50px" }}
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
        onClick={() =>
          console.log(
            {
              phoneNo: phoneNumber,
              password: password,
              Address: address,
              Gender: gender,
              DOB: Date.parse(
                { DOBDay } + "/" + { DOBMonth } + "/" + { DOBYear }
              ),
              Name: name,
              accountType: "Patient",
            },
            { baseURL } + "/register"
          )
        }
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
