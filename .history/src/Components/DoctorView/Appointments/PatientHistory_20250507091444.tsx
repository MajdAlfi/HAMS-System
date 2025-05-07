import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";
import { DocPatientHistory } from "./DocPatientHistory";
import { PatientHistoryDisplay } from "./PatientHistoryDisplay";

type Appointment = {
  _id: string;
  Apt: string;
  Hospital: string;
  State: string;
  descPatient: string;
  diagnosis: string;
  doctor: {
    name: string;
    img: string;
  };
};

export const PatientHistory = () => {
  const location = useLocation();
  const { uidPatient } = location.state || {};
  const [history, setHistory] = useState<Appointment[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${baseURL}/getPatientHistory/${uidPatient}`);
        const data = await res.json();
        setHistory(data.history);
      } catch (error) {
        console.error("Error fetching patient history", error);
      }
    };

    if (uidPatient) fetchHistory();
  }, [uidPatient]);

  const selected = history[selectedIndex];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "30vw",
          height: "100vh",
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "white" }}>
          {selected?.doctor?.name ?? "Patient"}
        </h1>
        <div style={{ marginTop: "5vh" }}>
          {history.map((apt, idx) => (
            <div key={apt._id} onClick={() => setSelectedIndex(idx)}>
              <DocPatientHistory
                doctorName={apt.doctor.name}
                dateTime={new Date(apt.Apt)}
                hospital={apt.Hospital}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Display */}
      <div style={{ height: "100vh", width: "70vw" }}>
        {selected && <PatientHistoryDisplay appointment={selected} />}
      </div>
    </div>
  );
};
