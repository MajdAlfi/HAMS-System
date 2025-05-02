import { useState } from "react";

export const EditUserData = () => {
  const [UserName, SetUserName] = useState("Name");
  const [Gender, SetGender] = useState("Name");
  const [PhoneNumber, SetPhoneNumber] = useState("+44");

  const [Address, SetAddress] = useState("");
  const [DOBDay, setDOBDay] = useState("");
  const [DOBMonth, setDOBMonth] = useState("");
  const [DOBYear, setDOBYear] = useState("");
  const [password, setPassword] = useState("");

  function handleReg(e: string, func: string) {
    console.log(e);
    if (e === "" || !isNaN(Number(e))) {
      if (func == "phone") {
        SetPhoneNumber(e);
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
    <div style={{ marginTop: "10vh", marginLeft: "37.5vw" }}>
      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "12vh",
          width: "10vw",
          objectFit: "cover",

          borderRadius: "30px",
        }}
      />
      <div
        style={{
          marginTop: "3vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "50vh",
        }}
      >
        <input
          placeholder="User Name"
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
        <input
          placeholder="Phone Number"
          value={PhoneNumber}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetPhoneNumber(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
        <input
          placeholder="Address"
          value={Address}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetAddress(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
        <select
          id="gender"
          value={Gender}
          onChange={(val) => SetGender(val.target.value)}
          className="txtFieldStyle"
          style={{ width: "26vw" }}
        >
          <option value={""}>Select</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>
        <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
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

        <input
          placeholder="User Name"
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
        <input
          placeholder="User Name"
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
      </div>
    </div>
  );
};
