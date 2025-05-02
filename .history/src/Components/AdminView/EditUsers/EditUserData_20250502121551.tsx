import { useState } from "react";

export const EditUserData = () => {
  const [UserName, SetUserName] = useState("Name");
  return (
    <div style={{ marginTop: "10vh", marginLeft: "vw" }}>
      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "12vh",
          width: "10vw",
          objectFit: "cover",

          borderRadius: "30px",
        }}
      />
      <div style={{ marginTop: "3vh" }}>
        <input
          placeholder="Search Phone Number"
          value={UserName}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetUserName(val.target.value)}
          style={{ width: "30vw" }}
          type="text"
        />
      </div>
    </div>
  );
};
