import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";

type Appointment = {
  _id: string;
  uidPatient: string;
  Apt: string;
  descPatient: string;
  State: string;
  diagnosis: string;
  patientName: string; // new field from backend
};

export const AptDoctorHome = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    const doctor = JSON.parse(localStorage.getItem("User") || "{}");
    try {
      const res = await fetch(
        `${baseURL}/getDocAppointmentsByDate?date=${selectedDate}`,
        {
          headers: {
            uid: doctor.id, // assuming "id" is the uidDoc
          },
        }
      );
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch doctor appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "90vh",
          backgroundColor: "white",
          borderTopLeftRadius: "30px",
          borderBottomLeftRadius: "30px",
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h2 style={{ marginBottom: "20px" }}>Appointments</h2>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: "12vw",
                border: "none",
                backgroundColor: "rgb(233, 233, 233)",
                borderRadius: "30px",
                fontWeight: "bold",
                marginTop: "2vh",
                fontSize: "15px",
                padding: "12px 16px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {appointments.map((apt) => (
            <div
              key={apt._id}
              style={{
                backgroundColor: "rgba(214, 214, 214, 0.32)",
                borderRadius: "12px",
                padding: "16px",
                height: "40vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h1 style={{ color: "rgba(0, 164, 201, 0.62)" }}>
                {apt.patientName}
              </h1>

              <h6
                style={{
                  margin: 0,
                  fontWeight: 400,
                  color: "#555",
                  height: "30vh",
                  overflowY: "auto",
                }}
              >
                {apt.descPatient}
              </h6>

              <h6
                style={{
                  margin: "4px 0",
                  fontWeight: 700,
                  color:
                    apt.State === "Confirmed"
                      ? "rgba(4, 230, 0, 0.77)"
                      : apt.State === "Cancelled"
                      ? "red"
                      : "#555",
                }}
              >
                {apt.State}
              </h6>

              <h6 style={{ margin: "4px 0", fontWeight: 400, color: "#555" }}>
                {new Date(apt.Apt).toLocaleString()}
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
                onClick={() => navigate(`/viewaptdoc?aptId=${apt._id}`)}
              >
                View Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
