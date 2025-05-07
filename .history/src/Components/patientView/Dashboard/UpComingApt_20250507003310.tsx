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
        width: "23vw",
        marginTop: "1vh",
        borderRadius: "20px",
        padding: "8px",
        boxSizing: "border-box",
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
          flexDirection: "row",
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h5
          style={{
            color: "white",
            margin: 0,
            fontSize: "12px",
            fontWeight: "normal",
          }}
        >
          {apt.start.toLocaleDateString()}{" "}
          {apt.start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h5>
        <h5
          style={{
            color: "white",
            margin: 0,
            fontSize: "12px",
            fontWeight: "normal",
          }}
        >
          📍{apt.hospital}
        </h5>
      </div>
    </div>
  );
};
