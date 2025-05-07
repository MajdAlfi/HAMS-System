import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { doctorModel } from "../../../Models/doctorModel";
import { weeklyModel } from "../../../Models/weeklyModel";

export const DocProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [docData, setdocData] = useState<doctorModel | null>(null);
  const [weeklyData, setweeklyData] = useState<weeklyModel | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const storedDoc = localStorage.getItem("Doc");
    const storedweekly = localStorage.getItem("weekly");
    if (storedUser && storedDoc&&storedweekly) {
      try {
        const parsed: UserModel = JSON.parse(storedUser);
        const parsedDoc = JSON.parse(storedDoc);
        const parsedWeekly = JSON.parse(storedDoc);
        setUserData(parsed);
        setdocData(parsedDoc);
        setweeklyData(parsedWeekly)
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
        localStorage.removeItem("User");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/login");
  };

  if (!userData)
    return <div style={{ height: "80vh", width: "85vw" }}>Loading...</div>;
  const date = new Date(userData.DOB);
  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <div style={{ position: "absolute", top: "12vh", right: 30 }}>
        <button
          style={{
            height: "5vh",
            width: "10vw",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "white",

            fontSize: 18,
          }}
          onClick={handleSignout}
        >
          Signout
        </button>
      </div>

      <img
        src={docData.doc.}
        alt="Profile"
        style={{
          height: "14vh",
          width: "10vw",
          borderRadius: "10px",
          marginTop: "15vh",
          objectFit: "cover",
        }}
      />
      <h3>Name: {userData.name}</h3>
      <h3>
        DOB: {date.getDate().toString()}-{date.getMonth().toString()}-
        {date.getFullYear().toString()}
      </h3>
      <h3>Phone: {userData.phoneNo}</h3>
      <h3>addres: {userData.address}</h3>
      <h3>Gender: {userData.Gender}</h3>
      <h3>Account Type: {userData.accountType}</h3>
      <h3>Hospital: {doctorModel.Hospital}</h3>
      <h3>Specialization: {doctorModel.Specialization}</h3>
    </div>
  );
};
