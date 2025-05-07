import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { HandleSubmit } from "../../../Services/API/HandleSubmit";
import { CheckUserType } from "../../../Services/Auth/CheckUserType";
import { HandleRegisterLogin } from "../../../Services/Auth/HandleRegisterLogin";

interface RegistrationPayload {
  phoneNo: string;
  password: string;
  address: string;
  Gender: string;
  DOB: Date;
  Name: string;
  accountType: "Patient" | "Doctor";
  Specialization?: string;
  Hospital?: string;
  // image?: File; // Only include if your backend supports it
}

export const SignupContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("44");
  const [isDoc, setIsDoc] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const hospitals: string[] = [
    "General Hospital",
    "City Clinic",
    "WellCare Center",
  ];
  const navigate = useNavigate();

  const handleReg = (value: string, field: "phone") => {
    if (value === "" || !isNaN(Number(value))) {
      if (field === "phone") {
        setPhoneNumber(value);
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
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
    }

    const payload: RegistrationPayload = {
      phoneNo: phoneNumber,
      password: password,
      address: address,
      Gender: gender,
      DOB: date,
      Name: name,
      accountType: isDoc ? "Doctor" : "Patient",
      ...(isDoc && {
        Specialization: specialization,
        Hospital: selectedHospital,
      }),
    };

    // If your backend supports image upload, this would need FormData
    HandleSubmit(
      payload as unknown as Record<string, unknown>,
      `${baseURL}/register`
    ).then(async (token) => {
      if (token != null) {
        await HandleRegisterLogin(token);
        CheckUserType(navigate);
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
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
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        inputMode="numeric"
        className="txtFieldStyle mx-auto"
        maxLength={14}
        onChange={(e) => handleReg(e.target.value, "phone")}
        type="text"
      />
      <div style={{ height: "10px" }} />
      <input
        placeholder="Address"
        value={address}
        inputMode="text"
        className="txtFieldStyle mx-auto"
        onChange={(e) => setAddress(e.target.value)}
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
          onChange={(e) => setGender(e.target.value)}
          className="txtFieldStyle"
          style={{ width: "290px" }}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
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
          value={DOB}
          className="txtFieldStyle mx-auto"
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDOB(e.target.value)}
          type="date"
          style={{ width: "16vw" }}
        />
      </div>
      <div style={{ height: "10px" }} />
      <input
        placeholder="Password"
        value={password}
        className="txtFieldStyle mx-auto"
        onChange={(e) => setPassword(e.target.value)}
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
            onChange={handleImageChange}
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
      <button type="submit" className="btnAuth" onClick={handleSubmit}>
        Signup
      </button>
      <div style={{ height: "3px" }} />
      <button className="switchAuthBtn" onClick={() => navigate("/Login")}>
        Already a user? Login
      </button>
    </div>
  );
};
