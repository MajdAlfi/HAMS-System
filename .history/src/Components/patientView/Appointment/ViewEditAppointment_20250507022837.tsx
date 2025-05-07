import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { UserModel } from "../../../Models/UserModel";

type Appointment = {
  Apt: string;
  uidDoc: string;
  uidPatient: string;
  Hospital: string;
  doctorName: string;
  State: string;
  descPatient: string;
  diagnosis: string;
};

const ViewEditAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const aptId = searchParams.get("aptNumber");
  const storedUser = localStorage.getItem("User");
  const parsed: UserModel = JSON.parse(storedUser!);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading || !appointment) return <div>Loading...</div>;

  const date = new Date(appointment.Apt);
  const today = new Date();

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const showButtons = date >= today;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "30px",
        height: "85vh",
        width: "80vw",
        marginTop: "7.5vh",
        marginLeft: "10vw",
      }}
    >
      <div style={{ display: "flex" }}>
        <button
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            display: "flex",
            cursor: "pointer",
            marginTop: "5vh",
            marginLeft: "3vw",
            fontSize: 30,
          }}
          onClick={() => navigate(-1)}
        >
          X
        </button>
      </div>

      <h1
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          marginTop: "20vh",
        }}
      >
        🩺 {appointment.doctorName}
      </h1>

      <h2 style={{ fontSize: "30px", marginTop: "5vh", margin: 0 }}>
        {new Date(appointment.Apt).toDateString()}
      </h2>

      <h2 style={{ fontSize: "30px", margin: 0 }}>
        {new Date(appointment.Apt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h2>

      <h3 style={{ fontSize: "20px", margin: 0 }}>📍 {appointment.Hospital}</h3>

      <h3
        style={{
          fontSize: "30px",
          margin: 0,
          color: appointment.State === "Confirmed" ? "green" : "red",
        }}
      >
        {appointment.State}
      </h3>

      <button
        style={{
          color: "white",
          backgroundColor: "rgba(4, 230, 0, 0.77)",
          width: "30vw",
          display: showButtons ? "inline-block" : "none",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "15vh",
          borderRadius: "30px",
        }}
      >
        Reschedule
      </button>

      <button
        style={{
          color: "white",
          backgroundColor: "red",
          display: showButtons ? "inline-block" : "none",
          width: "30vw",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "5vh",
          borderRadius: "30px",
          marginLeft: "3vw",
        }}
        onClick={async () => {
          if (!aptId) return;
          const confirm = window.confirm(
            "Are you sure you want to cancel this appointment?"
          );
          if (!confirm) return;

          try {
            const token = localStorage.getItem("token"); // assumes token is stored
            const res = await fetch(`${baseURL}/cancelApt/${aptId}`, {
              method: "DELETE",
              headers: {
                token: `${token}`,
                uid: parsed.id,
              },
            });

            if (res.ok) {
              alert("Appointment cancelled successfully.");
              navigate("/home");
            } else {
              const errMsg = await res.text();
              alert(`Failed to cancel: ${errMsg}`);
            }
          } catch (err) {
            console.error("Cancel error:", err);
            alert("Error cancelling appointment.");
          }
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ViewEditAppointment;
