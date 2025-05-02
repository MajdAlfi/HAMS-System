import { useState } from "react";

export const EditUserData = () => {
  const [UserName, SetUserName] = useState();
  return (
    <div>
      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "12vh",
          width: "10vw",
          objectFit: "cover",
          marginTop: "10vh",
          marginLeft: "45vw",
          borderRadius: "30px",
        }}
      />
      <div>
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
    </div>
  );
};
