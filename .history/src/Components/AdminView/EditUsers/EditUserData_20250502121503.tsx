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

      <input
        placeholder="Search Phone Number"
        value={UserName}
        inputMode="numeric"
        className="txtFieldStyle mx-auto"
        maxLength={14}
        onChange={(val) => SetUserName(val.target.value)}
        type="text"
      />
    </div>
  );
};
