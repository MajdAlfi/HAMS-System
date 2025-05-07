import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { UserModel } from "../../../Models/UserModel";

type Appointment = {
  _id: string;
  Apt: string;
  doctorName: string;
  Hospital: string;
  State: string;
};

export const RescheduleAppointment = () => {
  const [searchParams] = useSearchParams();
  const aptId = searchParams.get("aptNumber");
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!aptId) return;

      try {
        const res = await fetch(`${baseURL}/getAppointmentById/${aptId}`);
        const data = await res.json();
        setAppointment(data);
      } catch (err) {
        console.error("Failed to fetch appointment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [aptId]);

  const handleSubmit = async () => {
    if (!newDate || !appointment) return;

    try {
      const token = localStorage.getItem("token"); // Assuming JWT token
      const storedUser = localStorage.getItem("User");
      const parsed: UserModel = JSON.parse(storedUser!);
      const res = await fetch(
        `${baseURL}/rescheduleAppointment/${appointment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
            uid: parsed.id,
          },
          body: JSON.stringify({ newDate }),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        alert("Failed: " + errMsg);
        return;
      }

      alert("Appointment successfully rescheduled.");
      navigate("/dashboard"); // or wherever you want
    } catch (err) {
      console.error("Reschedule failed:", err);
      alert("An error occurred.");
    }
  };

  if (loading || !appointment) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "30px",
        height: "85vh",
        width: "80vw",
        margin: "auto",
        marginTop: "7.5vh",
        padding: "2rem",
      }}
    >
      <h1>Reschedule Appointment</h1>
      <h2>🩺 {appointment.doctorName}</h2>
      <p>📍 {appointment.Hospital}</p>
      <p>
        Current Date: {new Date(appointment.Apt).toLocaleDateString()}{" "}
        {new Date(appointment.Apt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <label style={{ marginTop: "1rem", display: "block" }}>
        New Date & Time:
        <input
          type="datetime-local"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={{
            width: "30vw",
            height: "6vh",
            border: "none",
            backgroundColor: "rgb(233, 233, 233)",
            borderRadius: "20px",
            fontWeight: "bold",
            marginTop: "2vh",
            fontSize: "20px",
            padding: "12px 16px",
          }}
        />
      </label>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "rgba(4, 230, 0, 0.77)",
          color: "white",
          borderRadius: "10px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Confirm Reschedule
      </button>
    </div>
  );
};
