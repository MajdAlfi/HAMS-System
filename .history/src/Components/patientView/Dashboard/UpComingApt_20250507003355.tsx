import { useNavigate } from "react-router-dom";

type CalendarEvent = {
  allDay: boolean;
  start: Date;
  doctorName: string;
  hospital: string;
  state: string;
};

type Props = {
  apt: CalendarEvent;
};

export const UpComingApt = ({ apt }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 164, 201, 0.62)",
        height: "8vh",
        width: "100%",
        borderRadius: "20px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate("/vieweditapt?aptNumber=123")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 style={{ color: "white", margin: 0, fontSize: "14px" }}>
          🩺 {apt.doctorName}
        </h5>
        <span
          style={{
            color: "rgba(4, 230, 0, 0.77)",
            fontWeight: "bold",
            fontSize: "10px",
          }}
        >
          {apt.state}
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px", fontSize: "12px" }}>
        <span style={{ color: "white" }}>
          {apt.start.toLocaleDateString()}{" "}
          {apt.start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span style={{ color: "white" }}>📍{apt.hospital}</span>
      </div>
    </div>
  );
};
