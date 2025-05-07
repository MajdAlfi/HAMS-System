import { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";
import { HistoryCompontent } from "./HistoryCompontent";

type Appointment = {
  _id: string;
  Apt: string;
  Hospital: string;
  State: string;
  descPatient: string;
  diagnosis: string;
};

type DoctorInfo = {
  name: string;
  img: string;
};

type HistoryItem = {
  appointment: Appointment;
  doctor: DoctorInfo;
};

export const HistoryHome = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("User") || "{}");
        const token = localStorage.getItem("token") || "{}";
        //    alert(user + token);
        const res = await fetch(`${baseURL}/getPatHistory`, {
          headers: {
            uid: user.id.toString(),
            token: token.toString(),
            "Content-Type": "application/json",
          },
        });
        const bod = await res.json();
        //   alert(bod);

        const data = bod;

        // Defensive check
        if (!data.listAptHistory || !data.listNames) {
          alert("Invalid response:\n" + JSON.stringify(data, null, 2));
          return;
        }

        const combined = data.listAptHistory.map(
          (apt: Appointment, index: number) => ({
            appointment: apt,
            doctor: data.listNames[index] || { name: "Unknown", img: "" },
          })
        );

        setHistory(combined);
      } catch (error) {
        alert("Failed to fetch history:" + error);
      }
    };

    fetchHistory();
  }, []);

  const selected = history[selectedIndex];

  return (
    <div
      style={{
        display: "flex",
        width: "85vw",
        height: "100vh",
        backgroundColor: "white",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
      }}
    >
      <div
        style={{
          width: "25vw",
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          borderRadius: "30px 0 0 30px",
          padding: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>History</h1>
        {history.map((item, idx) => (
          <div key={idx} onClick={() => setSelectedIndex(idx)}>
            <HistoryCompontent
              doctorName={item.doctor.name}
              apt={new Date(item.appointment.Apt)}
              hospital={item.appointment.Hospital}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          width: "55vw",
          padding: "20px",
          backgroundColor: "rgba(214, 214, 214, 0.18)",
          borderRadius: "30px",
          marginLeft: "2.5vw",
          marginTop: "5vh",
        }}
      >
        {selected && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>🩺 DR. {selected.doctor.name}</h1>
              <img
                src={`${baseURL}/doc-images/${selected.doctor.img}`}
                alt="Doctor"
                style={{
                  height: "10vh",
                  width: "10vw",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
            </div>
            <h2>🗓️ {new Date(selected.appointment.Apt).toLocaleString()}</h2>
            <h2>{selected.appointment.Hospital}</h2>
            <h2>{selected.appointment.State}</h2>
            <h2 style={{ color: "rgba(4, 230, 0, 0.77)" }}>
              {selected.appointment.diagnosis || "Confirmed"}
            </h2>
            <p
              style={{
                fontSize: 15,
                width: "45vw",
                marginLeft: "5vw",
                textAlign: "justify",
              }}
            >
              {selected.appointment.descPatient}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
