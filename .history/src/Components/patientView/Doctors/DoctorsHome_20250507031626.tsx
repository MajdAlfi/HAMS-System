import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL"; // adjust if needed

type Doctor = {
  uid: string;
  name: string;
  desc: string;
  Hospital: string;
  img: string;
};

export const DoctorsHome = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${baseURL}/getDocList`); // Make sure this matches your Express route
        const data = await response.json();
        setDoctors(data.dataDoc);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div
      style={{
        width: "85vw",
        height: "100vh",
        backgroundColor: "white",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Available Doctors</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {doctors.map((doc) => (
          <div
            key={doc.uid}
            style={{
              backgroundColor: "rgba(214, 214, 214, 0.32)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`${baseURL}/doc-images/${doc.img}`}
              alt="doctor"
              style={{
                width: "100%",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ margin: 0 }}>{doc.name}</h4>
            <h6 style={{ margin: "4px 0", fontWeight: 400, color: "#555" }}>
              {doc.desc} at {doc.Hospital}
            </h6>
            <button
              style={{
                marginTop: "auto",
                backgroundColor: "rgba(4, 230, 0, 0.77)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate(`/bookapt?docId=${doc.uid}`)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
