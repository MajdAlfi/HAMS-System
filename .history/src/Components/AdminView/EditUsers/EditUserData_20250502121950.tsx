import { useState } from "react";

export const EditUserData = () => {
  const [UserName, SetUserName] = useState("Name");
  const [Gender, SetGender] = useState("Name");
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
        style={{ marginTop: "3vh", display: "flex", flexDirection: "column" }}
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
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
          style={{ width: "25vw" }}
          type="text"
        />
        <input
          placeholder="Address"
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
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
