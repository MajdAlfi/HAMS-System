import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";

export const SignupContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState("44");
  const [isDoc, setIsDoc] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const hospitals = ["General Hospital", "City Clinic", "WellCare Center"];
  const navigate = useNavigate();

  function handleReg(value: string, field: string) {
    if (value === "" || !isNaN(Number(value))) {
      if (field === "phone") {
        setPhoneNumber(value);
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "auto",
        width: "35vw",
        marginLeft: "32.5vw",
        marginTop: "10vh",
        padding: "2rem",
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
            paddingTop: "1vh",
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
          style={{ width: "16vw" }}
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

      <div style={{ marginTop: "1rem" }}>
        <input
          type="checkbox"
          checked={isDoc}
          onChange={(e) => setIsDoc(e.target.checked)}
          id="isDoc"
        />
        <label
          htmlFor="isDoc"
          style={{ fontWeight: "bold", marginLeft: "10px" }}
        >
          Registering as Doctor
        </label>
      </div>

      {isDoc && (
        <>
          <div style={{ height: "10px" }} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedImage(e.target.files[0]);
              }
            }}
            className="txtFieldStyle mx-auto"
          />
          <div style={{ height: "10px" }} />
          <input
            placeholder="Specialization"
            value={specialization}
            className="txtFieldStyle mx-auto"
            onChange={(e) => setSpecialization(e.target.value)}
            type="text"
          />
          <div style={{ height: "10px" }} />
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="txtFieldStyle mx-auto"
            style={{ width: "290px" }}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </>
      )}

      <div style={{ height: "15px" }} />

      <button
        type="submit"
        className="btnAuth"
        onClick={() => {
          const date = new Date(DOB);
          if (isNaN(date.getTime())) {
            alert("Please enter a valid date of birth.");
            return;
          }

          if (
            phoneNumber === "" ||
            name === "" ||
            address === "" ||
            gender === "" ||
            password === ""
          ) {
            alert("Please fill out all required fields.");
            return;
          }

          if (isDoc) {
            if (!specialization || !selectedHospital || !selectedImage) {
              alert(
                "As a doctor, please provide specialization, hospital, and profile image."
              );
              return;
            }

            // Placeholder: you'd upload the image with FormData to backend
            console.log("Uploading doctor image:", selectedImage.name);
          }

          const payload: unknown = {
            phoneNo: phoneNumber,
            password: password,
            address: address,
            Gender: gender,
            DOB: date,
            Name: name,
            accountType: isDoc ? "Doctor" : "Patient",
          };

          if (isDoc) {
            payload.Specialization = specialization;
            payload.Hospital = selectedHospital;
            // Add image to payload if backend supports it
          }

          HandleSubmit(payload, `${baseURL}/register`).then(async (token) => {
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
