import { useNavigate } from "react-router-dom";

type CalendarEvent = {
  allDay: boolean;
  start: Date;
  doctorName: string;
  hospital: string;
  state: string;
};

type Props = {
  events: CalendarEvent[];
};

export const UpComingApt = ({ events }: Props) => {
  const navigate = useNavigate();

  if (events.length === 0) {
    return (
      <div
        style={{
          color: "gray",
          fontSize: "14px",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        No upcoming appointments.
      </div>
    );
  }

  return (
    <div style={{ overflowY: "auto", paddingRight: "10px" }}>
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "rgba(0, 164, 201, 0.62)",
            height: "8vh",
            width: "21vw",
            marginTop: "1vh",
            borderRadius: "20px",
            padding: "8px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/vieweditapt?aptNumber=${index}`)}
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
              🩺 {event.doctorName}
            </h5>
            <span
              style={{
                color: "rgba(4, 230, 0, 0.77)",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              {event.state}
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
              {event.start.toLocaleDateString()}{" "}
              {event.start.toLocaleTimeString([], {
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
              📍{event.hospital}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};
